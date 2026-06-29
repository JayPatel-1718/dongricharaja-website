import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import './ContactUs.css';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    inquiryType: "General Inquiry",
    message: "",
    hp_field: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Please enter your mobile number.");
      return;
    }
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      toast.error("Please enter a valid mobile number (10 to 15 digits).");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!formData.inquiryType) {
      toast.error("Please select an inquiry type.");
      return;
    }

    if (!formData.subject.trim()) {
      toast.error("Please enter a subject.");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please type your message.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }
      
      toast.success("Thank you for contacting Dongri Cha Raja. Your message has been successfully submitted. Our team will respond as soon as possible.", { duration: 6000 });
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        inquiryType: "General Inquiry",
        message: "",
        hp_field: ""
      });
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(err.message || 'An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us & Support | Dongri Cha Raja</title>
        <meta name="description" content="Get in touch with the committee office. Find contact numbers, official emails, Whatsapp support, and location map." />
      </Helmet>

      <main className="contact-page fade-in">
        {/* ── Banner ── */}
        <section className="committee-banner" aria-label="Contact Us Banner">
          <div className="committee-banner__mandala" aria-hidden="true">
            <span className="mandala-ring mandala-ring--outer" />
            <span className="mandala-ring mandala-ring--mid" />
            <span className="mandala-ring mandala-ring--inner" />
          </div>
          <div className="committee-banner__ornament top-left" aria-hidden="true">❋</div>
          <div className="committee-banner__ornament top-right" aria-hidden="true">❋</div>
          <div className="container">
            <p className="committee-banner__marathi-year" lang="mr">मदत केंद्र</p>
            <h1 className="committee-banner__title">Contact Us</h1>
            <p className="committee-banner__marathi-title" lang="mr">संपर्क साधा</p>
            <div className="committee-banner__divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-gem">✦</span>
              <span className="divider-line" />
            </div>
            <p className="committee-banner__subtitle">
              Get in touch with the committee office for puja bookings, seva registration, VIP passes, and general queries.
            </p>
          </div>
        </section>


        {/* Contact Info & Form */}
        <section className="section section-contact-portal">
          <div className="container grid grid-cols-2">
            {/* Info Column */}
            <div className="contact-info-cards">
              <h2 className="section-title">Get In Touch</h2>
              <p className="lead-text-contact">Reach out to our executive trust office for inquiries, VIP passes, or group puja registration.</p>

              <div className="contact-grid-small mt-6">
                <div className="card contact-info-card">
                  <i className="fas fa-location-dot contact-card-icon"></i>
                  <div>
                    <h3>Office Address</h3>
                    <p>Dongri High Street, Dongri, Mumbai - 400009, Maharashtra, India</p>
                  </div>
                </div>

                <div className="card contact-info-card">
                  <i className="fas fa-phone-volume contact-card-icon"></i>
                  <div>
                    <h3>Phone Numbers</h3>
                    <p>+91 22 2345 6789 <br /> +91 22 9876 5432</p>
                  </div>
                </div>

                <div className="card contact-info-card email-us-card">
                  <i className="fas fa-envelope-open-text contact-card-icon"></i>
                  <div>
                    <h3>Email Us</h3>
                    <p style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '8px', color: 'var(--gray-dark)' }}>
                      For donations, sponsorships, event inquiries, volunteer participation, media requests, darshan-related assistance, and general queries, please contact us through the official email address below.
                    </p>
                    <a href="mailto:dongricharajamoryamaza@gmail.com" style={{ fontWeight: 'bold', color: 'var(--primary)', textDecoration: 'none' }}>
                      dongricharajamoryamaza@gmail.com
                    </a>
                  </div>
                </div>

                <div className="card contact-info-card">
                  <i className="fab fa-whatsapp contact-card-icon whatsapp-accent"></i>
                  <div>
                    <h3>WhatsApp Helpline</h3>
                    <p>+91 98765 43210 (24/7 during festival)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact-form-card card">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="mt-4">
                {/* Honeypot field for spam protection */}
                <input 
                  type="text" 
                  name="hp_field" 
                  value={formData.hp_field} 
                  onChange={handleInputChange} 
                  className="contact-hp-field" 
                  style={{ display: 'none' }} 
                  tabIndex="-1" 
                  autoComplete="off" 
                />

                <div className="form-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input 
                    type="text" 
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="contact-phone">Mobile Number *</label>
                  <input 
                    type="tel" 
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="contact-inquiry-type">Inquiry Type *</label>
                  <select 
                    id="contact-inquiry-type"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Donation">Donation</option>
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Volunteer Registration">Volunteer Registration</option>
                    <option value="Event Participation">Event Participation</option>
                    <option value="Media Request">Media Request</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="contact-subject">Subject *</label>
                  <input 
                    type="text" 
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject of your inquiry" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="contact-message">Message Details *</label>
                  <textarea 
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message here..." 
                    className="form-control"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary mt-6"
                  style={{ width: '100%' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span><i className="fas fa-spinner fa-spin"></i> Submitting...</span>
                  ) : (
                    <span><i className="fas fa-paper-plane"></i> Send Message</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactUs;
