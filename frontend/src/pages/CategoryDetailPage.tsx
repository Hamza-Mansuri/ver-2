import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, HelpCircle, Package, Sparkles } from 'lucide-react';
import { categoriesData } from '../data/categoriesData';
import Certifications from '../sections/Certifications';
import './CategoryDetailPage.css';

export default function CategoryDetailPage({ onInquiry }: { onInquiry: () => void }) {
  const { slug } = useParams<{ slug: string }>();
  const category = categoriesData.find((c) => c.slug === slug) || categoriesData[0];

  const related = categoriesData.filter((c) => c.slug !== category.slug).slice(0, 4);

  return (
    <main id="main-content" className="category-detail-page">
      {/* Hero Banner */}
      <section className="cd-hero" aria-labelledby="cd-title">
        <div className="container cd-hero-inner">
          <nav className="cd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link to="/health-categories">Health Categories</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{category.title}</span>
          </nav>

          <div className="cd-hero-content">
            <span className="cd-kicker">
              <span className="cd-dot" />
              CATEGORY {category.number} · NUTRITION & WELLNESS
            </span>
            <h1 id="cd-title">{category.title}</h1>
            <p className="cd-hero-tagline">{category.tagline}</p>

            <div className="cd-hero-actions">
              <button type="button" className="button button--lime" onClick={onInquiry}>
                Start a category conversation <ArrowUpRight size={18} />
              </button>
              <Link to="/health-categories" className="cd-back-link">
                <ArrowLeft size={16} /> Back to all categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="cd-body section">
        <div className="container cd-grid">
          {/* Main Column */}
          <div className="cd-main">
            {/* Visual & Overview Card */}
            <div className="cd-feature-card">
              <div className="cd-image-wrap">
                <img
                  src={category.image}
                  alt={`${category.title} category visual`}
                  width="800"
                  height="500"
                  className="cd-feature-image"
                />
                <span className="cd-badge">CATEGORY {category.number}</span>
              </div>
              <div className="cd-overview">
                <h2>Category Science & Formulation Overview</h2>
                <p>{category.overview}</p>
              </div>
            </div>

            {/* Key Active Ingredients */}
            <div className="cd-block">
              <div className="cd-block-header">
                <Sparkles size={20} className="cd-block-icon" />
                <h2>Key Active Ingredients & Botanical Extracts</h2>
              </div>
              <div className="cd-ingredients-grid">
                {category.keyIngredients.map((item, idx) => (
                  <div className="cd-ing-card" key={idx}>
                    <h3>{item.name}</h3>
                    <p>{item.benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Formats */}
            <div className="cd-block">
              <div className="cd-block-header">
                <Package size={20} className="cd-block-icon" />
                <h2>Available Delivery Formats & Packaging Options</h2>
              </div>
              <div className="cd-formats-grid">
                {category.deliveryFormats.map((fmt, idx) => (
                  <div className="cd-fmt-card" key={idx}>
                    <h4>{fmt.format}</h4>
                    <p>{fmt.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights & Formulation Advantages */}
            <div className="cd-split-block">
              <div className="cd-sub-card">
                <h3>Global Market Growth Drivers</h3>
                <ul>
                  {category.marketInsights.map((insight, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className="cd-check" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cd-sub-card">
                <h3>Gomzi CDMO Advantages</h3>
                <ul>
                  {category.formulationAdvantages.map((adv, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className="cd-check" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="cd-block">
              <div className="cd-block-header">
                <HelpCircle size={20} className="cd-block-icon" />
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="cd-faqs">
                {category.faqs.map((faq, i) => (
                  <div className="cd-faq-item" key={i}>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="cd-sidebar">
            <div className="cd-sidebar-card">
              <h3>Category Specifications</h3>
              <dl className="cd-specs-list">
                {category.specifications.map((spec, i) => (
                  <div className="cd-spec-row" key={i}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="cd-sidebar-cta">
                <p>Looking to launch a product in {category.title}?</p>
                <button type="button" className="button button--lime" onClick={onInquiry}>
                  Request Formulation Samples <ArrowUpRight size={17} />
                </button>
              </div>
            </div>

            {/* Browse Other Categories */}
            <div className="cd-related-card">
              <h4>Browse Other Categories</h4>
              <div className="cd-related-links">
                {related.map((rel) => (
                  <Link to={`/health-categories/${rel.slug}`} key={rel.slug} className="cd-related-link">
                    <div>
                      <span>CATEGORY {rel.number}</span>
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
      <div className="cd-certifications">
        <Certifications />
      </div>
    </main>
  );
}
