import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, CheckCircle2, ChevronRight, HelpCircle, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { solutionsData } from '../data/solutionsData';
import Certifications from '../sections/Certifications';
import './SolutionDetailPage.css';

export default function SolutionDetailPage({ onInquiry }: { onInquiry: () => void }) {
  const { slug } = useParams<{ slug: string }>();
  const solution = solutionsData.find((s) => s.slug === slug) || solutionsData[0];

  const related = solutionsData.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <main id="main-content" className="solution-detail-page">
      {/* Hero Banner */}
      <section className="sd-hero" aria-labelledby="sd-title">
        <div className="container sd-hero-inner">
          <nav className="sd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link to="/solutions">Solutions</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{solution.title}</span>
          </nav>

          <div className="sd-hero-content">
            <span className="sd-kicker">
              <span className="sd-dot" />
              SOLUTION {solution.number} · {solution.tag}
            </span>
            <h1 id="sd-title">{solution.title}</h1>
            <p className="sd-hero-tagline">{solution.tagline}</p>

            <div className="sd-hero-actions">
              <button type="button" className="button button--lime" onClick={onInquiry}>
                Discuss this solution <ArrowUpRight size={18} />
              </button>
              <Link to="/solutions" className="sd-back-link">
                <ArrowLeft size={16} /> Back to all solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="sd-body section">
        <div className="container sd-grid">
          {/* Left Column: Deep Information */}
          <div className="sd-main">
            {/* Visual Showcase Card */}
            <div className="sd-feature-card">
              <div className="sd-image-wrap">
                <img
                  src={solution.image}
                  alt={solution.alt}
                  width="1000"
                  height="667"
                  className="sd-feature-image"
                />
                <span className="sd-badge">0{solution.number} / {solution.tag}</span>
              </div>
              <div className="sd-overview">
                <h2>Overview & Strategic Value</h2>
                <p>{solution.overview}</p>
                <div className="sd-highlights">
                  {solution.highlights.map((h, i) => (
                    <div className="sd-highlight-item" key={i}>
                      <CheckCircle2 size={18} className="sd-icon-check" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Capabilities */}
            <div className="sd-block">
              <div className="sd-block-header">
                <Sparkles size={20} className="sd-block-icon" />
                <h2>Key Capabilities & Scope of Work</h2>
              </div>
              <div className="sd-capabilities-grid">
                {solution.capabilities.map((cap, i) => (
                  <div className="sd-cap-card" key={i}>
                    <h3>{cap.title}</h3>
                    <p>{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Technical Workflow */}
            <div className="sd-block">
              <div className="sd-block-header">
                <Layers size={20} className="sd-block-icon" />
                <h2>Technical Execution Workflow</h2>
              </div>
              <div className="sd-steps">
                {solution.process.map((p) => (
                  <div className="sd-step-card" key={p.step}>
                    <div className="sd-step-num">{p.step}</div>
                    <div className="sd-step-info">
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Formats */}
            <div className="sd-block">
              <div className="sd-block-header">
                <ShieldCheck size={20} className="sd-block-icon" />
                <h2>Supported Delivery Formats & Packaging</h2>
              </div>
              <div className="sd-formats-tags">
                {solution.deliveryFormats.map((f, i) => (
                  <span className="sd-format-tag" key={i}>
                    <Check size={14} /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="sd-block">
              <div className="sd-block-header">
                <HelpCircle size={20} className="sd-block-icon" />
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="sd-faqs">
                {solution.faqs.map((faq, i) => (
                  <div className="sd-faq-item" key={i}>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Spec Sheet & Quick Action */}
          <aside className="sd-sidebar">
            <div className="sd-sidebar-card">
              <h3>Technical Specifications</h3>
              <dl className="sd-specs-list">
                {solution.specifications.map((spec, i) => (
                  <div className="sd-spec-row" key={i}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="sd-sidebar-cta">
                <p>Ready to tailor this solution to your product pipeline?</p>
                <button type="button" className="button button--lime" onClick={onInquiry}>
                  Inquire Now <ArrowUpRight size={17} />
                </button>
              </div>
            </div>

            {/* Related Solutions Navigation */}
            <div className="sd-related-card">
              <h4>Explore Related Solutions</h4>
              <div className="sd-related-links">
                {related.map((rel) => (
                  <Link to={`/solutions/${rel.slug}`} key={rel.slug} className="sd-related-link">
                    <div>
                      <span>SOLUTION {rel.number}</span>
                      <strong>{rel.title}</strong>
                    </div>
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Certifications Strip */}
      <div className="sd-certifications">
        <Certifications />
      </div>
    </main>
  );
}
