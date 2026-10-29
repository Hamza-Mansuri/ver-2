import { useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, BookOpen, Eye, FileText, Sparkles, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Certifications from '../sections/Certifications';
import './DownloadCataloguesPage.css';

interface SKUItem {
  name: string;
  badge: string;
  format: string;
  description: string;
  actives: string;
}

const FEATURED_SKUS: SKUItem[] = [
  {
    name: 'Biotin 10,000 mcg',
    badge: 'HAIR, SKIN & NAILS',
    format: 'Vegetarian Capsules • 60 Count',
    description: 'High-potency cellular regeneration formula with essential micronutrients for keratin structure support.',
    actives: 'Biotin (D-Biotin) 10,000 mcg • Silica • Calcium Pantothenate'
  },
  {
    name: 'Calcium, Magnesium, Zinc + D3',
    badge: 'BONE & JOINT STRENGTH',
    format: 'Coated Tablets • 60 Count',
    description: 'Comprehensive mineral complex formulated for peak bone matrix density and neuromuscular recovery.',
    actives: 'Calcium Citrate Malate • Magnesium Oxide • Zinc Sulphate • Vitamin D3'
  },
  {
    name: 'Vitamin D3 + K2 (MK-7)',
    badge: 'CARDIOVASCULAR & IMMUNITY',
    format: 'Micro-Tablets • 60 Count',
    description: 'Synergistic formulation ensuring targeted arterial calcium transport and bone mineralization.',
    actives: 'Vitamin D3 (Cholecalciferol) 2000 IU • Menaquinone MK-7 55 mcg'
  },
  {
    name: 'Hepatoprotective Liver Detox',
    badge: 'ORGAN DETOX & METABOLISM',
    format: 'Herbal Extract Tablets • 60 Count',
    description: 'Standardized botanical blend supporting natural hepatic detoxification enzymes and cellular antioxidant balance.',
    actives: 'Milk Thistle (80% Silymarin) • Dandelion Root • Artichoke • Curcumin'
  },
  {
    name: '23-Nutrient Daily Multivitamin',
    badge: 'COMPLETE VITALITY COMPLEX',
    format: 'Multivitamin Tablets • 60 Count',
    description: 'All-in-one daily vitality formula covering essential vitamins, trace minerals, and bioflavonoids.',
    actives: 'Vitamins A, B-Complex, C, D3, E • Zinc, Selenium, Chromium, Iron'
  },
  {
    name: 'Triple-Strength Omega-3 1000mg',
    badge: 'ESSENTIAL FATTY ACIDS',
    format: 'Enteric Softgels • 60 Count',
    description: 'Purified deep-sea fish oil concentrate rich in EPA & DHA for heart, cognitive, and joint mobility health.',
    actives: 'Total Omega-3 1000 mg • EPA 180 mg • DHA 120 mg • Vitamin E'
  },
  {
    name: 'PCOS & Hormonal Balance',
    badge: 'WOMEN’S REPRODUCTIVE HEALTH',
    format: 'Advanced Tablets • 60 Count',
    description: 'Scientifically calibrated 40:1 Myo to D-Chiro-Inositol ratio for hormonal harmony and ovulatory wellness.',
    actives: 'Myo-Inositol 1000 mg • D-Chiro Inositol 25 mg • L-Methylfolate • Chromium'
  },
  {
    name: 'Chewable Vitamin C 500mg + Zinc',
    badge: 'RAPID IMMUNE DEFENSE',
    format: 'Orange Chewable Tablets • 60 Count',
    description: 'Pleasant-tasting chewable formulation combining buffered ascorbic acid with elemental zinc for dual immunity.',
    actives: 'Vitamin C (Ascorbic Acid + Sodium Ascorbate) 500 mg • Elemental Zinc 10 mg'
  }
];

export default function DownloadCataloguesPage({ onInquiry }: { onInquiry?: () => void }) {
  const [filter, setFilter] = useState<'all' | 'products' | 'corporate'>('all');
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);

  const openPdf = (url: string, title: string) => {
    setActivePdf({ url, title });
  };

  const closePdf = () => {
    setActivePdf(null);
  };

  return (
    <main id="main-content" className="download-catalogues-page">
      <div className="container dcp-container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="dcp-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Download Catalogues</span>
        </nav>

        {/* Page Header */}
        <div className="dcp-header">
          <p className="dcp-kicker"><i />GOMZI LIFE SCIENCE / OFFICIAL PUBLICATIONS</p>
          <h1>Download Catalogues<br /><em>&amp; Formulation Dossiers</em></h1>
          <p className="dcp-lead">
            Explore our official 2026/2027 nutraceutical product directories, CDMO capabilities dossiers,
            and turnkey formulation specifications. Download publication PDFs or preview them directly online.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="dcp-filter-bar">
          <button
            type="button"
            className={`dcp-filter-btn ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Catalogues (2)
          </button>
          <button
            type="button"
            className={`dcp-filter-btn ${filter === 'products' ? 'is-active' : ''}`}
            onClick={() => setFilter('products')}
          >
            Turnkey Product Catalogue
          </button>
          <button
            type="button"
            className={`dcp-filter-btn ${filter === 'corporate' ? 'is-active' : ''}`}
            onClick={() => setFilter('corporate')}
          >
            Corporate Profile &amp; CDMO
          </button>
        </div>

        {/* Catalogues Grid */}
        <div className="dcp-grid">
          {/* CATALOGUE 1: Official Turnkey Product Brochure */}
          {(filter === 'all' || filter === 'products') && (
            <article className="dcp-catalogue-item dcp-catalogue-item--featured">
              {/* Left Column: 3D Realistic Book Presentation */}
              <div className="dcp-book-stage">
                <div
                  className="dcp-book dcp-book--product"
                  onClick={() => openPdf('/Gomzi-Product-Catalogue.pdf', "Let's Start Your Brand Today — Product Catalogue")}
                  role="button"
                  tabIndex={0}
                  aria-label="Preview Let's Start Your Brand Today Catalogue"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openPdf('/Gomzi-Product-Catalogue.pdf', "Let's Start Your Brand Today — Product Catalogue");
                    }
                  }}
                >
                  <div className="dcp-book-top">
                    <div className="dcp-book-brand">
                      <img src="/assets/images/logo.webp" alt="Gomzi" width="24" height="24" />
                      <span>GOMZI LIFE SCIENCE</span>
                    </div>
                    <div className="dcp-book-title">LET’S START YOUR BRAND TODAY</div>
                    <div className="dcp-book-subtitle">Turnkey Formulations &amp; Ready-to-Brand Lineup</div>
                  </div>

                  <div className="dcp-book-mid">
                    <img
                      src="/assets/images/product-lineup.webp"
                      alt="Product Lineup Preview"
                      className="dcp-book-preview-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="dcp-book-bottom">
                    <div>
                      <span>CERTIFIED STANDARDS</span>
                      <strong>FSSAI · ISO · GMP · FDA</strong>
                    </div>
                    <div className="dcp-book-badge">2026 EDITION</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="dcp-quick-preview-btn"
                  onClick={() => openPdf('/Gomzi-Product-Catalogue.pdf', "Let's Start Your Brand Today — Product Catalogue")}
                >
                  <Eye size={14} /> Quick Preview
                </button>
              </div>

              {/* Right Column: Catalogue Specifications & Table of Contents */}
              <div className="dcp-details">
                <div className="dcp-details-badge-row">
                  <span className="dcp-status-pill">
                    <Sparkles size={11} /> OFFICIAL PRODUCT DIRECTORY
                  </span>
                  <span className="dcp-status-pill">7 PAGES FULL COLOR</span>
                </div>

                <h2>Let’s Start Your Brand Today<br /><em>Turnkey Formulations Dossier</em></h2>
                <p className="dcp-details-intro">
                  Our comprehensive formulation brochure designed for brand owners, distributors, and pharmacy chains.
                  Features 8 high-velocity, commercially validated ready-to-brand formulas with exact active ingredients,
                  dosage delivery formats, and global regulatory compliance details.
                </p>

                {/* Interactive Table of Contents */}
                <div className="dcp-toc-box">
                  <div className="dcp-toc-header">
                    <span className="dcp-toc-title">Catalogue Table of Contents</span>
                    <span className="dcp-toc-count">7 Comprehensive Sections</span>
                  </div>
                  <ul className="dcp-toc-list">
                    <li><span className="dcp-toc-page">P.01</span><span>Turnkey Manufacturing Overview &amp; Crests</span></li>
                    <li><span className="dcp-toc-page">P.02</span><span>Biotin 10,000 mcg Capsules (Hair &amp; Skin)</span></li>
                    <li><span className="dcp-toc-page">P.03</span><span>Calcium + Mag + Zinc + D3 Bone Strength</span></li>
                    <li><span className="dcp-toc-page">P.04</span><span>Vitamin D3 + K2 (MK-7) Synergistic Tablets</span></li>
                    <li><span className="dcp-toc-page">P.05</span><span>Hepatoprotective Liver Detox Herbal Formulation</span></li>
                    <li><span className="dcp-toc-page">P.06</span><span>23-Ingredient Daily Vitality Multivitamin</span></li>
                    <li><span className="dcp-toc-page">P.07</span><span>Omega-3 Softgels &amp; Women’s PCOS Balance</span></li>
                  </ul>
                </div>

                {/* Specs Strip */}
                <div className="dcp-specs-strip">
                  <div className="dcp-spec-item">
                    <span>Document Format</span>
                    <strong>High-Res Vector PDF</strong>
                  </div>
                  <div className="dcp-spec-item">
                    <span>Volume</span>
                    <strong>7 Pages • 8 Master SKUs</strong>
                  </div>
                  <div className="dcp-spec-item">
                    <span>File Size</span>
                    <strong>10.2 MB</strong>
                  </div>
                  <div className="dcp-spec-item">
                    <span>Certifications</span>
                    <strong>FSSAI, ISO, GMP, FDA</strong>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="dcp-actions">
                  <a
                    href="/Gomzi-Product-Catalogue.pdf"
                    download="Gomzi-Product-Catalogue.pdf"
                    className="dcp-btn-primary"
                  >
                    <ArrowDownToLine size={16} /> Download Product Catalogue
                  </a>
                  <button
                    type="button"
                    onClick={() => openPdf('/Gomzi-Product-Catalogue.pdf', "Let's Start Your Brand Today — Product Catalogue")}
                    className="dcp-btn-secondary"
                  >
                    <BookOpen size={16} /> Read Online
                  </button>
                  {onInquiry && (
                    <button
                      type="button"
                      onClick={onInquiry}
                      className="dcp-btn-link"
                    >
                      Inquire About These SKUs <ArrowUpRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* CATALOGUE 2: Corporate Profile & CDMO Dossier */}
          {(filter === 'all' || filter === 'corporate') && (
            <article className="dcp-catalogue-item">
              {/* Left Column: 3D Realistic Book Presentation */}
              <div className="dcp-book-stage">
                <div
                  className="dcp-book dcp-book--corporate"
                  onClick={() => openPdf('/Gomzi-Company-Profile.pdf', 'Gomzi Company Profile & CDMO Dossier')}
                  role="button"
                  tabIndex={0}
                  aria-label="Preview Gomzi Company Profile"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openPdf('/Gomzi-Company-Profile.pdf', 'Gomzi Company Profile & CDMO Dossier');
                    }
                  }}
                >
                  <div className="dcp-book-top">
                    <div className="dcp-book-brand">
                      <img src="/assets/images/logo.webp" alt="Gomzi" width="24" height="24" />
                      <span>GOMZI LIFE SCIENCE</span>
                    </div>
                    <div className="dcp-book-title">GLOBAL CDMO &amp; EXPORT CAPABILITIES</div>
                    <div className="dcp-book-subtitle">Manufacturing Infrastructure &amp; Quality Systems</div>
                  </div>

                  <div className="dcp-book-mid">
                    <img
                      src="/assets/images/about-laboratory.webp"
                      alt="Laboratory & Plant Preview"
                      className="dcp-book-preview-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="dcp-book-bottom">
                    <div>
                      <span>SURAT, GUJARAT PLANT</span>
                      <strong>45+ EXPORT MARKETS</strong>
                    </div>
                    <div className="dcp-book-badge" style={{ background: '#3b82f6', color: '#fff' }}>CORPORATE</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="dcp-quick-preview-btn"
                  onClick={() => openPdf('/Gomzi-Company-Profile.pdf', 'Gomzi Company Profile & CDMO Dossier')}
                >
                  <Eye size={14} /> Quick Preview
                </button>
              </div>

              {/* Right Column: Catalogue Specifications */}
              <div className="dcp-details">
                <div className="dcp-details-badge-row">
                  <span className="dcp-status-pill dcp-status-pill--blue">
                    <ShieldCheck size={11} /> CORPORATE PRESENTATION
                  </span>
                  <span className="dcp-status-pill">COMPLETE INFRASTRUCTURE</span>
                </div>

                <h2>Gomzi Company Profile<br /><em>&amp; Manufacturing Capabilities</em></h2>
                <p className="dcp-details-intro">
                  In-depth corporate deck detailing our Surat manufacturing plant, cleanroom powder and liquid
                  filling bays, analytical QA testing suites, international export markets across Europe, Africa,
                  and Asia, and turnkey contract manufacturing agreements.
                </p>

                {/* Table of Contents */}
                <div className="dcp-toc-box">
                  <div className="dcp-toc-header">
                    <span className="dcp-toc-title">Corporate Deck Sections</span>
                    <span className="dcp-toc-count">CDMO Overview</span>
                  </div>
                  <ul className="dcp-toc-list">
                    <li><span className="dcp-toc-page">S.01</span><span>Surat Manufacturing Facility &amp; Cleanroom Bays</span></li>
                    <li><span className="dcp-toc-page">S.02</span><span>Delivery Formats: Powders, Tablets, Softgels, Syrups</span></li>
                    <li><span className="dcp-toc-page">S.03</span><span>Quality Assurance, Microbiological &amp; Potency Lab</span></li>
                    <li><span className="dcp-toc-page">S.04</span><span>Global Export Logistics &amp; Regulatory Filings</span></li>
                  </ul>
                </div>

                {/* Specs Strip */}
                <div className="dcp-specs-strip">
                  <div className="dcp-spec-item">
                    <span>Document Format</span>
                    <strong>Full Corporate PDF</strong>
                  </div>
                  <div className="dcp-spec-item">
                    <span>Facility Location</span>
                    <strong>Surat, Gujarat (India)</strong>
                  </div>
                  <div className="dcp-spec-item">
                    <span>File Size</span>
                    <strong>17.3 MB</strong>
                  </div>
                  <div className="dcp-spec-item">
                    <span>Compliance</span>
                    <strong>WHO-GMP, ISO 22000, HACCP</strong>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="dcp-actions">
                  <a
                    href="/Gomzi-Company-Profile.pdf"
                    download="Gomzi-Company-Profile.pdf"
                    className="dcp-btn-primary"
                  >
                    <ArrowDownToLine size={16} /> Download Corporate Profile
                  </a>
                  <button
                    type="button"
                    onClick={() => openPdf('/Gomzi-Company-Profile.pdf', 'Gomzi Company Profile & CDMO Dossier')}
                    className="dcp-btn-secondary"
                  >
                    <BookOpen size={16} /> Read Online
                  </button>
                  {onInquiry && (
                    <button
                      type="button"
                      onClick={onInquiry}
                      className="dcp-btn-link"
                    >
                      Schedule Plant Audit <ArrowUpRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          )}
        </div>

        {/* ==========================================================================
            FEATURED SKUS LOOKBOOK (CATALOGUE PRODUCT LINEUP)
            ========================================================================== */}
        <section className="dcp-sku-section">
          <div className="dcp-sku-section-head">
            <p className="dcp-kicker" style={{ justifyContent: 'center' }}>
              <i />PRODUCT BROCHURE HIGHLIGHTS
            </p>
            <h2>Featured in the 2026 Catalogue</h2>
            <p>
              Explore the 8 ready-to-brand flagship formulations documented inside our official Product Brochure.
              Each SKU is fully formulated, lab-tested, and ready for commercial packaging with your brand identity.
            </p>
          </div>

          <div className="dcp-sku-grid">
            {FEATURED_SKUS.map((sku) => (
              <div key={sku.name} className="dcp-sku-card">
                <div>
                  <span className="dcp-sku-badge">{sku.badge}</span>
                  <h3>{sku.name}</h3>
                  <p className="dcp-sku-desc">{sku.description}</p>
                </div>
                <div className="dcp-sku-footer">
                  <span className="dcp-sku-format">{sku.format}</span>
                  {onInquiry && (
                    <button
                      type="button"
                      onClick={onInquiry}
                      className="dcp-sku-inquire"
                    >
                      Inquire <ArrowUpRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Dossier & Sample Request Banner */}
        <div className="dcp-custom-banner">
          <div>
            <h3>Need a Custom Formulation Catalogue <em>or Pilot Samples?</em></h3>
            <p>
              Our formulation scientists can create custom dosage blends, specialized ingredient dossiers,
              or dispatch laboratory sample kits directly to your office.
            </p>
          </div>
          {onInquiry && (
            <button
              type="button"
              onClick={onInquiry}
              className="dcp-btn-primary"
              style={{ whiteSpace: 'nowrap' }}
            >
              Request Custom Sample Kit <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Embedded Fullscreen / Modal PDF Reader */}
      {activePdf && (
        <div
          className="dcp-modal-backdrop"
          onClick={closePdf}
          role="dialog"
          aria-modal="true"
          aria-label="Catalogue Reader"
        >
          <div
            className="dcp-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dcp-modal-header">
              <div className="dcp-modal-title">
                <FileText size={20} color="#99c229" />
                <div>
                  <h3>{activePdf.title}</h3>
                  <span>Interactive PDF Reader</span>
                </div>
              </div>
              <div className="dcp-modal-controls">
                <a
                  href={activePdf.url}
                  download
                  className="dcp-modal-download-btn"
                >
                  <ArrowDownToLine size={14} /> Download File
                </a>
                <button
                  type="button"
                  onClick={closePdf}
                  className="dcp-modal-close-btn"
                  aria-label="Close reader"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="dcp-modal-body">
              <iframe
                src={`${activePdf.url}#toolbar=1&navpanes=1`}
                title={activePdf.title}
                className="dcp-modal-iframe"
              />
            </div>
          </div>
        </div>
      )}

      {/* Certifications Section */}
      <Certifications />
    </main>
  );
}
