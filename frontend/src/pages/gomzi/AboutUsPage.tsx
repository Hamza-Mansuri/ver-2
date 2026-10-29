import { PageFrame, PageHero, Heading, QualityMarks, InquiryLink, asset, type PageProps } from './PageElements';

// Company narrative and commercial figures adapted only from:
// https://www.gomzilifesciences.in/aboutus (accessed 29 October 2026).
const journey = [
 ['Idea & strategy','Define your category, audience and positioning.'],
 ['Formulation','Develop the formulation and approve samples.'],
 ['Manufacturing & QC','Produce the batch with checks and documentation.'],
 ['Packaging','Prepare the product’s packaging identity.'],
 ['Launch support','Establish a website and marketing foundation.'],
];
const values=[['Certified integrity','Quality remains central to the work.'],['Brand-builder mindset','Think like the founders we support.'],['Speed as a standard','Keep the launch moving forward.'],['Accessible craftsmanship','Make small launches possible.'],['Transparency','Communicate pricing and formulations clearly.'],['Innovation','Create differentiated products and flavours.']];
export default function AboutUsPage({onInquiry}:PageProps) {
 return <PageFrame><PageHero eyebrow="ABOUT GOMZI" title={<>Built for founders.<br/><em>Made for possibility.</em></>} description="A Surat-based B2B nutraceutical partner, supporting supplement brands from idea to launch." image="about-hero.jpg" position="center 35%"/>
 <section className="gip-section" id="page-story"><div className="container gip-split"><div className="gip-split-visual"><img src={asset('about-strong-beginning.jpg')} width="900" height="900" alt="Founders and formulation scientists collaborating on nutraceutical prototypes" loading="lazy"/></div><div className="gip-copy"><p className="gip-kicker"><i/>WHY WE EXIST</p><h2>Strong ideas deserve<br/><em>a strong beginning.</em></h2><p>Gomzi Life Sciences LLP supports sports nutrition, multivitamin and whey protein brands with formulation, manufacturing, packaging and launch guidance.</p><p>We help new founders start smaller, with practical support, Indian flavour innovation and a clear path to market.</p><div className="gip-about-facts"><div><strong>50–100</strong><span>KG MOQ PER SKU</span></div><div><strong>15–20</strong><span>DAYS FOR STANDARD ORDERS</span></div><div><strong>Surat</strong><span>OUR HOME IN INDIA</span></div></div><InquiryLink onInquiry={onInquiry} label="Start your brand"/></div></div></section>
 <section className="gip-section gip-topics"><div className="container"><Heading eyebrow="THE BRAND LAUNCH JOURNEY" title={<>From the first idea.<br/><em>To a ready-to-sell brand.</em></>}/><div className="gip-journey">{journey.map(([title,text],i)=><article key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
 <section className="gip-section gip-values-section"><div className="container"><Heading eyebrow="OUR CORE VALUES" title={<>A manufacturing partner.<br/><em>A brand-builder’s mindset.</em></>}/><div className="gip-values">{values.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><QualityMarks/></PageFrame>;
}
