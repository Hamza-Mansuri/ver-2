import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Certifications from '../sections/Certifications';
import './SolutionsPage.css';

const solutions = [
  {
    number: '01', title: 'Formulation & development',
    description: 'Thoughtful formulations shaped around your product, audience and market.',
    image: 'formulation.jpg', alt: 'Gloved laboratory worker preparing capsules',
    tag: 'THE SCIENCE',
  },
  {
    number: '02', title: 'Private-label manufacturing',
    description: 'Nutraceutical formats developed and manufactured around your brand’s requirements.',
    image: 'manufacturing.jpg', alt: 'Capsules being prepared in a laboratory',
    tag: 'YOUR BRAND',
  },
  {
    number: '03', title: 'Export planning & documentation',
    description: 'Packaging and supporting documentation considered for your destination market.',
    image: 'global-export.jpg', alt: 'Aerial view of shipping containers at a seaport',
    tag: 'MARKET READINESS',
  },
  {
    number: '04', title: 'Dispatch coordination',
    description: 'A coordinated handover from finished products to your chosen shipping partners.',
    image: 'logistics.jpg', alt: 'Cargo containers and cranes at an international port',
    tag: 'THE NEXT CHAPTER',
  },
  {
    number: '05', title: 'Analytical testing & quality assurance',
    description: 'Rigorous in-house HPLC assays, microbial testing, heavy metal screening and batch COA validation.',
    image: 'solutions-quality.jpg', alt: 'Analytical chemist conducting quality testing with lab equipment',
    tag: 'ANALYTICAL RIGOR',
  },
  {
    number: '06', title: 'Custom premix & microencapsulation',
    description: 'High-homogeneity vitamin, mineral, and botanical premixes engineered for maximum bioavailability.',
    image: 'solutions-premix.jpg', alt: 'Precision microencapsulated nutrient granules and premix blending',
    tag: 'ADVANCED FORMULATION',
  },
  {
    number: '07', title: 'Regulatory dossiers & global compliance',
    description: 'Turnkey technical documentation, stability studies, and registration dossiers tailored for your target export region.',
    image: 'solutions-regulatory.jpg', alt: 'International regulatory compliance and export documentation dossiers',
    tag: 'GLOBAL COMPLIANCE',
  },
  {
    number: '08', title: 'Custom packaging & brand presentation',
    description: 'Versatile packaging formats including HDPE bottles, blister packs, sachets, stick packs and luxury cartons.',
    image: 'solutions-packaging.jpg', alt: 'Premium nutraceutical bottles, blister packs, jars and stand-up pouches',
    tag: 'BRAND EXCELLENCE',
  },
];

/** Mount inside V2's existing shared Header/Footer shell. */
export default function SolutionsPage({ onInquiry }: { onInquiry: () => void }) {
  return (
    <main id="main-content" className="gomzi-solutions">
      <section className="gs-hero" aria-labelledby="gs-title">
        <div className="container gs-hero-inner">
          <nav className="gs-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Solutions</span>
          </nav>
          <p className="gs-kicker"><span />FROM SURAT. FOR YOUR WORLD.</p>
          <h1 id="gs-title">Your next market.<br /><em>Our shared ambition.</em></h1>
          <div className="gs-hero-bottom">
            <p>Nutraceutical manufacturing and export,<br className="gs-desktop-break" /> built around your brand.</p>
            <a href="#export-solutions" className="gs-scroll"><span>EXPLORE OUR SOLUTIONS</span><ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="export-solutions" className="gs-solutions" aria-labelledby="gs-solutions-title">
        <div className="container">
          <div className="gs-intro">
            <div><p className="gs-kicker gs-kicker-dark"><span />A CONNECTED APPROACH</p><h2 id="gs-solutions-title">Made for your brand.<br /><em>Ready for what’s next.</em></h2></div>
            <p>From formulation to dispatch, Gomzi Life Science brings your product journey together.</p>
          </div>
          <div className="gs-grid">
            {solutions.map(solution => (
              <article className="gs-card" key={solution.number}>
                <div className="gs-card-image">
                  <img src={`/assets/solutions/${solution.image}`} alt={solution.alt} width="1000" height="667" loading="lazy" decoding="async" />
                  <span className="gs-card-number">{solution.number}</span>
                </div>
                <div className="gs-card-body">
                  <span className="gs-card-tag">{solution.tag}</span>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <button type="button" className="gs-card-action" onClick={onInquiry} aria-label={`Discuss ${solution.title.toLowerCase()}`}><span>Discuss your project</span><ArrowUpRight size={19} aria-hidden="true" /></button>
                </div>
              </article>
            ))}
          </div>
          <div className="gs-note"><span className="gs-note-dot" aria-hidden="true" /><p>Your product. Your market. One considered partnership.</p><button type="button" onClick={onInquiry}>Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></button></div>
        </div>
      </section>

      <div className="gs-certifications"><Certifications /></div>
    </main>
  );
}
