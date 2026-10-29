import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Globe2 } from 'lucide-react';
import { Eyebrow } from '../components/SectionHeading';
import { getRoutePath, markets, origin, project } from '../data/markets';
import { worldPath } from '../data/worldPath';

// Badge positions and dimensions calibrated for clean typography and zero overlap
const marketBadges: Record<
  string,
  { x: number; y: number; w: number; h: number; lineTo: { x: number; y: number } }
> = {
  uk: { x: 430, y: 92, w: 126, h: 24, lineTo: { x: 499.7, y: 104.0 } },
  dubai: { x: 575, y: 182, w: 96, h: 24, lineTo: { x: 653.5, y: 185.6 } },
  africa: { x: 430, y: 245, w: 126, h: 24, lineTo: { x: 524.1, y: 235.6 } },
  'sri-lanka': { x: 740, y: 276, w: 90, h: 24, lineTo: { x: 724.4, y: 239.4 } },
  bangladesh: { x: 825, y: 178, w: 104, h: 24, lineTo: { x: 751.0, y: 190.3 } },
  asia: { x: 885, y: 226, w: 114, h: 24, lineTo: { x: 800.8, y: 220.2 } },
};

const suratBadge = {
  x: 670,
  y: 146,
  w: 154,
  h: 26,
  lineTo: { x: 702.3, y: 198.1 },
};

export default function GlobalPresence({ onInquiry }: { onInquiry: () => void }) {
  const [active, setActive] = useState('uk');
  const [hovered, setHovered] = useState<string | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [inView, setInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const selected = markets.find(market => market.id === active) || markets[0];
  const start = useMemo(() => project(origin.lon, origin.lat), []);

  // Monitor viewport size for responsive SVG viewBox
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const routes = useMemo(() => {
    return markets.map((market, index) => {
      const endpoint = project(market.lon, market.lat);
      const d = getRoutePath(start, endpoint, market.id);
      return {
        ...market,
        endpoint,
        d,
        delay: index * 170,
      };
    });
  }, [start]);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          setHasEntered(true);
          setInView(true);
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
          setInView(false);
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5] }
    );

    observer.observe(el);

    const handleVisibility = () => {
      setIsPageVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const isPaused = !inView || !isPageVisible;
  const emphasizedId = hovered || active;

  return (
    <section id="global" className="section global" aria-labelledby="global-title">
      <div className="container">
        <div className="global__top">
          <div className="global__headings">
            <Eyebrow>06 / Global presence</Eyebrow>
            <h2 id="global-title">
              Rooted in India.<br />
              <span>Open to the world.</span>
            </h2>
          </div>
          <p className="global__intro">
            Different markets. Shared ambition.<br />
            Connecting nutrition brands with<br className="desktop-break" /> possibilities beyond borders.
          </p>
        </div>

        {/* Mobile / Tablet Horizontal Market Selector Bar */}
        <div className="market-chips-scroll" role="tablist" aria-label="Select export destination">
          {markets.map(market => {
            const isSelected = active === market.id;
            return (
              <button
                key={market.id}
                role="tab"
                aria-selected={isSelected}
                className={`market-chip${isSelected ? ' is-active' : ''}`}
                onClick={() => setActive(market.id)}
              >
                <span className="market-chip__dot" aria-hidden="true" />
                <span className="market-chip__name">{market.name}</span>
              </button>
            );
          })}
        </div>

        <div className="global__layout">
          <div className="global__details">
            <span className="global__small-label">
              <Globe2 size={16} />OUR INTERNATIONAL OUTLOOK
            </span>

            {/* Desktop Market List Buttons */}
            <div className="market-buttons" role="group" aria-label="Explore a market">
              {markets.map(market => (
                <button
                  key={market.id}
                  className={active === market.id ? 'is-active' : ''}
                  aria-pressed={active === market.id}
                  onClick={() => setActive(market.id)}
                  onMouseEnter={() => setHovered(market.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(market.id)}
                  onBlur={() => setHovered(null)}
                >
                  <span>{market.name}</span>
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>

            {/* Active Market Card */}
            <div className="market-detail" aria-live="polite">
              <span className="market-detail__region">{selected.region}</span>
              <h3 className="market-detail__title">{selected.name}</h3>
              <p>{selected.description}</p>
            </div>

            <button className="text-link global__inquiry-link" onClick={onInquiry}>
              Let’s explore your market <ArrowUpRight size={17} />
            </button>
          </div>

          <div
            ref={mapRef}
            className={`world-map${hasEntered ? ' is-in-view' : ''}${isPaused ? ' is-paused' : ''}`}
          >
            <div className="map-svg-wrapper">
              <svg
                viewBox={isMobile ? '350 45 600 255' : '0 0 1000 450'}
                preserveAspectRatio="xMidYMid meet"
                role="group"
                aria-label="World map showing Gomzi in Surat, India connected to United Kingdom, African markets, Dubai UAE, Sri Lanka, Bangladesh, and Asian markets"
              >
                {/* World Map Landmasses */}
                <path d={worldPath} fill="currentColor" stroke="var(--sage)" strokeWidth="0.7" />

                {/* Animated Export Connection Arcs */}
                <g className="map-routes" pointerEvents="none" aria-hidden="true">
                  {routes.map(route => {
                    const isEmphasized = route.id === emphasizedId;
                    const isCurrentActive = route.id === active;
                    return (
                      <g
                        key={route.id}
                        className={`map-route-group${isEmphasized ? ' is-emphasized' : ''}${isCurrentActive ? ' is-active' : ''}`}
                      >
                        {/* Static base track */}
                        <path className="map-route-base" d={route.d} />
                        {/* Progressive entrance drawing line */}
                        <path
                          className="map-route-draw"
                          d={route.d}
                          pathLength={1}
                          style={{
                            animationDelay: `${route.delay}ms`,
                          }}
                        />
                        {/* Flowing export pulse travelling outward */}
                        <path
                          className="map-route-flow"
                          d={route.d}
                          pathLength={1}
                          style={{
                            animationDelay: `${route.delay + 1200}ms`,
                          }}
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Leader lines from badges to destination points */}
                <g className="map-badge-leaders" pointerEvents="none" aria-hidden="true">
                  {/* Surat leader line */}
                  <line
                    x1={suratBadge.x}
                    y1={suratBadge.y + suratBadge.h / 2}
                    x2={suratBadge.lineTo.x}
                    y2={suratBadge.lineTo.y}
                    className="map-badge-leader map-badge-leader--origin"
                  />
                  {/* Destination leader lines */}
                  {markets.map(market => {
                    const badge = marketBadges[market.id];
                    if (!badge) return null;
                    const isSel = active === market.id;
                    return (
                      <line
                        key={`leader-${market.id}`}
                        x1={badge.x}
                        y1={badge.y}
                        x2={badge.lineTo.x}
                        y2={badge.lineTo.y}
                        className={`map-badge-leader${isSel ? ' is-active' : ''}`}
                      />
                    );
                  })}
                </g>

                {/* Origin Marker: Surat, India */}
                <g className="map-origin" transform={`translate(${start.x},${start.y})`}>
                  <circle className="map-origin__pulse" r="12" />
                  <circle r="22" className="map-origin__halo" />
                  <circle r="12" className="map-origin__core" />
                  <text textAnchor="middle" y="4" className="map-origin__text">G</text>
                  <title>Gomzi · Surat, India (HQ &amp; Manufacturing Facility)</title>
                </g>

                {/* Destination Point Markers */}
                {markets.map(market => {
                  const point = project(market.lon, market.lat);
                  const isSelected = active === market.id;
                  const isHovered = hovered === market.id;
                  return (
                    <g
                      key={`pt-${market.id}`}
                      className={`map-marker${isSelected ? ' is-active' : ''}${isHovered ? ' is-hovered' : ''}`}
                      transform={`translate(${point.x},${point.y})`}
                      aria-label={market.name}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onClick={() => setActive(market.id)}
                      onMouseEnter={() => setHovered(market.id)}
                      onMouseLeave={() => setHovered(null)}
                      onKeyDown={event => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActive(market.id);
                        }
                      }}
                    >
                      <circle className="map-marker__hit" r="24" />
                      <circle className="map-marker__halo" r="18" />
                      <circle className="map-marker__pin" r="7" />
                    </g>
                  );
                })}

                {/* Visible Origin Badge: ★ Surat (HQ & Plant) */}
                <g
                  className="map-badge-group map-badge-group--origin"
                  transform={`translate(${suratBadge.x},${suratBadge.y})`}
                >
                  <rect
                    className="map-badge-rect map-badge-rect--origin"
                    x={-suratBadge.w / 2}
                    y={-suratBadge.h / 2}
                    width={suratBadge.w}
                    height={suratBadge.h}
                    rx={suratBadge.h / 2}
                  />
                  <text
                    className="map-badge-text map-badge-text--origin"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    ★ Surat (HQ &amp; Plant)
                  </text>
                </g>

                {/* Visible Country Pill Badges for all 6 Destination Markets */}
                {markets.map(market => {
                  const badge = marketBadges[market.id];
                  if (!badge) return null;
                  const isSelected = active === market.id;
                  const isHovered = hovered === market.id;
                  return (
                    <g
                      key={`badge-${market.id}`}
                      className={`map-badge-group${isSelected ? ' is-active' : ''}${isHovered ? ' is-hovered' : ''}`}
                      transform={`translate(${badge.x},${badge.y})`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${market.name}`}
                      onClick={() => setActive(market.id)}
                      onMouseEnter={() => setHovered(market.id)}
                      onMouseLeave={() => setHovered(null)}
                      onKeyDown={event => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActive(market.id);
                        }
                      }}
                    >
                      {/* Hit target for easy tap on mobile */}
                      <rect
                        className="map-badge-hit"
                        x={-badge.w / 2 - 8}
                        y={-badge.h / 2 - 8}
                        width={badge.w + 16}
                        height={badge.h + 16}
                      />
                      {/* Pill container */}
                      <rect
                        className="map-badge-rect"
                        x={-badge.w / 2}
                        y={-badge.h / 2}
                        width={badge.w}
                        height={badge.h}
                        rx={badge.h / 2}
                      />
                      {/* Indicator dot */}
                      <circle
                        className="map-badge-dot"
                        cx={-badge.w / 2 + 10}
                        cy={0}
                        r={4}
                      />
                      {/* Visible Country Name */}
                      <text
                        className="map-badge-text"
                        x={-badge.w / 2 + 20}
                        y={1}
                        dominantBaseline="central"
                      >
                        {market.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Market Banner */}
            <div className="map-selected">
              <span className="map-g" aria-hidden="true">G</span>
              <div>
                <span>EXPLORING POSSIBILITIES IN</span>
                <strong>{selected.name}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
