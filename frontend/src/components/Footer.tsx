import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { moreLinks, navigation, site } from '../data/site';
export default function Footer({ onInquiry }: { onInquiry: () => void }) {
 return <footer className="site-footer">
  <div className="container footer-cta"><div><p className="eyebrow">YOUR NEXT CHAPTER</p><h2>What can we help<br/>you <em>build?</em></h2></div><div><p>A new formulation. A stronger product line.<br/>A partnership built around your ambition.</p><button className="button button--lime" onClick={onInquiry}>Start a conversation <ArrowUpRight size={18}/></button></div></div>
  <div className="container footer-grid">
   <div className="footer-brand"><Link to="/" aria-label="Home"><img src="/assets/images/logo.webp" alt="Gomzi Life Science LLP" width="180" height="66"/></Link><p>Intelligent nutrition.<br/>Thoughtful manufacturing.<br/>Made in Surat. Built for your world.</p><span>PRIVATE LABEL · CONTRACT MANUFACTURING</span></div>
   <div><h3>Explore</h3>{navigation.map(x => <Link key={x.path} to={x.path}>{x.title}</Link>)}</div>
   <div className="footer-more"><h3>More Links</h3>{moreLinks.map(x => <Link key={x.path} to={x.path}>{x.title}</Link>)}</div>
   <div className="footer-contact"><h3>Contact</h3><a href={`tel:${site.phoneHref}`}><Phone size={15}/>{site.phone}</a><a href={`mailto:${site.email}`}><Mail size={15}/>{site.email}</a><p><MapPin size={15}/><span>{site.address}</span></p><h4>Corporate office</h4><p>{site.corporateAddress}</p><a href={`mailto:${site.domesticEmail}`}>Domestic: {site.domesticEmail}</a></div>
  </div>
  <div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><Link to="/privacy-policy">Privacy Policy</Link><a href="#top" aria-label="Back to top">Back to top ↑</a></div>
 </footer>;
}
