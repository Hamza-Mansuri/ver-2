import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Certifications from '../sections/Certifications';
import './ContactPage.css';

export default function ContactPage({ onInquiry }: { onInquiry?: () => void }) {
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
          <h1 className="contact-title">
            Get in Touch
          </h1>
          <p className="contact-subtitle">
            We’d love to hear from you. Reach out to us for formulation queries, third-party manufacturing support, or international export discussions.
          </p>
        </div>

        {/* Contact Info & Map Section */}
        <div className="contact-card-grid">
          {/* Company Details */}
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
                  <p className="contact-item-val">
                    Chat with us on WhatsApp
                  </p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@gomzilifesciences.in" className="contact-item-row group">
                <div className="contact-icon-pill accent-pill">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="contact-item-label">Email Address</h3>
                  <p className="contact-item-val">
                    info@gomzilifesciences.in
                  </p>
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
                  <h3 className="contact-item-label">Address</h3>
                  <p className="contact-item-val leading-relaxed">
                    443, 444, 445, 1st Floor, RJD Textile Park,<br />
                    At. Ichchhapor, Hazira Road,<br />
                    Surat, Gujarat 394510, India
                  </p>
                </div>
              </a>
            </div>

            {onInquiry && (
              <div className="contact-inquiry-cta">
                <button
                  type="button"
                  onClick={onInquiry}
                  className="contact-submit-inquiry-btn"
                >
                  Send an Online Project Enquiry <ArrowUpRight size={17} />
                </button>
              </div>
            )}
          </div>

          {/* Google Map */}
          <div className="contact-map-col">
            <iframe 
              src="https://maps.google.com/maps?q=21.189452,72.73386&hl=en&z=15&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Gomzi Life Sciences Plant Location in Surat"
              className="contact-map-iframe"
            />
          </div>
        </div>
      </div>

      {/* Certifications strip */}
      <div className="contact-certifications">
        <Certifications />
      </div>
    </main>
  );
}

