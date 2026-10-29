import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '../components/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Understand your vision',
    text: 'We start with your product idea, target market and requirements. A clear brief sets the direction.',
  },
  {
    number: '02',
    title: 'Develop & refine',
    text: 'Ingredients, formulation and pilot samples are reviewed together, with attention to your chosen format.',
  },
  {
    number: '03',
    title: 'Create your identity',
    text: 'Packaging and labels take shape around your brand, product specifications and market requirements.',
  },
  {
    number: '04',
    title: 'Manufacture & deliver',
    text: 'Production, quality review and dispatch bring the finished product one step closer to your customers.',
  },
];

export default function Process({ onInquiry }: { onInquiry: () => void }) {
  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <div className="container">
        <div className="process-grid">
          <div className="process-content">
            <Eyebrow>Our development process</Eyebrow>
            <h2 id="process-title">
              From Concept to<br />
              <em>Commercial Success</em>
            </h2>
            <p className="lead process-lead">
              Gomzi works with your brand from the first conversation to shelf-ready commercial products.
              A collaborative journey with precision manufacturing at every stage.
            </p>

            <div className="process-steps">
              {steps.map(step => (
                <article key={step.title} className="process-step">
                  <div className="step-header">
                    <span className="step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>

            <div className="process-bottom">
              <button className="button button--lime" onClick={onInquiry}>
                Discuss your project <ArrowUpRight size={17} />
              </button>
              <span className="process-note">CONFIDENTIAL &amp; TAILORED TO YOUR BRAND</span>
            </div>
          </div>

          <div className="process-visual">
            <div className="process-visual__card">
              <img
                src="/assets/images/commercial-partnership.webp"
                width="1024"
                height="682"
                loading="lazy"
                alt="Strategic corporate partnership and boardroom contract agreement for private-label nutraceutical manufacturing"
              />
              <div className="image-caption">
                <span>04 / STRATEGIC PARTNERSHIP</span>
                <strong>Collaborative commercial success.</strong>
              </div>
              <div className="process-label">COMMERCIAL REALITY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
