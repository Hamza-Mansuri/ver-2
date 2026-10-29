import type { ReactNode, CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Certifications from '../../sections/Certifications';
import './inner-pages.css';

export type PageProps = { onInquiry: () => void };
export const asset = (file: string) => `/assets/gomzi-pages/${file}`;

export function PageHero({ title, eyebrow, description, image, position = 'center', target = 'page-story', variant = 'dark' }: { title: ReactNode; eyebrow: string; description: string; image: string; position?: string; target?: string; variant?: 'dark' | 'light' }) {
  return <section className={`gip-hero${variant === 'light' ? ' gip-hero-light' : ''}`} style={{ '--gip-image': `url("${asset(image)}")`, '--gip-position': position } as CSSProperties} aria-labelledby="gip-title">
    <div className="container gip-hero-inner"><nav aria-label="Breadcrumb" className="gip-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>{eyebrow}</span></nav><div className="gip-hero-copy"><p className="gip-kicker"><i />GOMZI LIFE SCIENCE / {eyebrow}</p><h1 id="gip-title">{title}</h1><p>{description}</p><a href={`#${target}`} className="gip-explore">EXPLORE <ArrowDown size={17} aria-hidden="true" /></a></div></div>
  </section>;
}

export function PageFrame({ children }: { children: ReactNode }) { return <main id="main-content" className="gomzi-inner">{children}</main>; }
export function QualityMarks() { return <div className="gip-quality"><Certifications /></div>; }
export function Heading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) { return <div className="gip-heading"><div><p className="gip-kicker"><i />{eyebrow}</p><h2>{title}</h2></div>{description ? <p>{description}</p> : null}</div>; }
export function InquiryLink({ onInquiry, label = 'Discuss your project' }: PageProps & { label?: string }) { return <button type="button" className="gip-inquiry" onClick={onInquiry}>{label}<ArrowUpRight size={19} aria-hidden="true" /></button>; }
export function TickList({ items }: { items: string[] }) { return <ul className="gip-ticks">{items.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>; }

export function ProductVisual({ variant = 'bottle' }: { variant?: 'bottle' | 'pouch' }) {
  return <figure className={`gip-product-visual gip-product-${variant}`}><div className="gip-pack" aria-hidden="true"><div className="gip-pack-cap" /><div className="gip-pack-label"><span>YOUR BRAND</span><b>NUTRITION,<br />REIMAGINED.</b><i /><small>{variant === 'pouch' ? 'CUSTOM POWDER BLEND' : 'PRIVATE LABEL COLLECTION'}</small></div><div className="gip-pack-base" /></div><figcaption>ILLUSTRATIVE PACKAGING / CUSTOMISE YOUR IDENTITY</figcaption></figure>;
}

export function RelatedSolutions({ onInquiry }: PageProps) {
  const items = [
    ['01', 'Formulation', 'Shape the composition around your product brief.'],
    ['02', 'Manufacturing', 'Plan the format, batch and quality requirements.'],
    ['03', 'Packaging', 'Give your product a considered brand identity.'],
    ['04', 'Market preparation', 'Align labels and documents with your destination.'],
  ];
  return <section className="gip-section gip-solutions"><div className="container"><Heading eyebrow="END-TO-END SOLUTIONS" title={<>One partner.<br /><em>A connected journey.</em></>} /><div className="gip-solution-grid">{items.map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div><InquiryLink onInquiry={onInquiry} label="Find your solution" /></div></section>;
}
