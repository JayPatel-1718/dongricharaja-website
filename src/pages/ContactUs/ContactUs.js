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
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please type your message.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! Our committee will reply shortly.");
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 1200);
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

                <div className="card contact-info-card">
                  <i className="fas fa-envelope-open-text contact-card-icon"></i>
                  <div>
                    <h3>Official Emails</h3>
                    <p>info@dongricharaja.org <br /> trust@dongricharaja.org</p>
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
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label>Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="VIP Passes">VIP Passes & Darshan</option>
                    <option value="Seva Bookings">Puja & Seva Bookings</option>
                    <option value="Volunteering">Volunteering Operations</option>
                    <option value="Sponsorships">Sponsorships & Donations</option>
                  </select>
                </div>

                <div className="form-group mt-3">
                  <label>Message Details *</label>
                  <textarea 
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
