import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mail, X, CheckCircle2 } from 'lucide-react';
import { site } from '../data/site';

export default function FloatingContact({ onInquiry: _onInquiry }: { onInquiry?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    city: '',
    message: '',
  });

  const hoverTimeoutRef = useRef<number | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const enquireButtonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setDrawerOpen(true);
  };

  const handleMouseLeave = () => {
    if (pinned) return;
    hoverTimeoutRef.current = window.setTimeout(() => {
      setDrawerOpen(false);
    }, 280);
  };

  const handleToggleClick = () => {
    if (drawerOpen && pinned) {
      setDrawerOpen(false);
      setPinned(false);
    } else {
      setDrawerOpen(true);
      setPinned(true);
    }
  };

  const handleClose = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setDrawerOpen(false);
    setPinned(false);
  };

  const handleCollapseToggle = () => {
    setCollapsed(prev => {
      const next = !prev;
      if (next) {
        setDrawerOpen(false);
        setPinned(false);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (!drawerOpen) return;
      const target = e.target as Node;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        enquireButtonRef.current &&
        !enquireButtonRef.current.contains(target)
      ) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [drawerOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      company: '',
      city: '',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <aside
      className={`floating-contact-dock ${collapsed ? 'is-collapsed' : ''}`}
      aria-label="Contact options"
    >
      <div className="side-tabs-container">
        {/* Toggle Arrow Button */}
        <button
          type="button"
          className="side-toggle-btn"
          onClick={handleCollapseToggle}
          aria-label={collapsed ? 'Expand contact tabs' : 'Collapse contact tabs'}
          title={collapsed ? 'Expand tabs' : 'Collapse tabs'}
        >
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>

        {/* Sliding Tabs Body */}
        <div className="side-tabs-body">
          <button
            ref={enquireButtonRef}
            type="button"
            className={`side-tab-enquire ${drawerOpen ? 'is-active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleToggleClick}
            aria-label="Enquire Now"
            aria-expanded={drawerOpen}
          >
            <Mail size={16} />
            <span>Enquire Now</span>
          </button>

          <a
            className="side-tab-whatsapp"
            href={`https://wa.me/${site.phoneHref.replace('+', '')}?text=${encodeURIComponent('Hello Gomzi team, I would like to discuss a nutraceutical manufacturing project.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Gomzi on WhatsApp"
            title="Chat on WhatsApp"
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6a10.5 10.5 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.8-3.3-2.1-4.3-3.8-.3-.4.3-.6.9-1.6.1-.2.1-.4 0-.6l-1-2.5c-.3-.6-.6-.5-.8-.5h-.7c-.3 0-.6.1-.8.4-.9.8-1.3 1.9-1.2 3.1 0 1.8 1.3 3.5 1.5 3.7s2.5 3.9 6.1 5.4c2.3 1 3.2 1.1 4.4.9.7-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Contact Form Drawer matching Screenshot 3 */}
      {drawerOpen && (
        <div
          ref={drawerRef}
          className="contact-form-drawer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-title"
        >
          <div className="drawer-header">
            <h3 id="contact-form-title" className="drawer-title">
              Contact Form
            </h3>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={handleClose}
              aria-label="Close Contact Form"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="drawer-success">
              <CheckCircle2 size={44} className="drawer-success-icon" />
              <h4>Thank you, {form.name || 'Partner'}!</h4>
              <p>
                Your enquiry for <strong>{form.company || 'your brand'}</strong> has been received.
                Our team will reach out to you shortly.
              </p>
              <button type="button" className="drawer-submit-btn" onClick={handleReset}>
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="drawer-form">
              <input
                type="text"
                name="name"
                required
                placeholder="Name*"
                value={form.name}
                onChange={handleChange}
                className="drawer-pill-input"
                autoComplete="name"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone*"
                value={form.phone}
                onChange={handleChange}
                className="drawer-pill-input"
                autoComplete="tel"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email*"
                value={form.email}
                onChange={handleChange}
                className="drawer-pill-input"
                autoComplete="email"
              />
              <input
                type="text"
                name="company"
                required
                placeholder="Your Company Name*"
                value={form.company}
                onChange={handleChange}
                className="drawer-pill-input"
                autoComplete="organization"
              />
              <input
                type="text"
                name="city"
                required
                placeholder="City*"
                value={form.city}
                onChange={handleChange}
                className="drawer-pill-input"
                autoComplete="address-level2"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                className="drawer-textarea"
              />
              <button type="submit" className="drawer-submit-btn">
                SUBMIT
              </button>
            </form>
          )}
        </div>
      )}
    </aside>
  );
}
