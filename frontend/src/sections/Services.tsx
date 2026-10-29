import { ArrowUpRight, FlaskConical, Package, Factory, ShieldCheck, ScanLine, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/SectionHeading';
const services = [
 { title: 'Product development', text: 'Turn a clear brief into a considered formulation, shaped around your ingredients, format and market.', icon: FlaskConical, path: '/solutions' },
 { title: 'Private label services', text: 'Build a product that belongs to your brand, with customised composition, identity and specifications.', icon: ScanLine, path: '/expertise/private-label-services' },
 { title: 'Contract manufacturing', text: 'Bring your formulation to life across powders, tablets, capsules, syrups, softgels and effervescents.', icon: Factory, path: '/expertise/bulk-supplements-manufacturing' },
 { title: 'Packaging & labelling', text: 'Connect product protection with thoughtful design, labels and packaging tailored to your requirements.', icon: Package, path: '/solutions' },
 { title: 'Quality assurance', text: 'Support product consistency through process review, documentation and dedicated quality management.', icon: ShieldCheck, path: '/about-us' },
 { title: 'Export collaboration', text: 'Plan your next market together, with packaging and supporting documentation considered from the start.', icon: Globe2, path: '/global-nutraceutical-cdmo-and-export-manufacturer' },
];
export default function Services() { return <section className="section services"><div className="container"><div className="services-top"><div><Eyebrow>Comprehensive nutraceutical services</Eyebrow><h2>End-to-End<br/><em>Nutraceutical Solutions</em></h2></div><p>A joined-up approach.<br/>One partner for your product journey.</p></div><div className="services-grid">{services.map((x,i) => <Link to={x.path} className="service-card" key={x.title}><div className="service-card-top"><x.icon size={44} strokeWidth={1.35}/><span>0{i+1}</span></div><h3>{x.title}</h3><p>{x.text}</p><ArrowUpRight className="service-arrow" size={18}/></Link>)}</div></div></section>; }
