import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate API call
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', businessName: '', message: '' });
  };

  return (
    <div className="contact-page animate-fade-in">
      <header className="page-header text-center">
        <div className="container">
          <span className="badge badge-primary">Get In Touch</span>
          <h1 className="page-title">Contact Syntro Tech Support</h1>
          <p className="page-subtitle">Have questions about setting up your digital menu, catalog, or website? Our team is here to help.</p>
        </div>
      </header>

      <section className="section contact-section">
        <div className="container grid-2">
          {/* Info Details */}
          <div className="contact-info-panel">
            <h2>Reach Out Directly</h2>
            <p className="contact-intro text-muted">
              Whether you are ready to digitize your salon, want a demo for your cafe, or need help configuring a custom domain—drop us a message.
            </p>

            <div className="contact-cards">
              <div className="card contact-info-card">
                <Phone className="contact-info-icon" size={20} />
                <div>
                  <h4>Call Customer Support</h4>
                  <p className="text-muted">Mon - Sat, 9am - 7pm</p>
                  <a href="tel:+917794885877" className="info-link">+91 77948 85877</a>
                </div>
              </div>

              <div className="card contact-info-card">
                <MessageSquare className="contact-info-icon" size={20} />
                <div>
                  <h4>WhatsApp Business Chat</h4>
                  <p className="text-muted">Instant responses daily</p>
                  <a href="https://wa.me/917794885877" className="info-link" target="_blank" rel="noreferrer">💬 +91 77948 85877</a>
                </div>
              </div>

              <div className="card contact-info-card">
                <Mail className="contact-info-icon" size={20} />
                <div>
                  <h4>Email Assistance</h4>
                  <p className="text-muted">Expect a response within 24 hours</p>
                  <a href="mailto:support@syntrotech.local" className="info-link">support@syntrotech.local</a>
                </div>
              </div>
            </div>

            {/* Mock Vector Map Graphic */}
            <div className="mock-map card">
              <div className="map-dots">
                <MapPin size={24} className="map-pin-animate" />
              </div>
              <span className="map-address">Innovator Tower, Outer Ring Rd, Gachibowli, Hyderabad</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="contact-form-panel">
            <div className="card form-container-card">
              {submitted ? (
                <div className="success-state text-center">
                  <CheckCircle size={56} className="success-icon-check" />
                  <h3>Message Sent Successfully!</h3>
                  <p className="text-muted">Thank you for contacting Syntro Tech. A business solutions manager will review your query and contact you within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3>Submit an Inquiry</h3>
                  <p className="form-helper text-muted">Fill out the details below and we will get back to you.</p>
                  
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma" 
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="e.g. rahul@example.com" 
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="e.g. +91 99000 88000" 
                        className="form-input"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Business Name (Optional)</label>
                    <input 
                      type="text" 
                      name="businessName"
                      placeholder="e.g. Royal Bakes" 
                      className="form-input"
                      value={formData.businessName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message *</label>
                    <textarea 
                      name="message"
                      required
                      rows={5}
                      placeholder="How can we help your business?" 
                      className="form-input"
                      style={{ resize: 'vertical' }}
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    <span>Submit Inquiry</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
