import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '../components/SectionHeading';

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  inView: boolean;
  duration?: number;
}

function StatItem({ target, suffix, label, inView, duration = 1800 }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    let frameId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target, duration]);

  return (
    <div>
      <strong>
        {count.toLocaleString('en-US')}
        <span>{suffix}</span>
      </strong>
      <span>{label}</span>
    </div>
  );
}

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="who-we-are" className="section about">
      <div className="container about-grid">
        <div className="about-copy">
          <Eyebrow>Who we are</Eyebrow>
          <h2>
            Your brand.<br />
            Our science.<br />
            <em>Shared ambition.</em>
          </h2>
          <p className="lead">A manufacturing partner for the next generation of nutrition.</p>
          <p>
            Based in Surat, India, Gomzi Life Science LLP develops and supplies nutraceutical
            finished products around the requirements of your brand. Our approach brings together
            formulation, research, manufacturing and customised packaging.
          </p>
          <p>
            From powders and tablets to capsules, syrups, softgels and effervescents, we support
            private-label and contract-manufacturing projects for domestic and international markets.
          </p>
          <Link className="text-link" to="/about-us">
            Discover Gomzi <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="about-visual">
          <img
            src="/assets/images/indian-scientist-generated.png"
            width="1024"
            height="682"
            loading="lazy"
            alt="Indian formulation research scientist working with laboratory samples in a clean nutraceutical testing facility"
          />
          <div className="image-caption">
            <span>01 / OUR SCIENCE</span>
            <strong>Science behind your brand.</strong>
          </div>
          <div className="about-label">SCIENCE IN PRACTICE</div>
        </div>
      </div>

      <div className="container about-stats" ref={statsRef}>
        <StatItem
          target={45}
          suffix="+"
          label="Countries in our company profile"
          inView={statsInView}
        />
        <StatItem
          target={1000}
          suffix="+"
          label="Products in our company profile"
          inView={statsInView}
        />
        <StatItem
          target={100}
          suffix="%"
          label="Third-party manufacturing focus"
          inView={statsInView}
        />
        <p>
          Built around your requirements.<br />
          From the first brief to the finished product.
        </p>
      </div>
    </section>
  );
}
