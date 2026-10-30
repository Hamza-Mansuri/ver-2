import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Certifications from '../sections/Certifications';
import { solutionsData } from '../data/solutionsData';
import './SolutionsPage.css';

/** Mount inside V2's existing shared Header/Footer shell. */
export default function SolutionsPage({ onInquiry }: { onInquiry: () => void }) {
  return (
    <main id="main-content" className="gomzi-solutions">
      {/* Hero Banner */}
      <section className="gs-hero" aria-labelledby="gs-title">
        <div className="container gs-hero-inner">
          <nav className="gs-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Solutions</span>
          </nav>
          <p className="gs-kicker"><span />FROM SURAT. FOR YOUR WORLD.</p>
          <h1 id="gs-title">Your next market.<br /><em>Our shared ambition.</em></h1>
          <div className="gs-hero-bottom">
            <p>Nutraceutical manufacturing and export,<br className="gs-desktop-break" /> built around your brand.</p>
            <a href="#export-solutions" className="gs-scroll">
              <span>EXPLORE OUR SOLUTIONS</span>
              <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Solutions Cards Grid */}
      <section id="export-solutions" className="gs-solutions" aria-labelledby="gs-solutions-title">
        <div className="container">
          <div className="gs-intro">
            <div>
              <p className="gs-kicker gs-kicker-dark"><span />A CONNECTED APPROACH</p>
              <h2 id="gs-solutions-title">Made for your brand.<br /><em>Ready for what’s next.</em></h2>
            </div>
            <p>From formulation to dispatch, Gomzi Life Science brings your product journey together.</p>
          </div>

          <div className="gs-grid">
            {solutionsData.map((solution) => (
              <article className="gs-card" key={solution.number}>
                <Link to={`/solutions/${solution.slug}`} className="gs-card-image-link" aria-label={`View details for ${solution.title}`}>
                  <div className="gs-card-image">
                    <img
                      src={solution.image}
                      alt={solution.alt}
                      width="1000"
                      height="667"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="gs-card-number">{solution.number}</span>
                  </div>
                </Link>

                <div className="gs-card-body">
                  <span className="gs-card-tag">{solution.tag}</span>
                  <h3>
                    <Link to={`/solutions/${solution.slug}`}>{solution.title}</Link>
                  </h3>
                  <p>{solution.tagline}</p>
                  <Link
                    to={`/solutions/${solution.slug}`}
                    className="gs-card-action"
                    aria-label={`Explore details for ${solution.title}`}
                  >
                    <span>Explore solution details</span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="gs-note">
            <span className="gs-note-dot" aria-hidden="true" />
            <p>Your product. Your market. One considered partnership.</p>
            <button type="button" onClick={onInquiry}>
              Discuss your project <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <div className="gs-certifications">
        <Certifications />
      </div>
    </main>
  );
}
