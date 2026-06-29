const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Allowed inquiry types for server-side validation
const ALLOWED_INQUIRY_TYPES = [
  'General Inquiry',
  'Donation',
  'Sponsorship',
  'Volunteer Registration',
  'Event Participation',
  'Media Request',
  'Feedback',
  'Other'
];

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, inquiryType, message, hp_field } = req.body;

    // 1. Spam Protection (Honeypot check)
    if (hp_field) {
      console.warn('Spam submission detected via honeypot field:', { name, email, hp_field });
      // Silently return success to fool bots and prevent them from trying other paths
      return res.status(200).json({
        status: 'ok',
        message: 'Thank you for contacting Dongri Cha Raja. Your message has been successfully submitted.'
      });
    }

    // 2. Server-side validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email address format.' });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({ error: 'Mobile number is required.' });
    }
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      return res.status(400).json({ error: 'Invalid mobile number format. Must be between 10 and 15 digits.' });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({ error: 'Subject is required.' });
    }

    if (!inquiryType || !ALLOWED_INQUIRY_TYPES.includes(inquiryType)) {
      return res.status(400).json({ error: 'Invalid inquiry type selected.' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Sanitize message and other text inputs (prevent basic HTML injection in logs/emails)
    const sanitize = (str) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanSubject = sanitize(subject);
    const cleanMessage = sanitize(message);

    const createdAt = new Date().toISOString();

    // 3. Store submission in Firestore via REST API
    const projectId = 'dongri-cha-raja';
    const apiKey = 'AIzaSyBlzNwhMzQY-Wm29HR_tje-PbuwcyYsYXQ';
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/inquiries?key=${apiKey}`;

    const dbPayload = {
      fields: {
        name: { stringValue: cleanName },
        phone: { stringValue: cleanPhone },
        email: { stringValue: cleanEmail },
        subject: { stringValue: cleanSubject },
        inquiryType: { stringValue: inquiryType },
        message: { stringValue: cleanMessage },
        status: { stringValue: 'New' },
        createdAt: { stringValue: createdAt }
      }
    };

    const dbResponse = await fetch(firestoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dbPayload)
    });

    if (!dbResponse.ok) {
      const errorText = await dbResponse.text();
      console.error('Firestore REST API error:', errorText);
      throw new Error('Failed to save inquiry to the database.');
    }

    // 4. Send email notification via nodemailer
    const useRealEmail = process.env.EMAIL_USER && process.env.EMAIL_PASS;
    const adminEmail = 'dongricharajamoryamaza@gmail.com';

    const mailOptions = {
      from: process.env.EMAIL_USER || '"Dongri Cha Raja Website" <noreply@dongricharaja.org>',
      to: adminEmail,
      subject: `[${inquiryType}] ${cleanSubject} - ${cleanName}`,
      text: `
New Inquiry received from the website:

Name: ${cleanName}
Mobile Number: ${cleanPhone}
Email: ${cleanEmail}
Inquiry Type: ${inquiryType}
Subject: ${cleanSubject}
Date: ${new Date(createdAt).toLocaleString('en-IN')}

Message:
${cleanMessage}
`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e5ddd0; border-radius: 8px; padding: 20px; background-color: #faf6f0;">
          <h2 style="color: #6b0000; border-bottom: 2px solid #e68200; padding-bottom: 10px; margin-top: 0;">New Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 150px; color: #1c0a35;">Name:</td>
              <td style="padding: 6px 0;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #1c0a35;">Mobile Number:</td>
              <td style="padding: 6px 0;">${cleanPhone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #1c0a35;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #1c0a35;">Inquiry Type:</td>
              <td style="padding: 6px 0;"><span style="background-color: #e68200; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${inquiryType}</span></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #1c0a35;">Subject:</td>
              <td style="padding: 6px 0;">${cleanSubject}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #1c0a35;">Date/Time:</td>
              <td style="padding: 6px 0;">${new Date(createdAt).toLocaleString('en-IN')}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-left: 4px solid #e68200; border-radius: 4px;">
            <strong style="display: block; margin-bottom: 8px; color: #6b0000;">Message:</strong>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.5;">${cleanMessage}</p>
          </div>
        </div>
      `
    };

    if (useRealEmail) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      await transporter.sendMail(mailOptions);
      console.log('Contact inquiry email sent to', adminEmail);
    } else {
      console.log('--- EMAIL SEND SIMULATION ---');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Body:', mailOptions.text);
      console.log('-----------------------------');
    }

    res.status(200).json({
      status: 'ok',
      message: 'Thank you for contacting Dongri Cha Raja. Your message has been successfully submitted. Our team will respond as soon as possible.'
    });

  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ error: error.message || 'An error occurred while submitting your message. Please try again.' });
  }
});

module.exports = router;
