import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form data:', formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-hero">
          <h1>Contact Us</h1>
          <p>Get in touch with us for any questions about our programs or to schedule a visit</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h3>Visit Us</h3>
                <p>Bago Center For Skills Acquisition<br />
                   Bago, Niger State<br />
                   Nigeria</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Call Us</h3>
                <p>Main Office: +234 XXX XXX XXXX<br />
                   WhatsApp: +234 XXX XXX XXXX<br />
                   Emergency: +234 XXX XXX XXXX</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>Email Us</h3>
                <p>General: info@bcfsa.org<br />
                   Admissions: admissions@bcfsa.org<br />
                   Support: support@bcfsa.org</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">🕒</div>
                <h3>Office Hours</h3>
                <p>Monday - Friday: 8:00 AM - 5:00 PM<br />
                   Saturday: 9:00 AM - 2:00 PM<br />
                   Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            {isSubmitted ? (
              <div className="success-message">
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="admission">Program Admission</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            )}
          </div>
        </div>

        <div className="map-section">
          <h2>Find Us</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <p>📍 Interactive Map Coming Soon</p>
              <p>Bago Center For Skills Acquisition<br />
                 Bago, Niger State, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="social-section">
          <h2>Follow Us</h2>
          <p>Stay connected with us on social media for updates and news</p>
          <div className="social-links">
            <a href="#" className="social-link facebook">📘 Facebook</a>
            <a href="#" className="social-link twitter">🐦 Twitter</a>
            <a href="#" className="social-link instagram">📷 Instagram</a>
            <a href="#" className="social-link linkedin">💼 LinkedIn</a>
            <a href="#" className="social-link youtube">📺 YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
