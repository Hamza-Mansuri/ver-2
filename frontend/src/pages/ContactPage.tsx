import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ContactPage.css';

export default function ContactPage({ onInquiry: _onInquiry }: { onInquiry?: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    city: '',
    service: 'Private Label Manufacturing',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      company: '',
      city: '',
      service: 'Private Label Manufacturing',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <main id="main-content" className="contact-page-wrapper">
      <div className="contact-page-inner">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="contact-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Contact</span>
        </nav>

        {/* Header */}
        <div className="contact-header">
          <p className="contact-kicker"><i />GOMZI LIFE SCIENCE / REACH OUT TO OUR TEAM</p>
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            We’d love to hear from you. Reach out to us for formulation queries, third-party manufacturing support,
            or international export discussions.
          </p>
        </div>

        {/* 2-Column Section: Company Details (Left) + Inquiry Form (Right) */}
        <div className="contact-card-grid">
          {/* Company Details Column */}
          <div className="contact-details-col">
            <h2 className="contact-company-name">Gomzi Lifesciences LLP</h2>
            
            <div className="contact-items-stack">
              {/* Phone */}
              <a href="tel:+918320077993" className="contact-item-row group">
                <div className="contact-icon-pill accent-pill">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="contact-item-label">Contact Number</h3>
                  <p className="contact-item-val">+91 83200 77993</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918320077993"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item-row group"
              >
                <div className="contact-icon-pill whatsapp-pill">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="contact-item-label">WhatsApp</h3>
                  <p className="contact-item-val">Chat with us on WhatsApp</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@gomzilifesciences.in" className="contact-item-row group">
                <div className="contact-icon-pill accent-pill">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="contact-item-label">Email Address</h3>
                  <p className="contact-item-val">info@gomzilifesciences.in</p>
                </div>
              </a>

              {/* Address */}
              <a 
                href="https://maps.google.com/maps?q=21.189452,72.73386" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-item-row group"
              >
                <div className="contact-icon-pill accent-pill">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="contact-item-label">Plant &amp; Facility Address</h3>
                  <p className="contact-item-val leading-relaxed">
                    443, 444, 445, 1st Floor, RJD Textile Park,<br />
                    At. Ichchhapor, Hazira Road,<br />
                    Surat, Gujarat 394510, India
                  </p>
                </div>
              </a>
            </div>

            <div className="contact-turnaround-note">
              <strong>Fast Response Commitment</strong>
              <p>Our formulation and technical sales team answers all B2B inquiries within 24 business hours.</p>
            </div>
          </div>

          {/* Right Column: Inline Project Enquiry Form (Where the map was) */}
          <div className="contact-form-col" id="inquiry-form-section">
            <h2 className="contact-form-title">Send an Online Project Enquiry</h2>
            <p className="contact-form-subtitle">
              Share your formulation requirements, packaging format, or order parameters for a personalized quote.
            </p>

            {submitted ? (
              <div className="contact-form-success">
                <CheckCircle2 size={36} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                <h3>Thank you, {formData.name || 'Partner'}!</h3>
                <p>
                  Your project enquiry for <strong>{formData.company || 'your brand'}</strong> has been received.
                  Our technical sales specialist will review your brief and contact you at <strong>{formData.email || formData.phone}</strong>.
                </p>
                <button type="button" onClick={handleReset} className="contact-form-reset-btn">
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="contact-name">Full Name <span>*</span></label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={handleChange}
                      className="contact-form-input"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="contact-phone">Contact Number <span>*</span></label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="contact-form-input"
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="contact-email">Email Address <span>*</span></label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="contact-form-input"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="contact-company">Company / Brand Name</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="e.g. NutraHealth Ltd"
                      value={formData.company}
                      onChange={handleChange}
                      className="contact-form-input"
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="contact-city">City / Country</label>
                    <input
                      id="contact-city"
                      name="city"
                      type="text"
                      placeholder="e.g. Mumbai, India / London, UK"
                      value={formData.city}
                      onChange={handleChange}
                      className="contact-form-input"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="contact-service">Service Required</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="contact-form-select"
                    >
                      <option value="Private Label Manufacturing">Private Label Manufacturing</option>
                      <option value="Bulk Supplements Manufacturing">Bulk Supplements Manufacturing</option>
                      <option value="Food Fortification Premix">Food Fortification Premix</option>
                      <option value="Spray Dried Fat Powder">Spray Dried Fat Powder</option>
                      <option value="Micronutrient Premix">Micronutrient Premix</option>
                      <option value="API & Supplement Premixes">API &amp; Supplement Premixes</option>
                      <option value="Packaging & Custom Design">Packaging &amp; Custom Design</option>
                      <option value="Other CDMO Inquiry">Other CDMO Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form-field">
                  <label htmlFor="contact-message">Project Brief / Formulation Details</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your target delivery format (capsules, tablets, powders), desired quantity, or market requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-form-textarea"
                  />
                </div>

                <button type="submit" className="contact-form-submit-btn">
                  <Send size={16} /> Send Project Enquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Horizontal Google Map Beneath The Section */}
        <div className="contact-map-horizontal-wrap">
          <div className="contact-map-horizontal-header">
            <h3>Visit Our Manufacturing Plant in Surat, Gujarat</h3>
            <a 
              href="https://maps.google.com/maps?q=21.189452,72.73386" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Open in Google Maps <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="contact-map-horizontal-frame">
            <iframe 
              src="https://maps.google.com/maps?q=21.189452,72.73386&hl=en&z=15&output=embed" 
              title="Gomzi Life Sciences Plant Location in Surat"
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
