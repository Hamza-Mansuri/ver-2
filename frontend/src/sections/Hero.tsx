import { ArrowDown } from 'lucide-react';
import { site } from '../data/site';
export default function Hero() {
 return <section className="hero" aria-labelledby="hero-title">
  <h1 id="hero-title" className="sr-only">Gomzi Life Science - Nutraceutical manufacturing and export</h1>
  {site.heroVideo ? <video autoPlay muted loop playsInline preload="metadata" poster={site.heroPoster || undefined} className="hero-video"><source src={site.heroVideo} type="video/mp4"/></video> : <div className="hero-video-slot" aria-label="Reserved for Gomzi company video"><span className="hero-monogram" aria-hidden="true">G</span><span className="video-note">COMPANY FILM · COMING SOON</span></div>}
  <div className="hero-bottom"><span>INTELLIGENT NUTRITION<br/><b>CONTRACT MANUFACTURING</b></span><span className="hero-location">SURAT, INDIA · GLOBAL POSSIBILITIES</span><a href="#who-we-are" aria-label="Discover Gomzi"><ArrowDown size={21}/></a></div>
 </section>;
}
