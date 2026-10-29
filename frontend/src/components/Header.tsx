import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { expertise, navigation } from '../data/site';

export default function Header({ onInquiry: _onInquiry }: { onInquiry?: () => void }) {
  const [mobile, setMobile] = useState(false);
  const [sub, setSub] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const root = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobile(false);
    setSub(false);
    setVisible(true);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobile) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = old;
    };
  }, [mobile]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 80 || mobile) {
        setVisible(true);
      } else if (delta > 10) {
        // Scrolling down past threshold
        setVisible(false);
        setSub(false);
      } else if (delta < -10) {
        // Scrolling up past threshold
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobile]);

  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setSub(false);
        setMobile(false);
      }
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSub(false);
        setMobile(false);
      }
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  return (
    <header className={`site-header ${visible ? '' : 'is-hidden'}`} ref={root}>
      <div className="header-inner">
        <Link to="/" aria-label="Gomzi Life Science home" className="brand">
          <img src="/assets/images/logo.webp" width="180" height="66" alt="Gomzi Life Science LLP" />
        </Link>
        <button
          className="menu-toggle icon-button"
          onClick={() => setMobile(!mobile)}
          aria-label={mobile ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobile}
          aria-controls="main-nav"
        >
          {mobile ? <X /> : <Menu />}
        </button>
        <nav id="main-nav" className={mobile ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navigation.map(item =>
            item.path === '/expertise' ? (
              <div className="nav-dropdown" key={item.path}>
                <div className="expertise-controls">
                  <NavLink to={item.path}>{item.title}</NavLink>
                  <button
                    aria-label="Toggle expertise submenu"
                    aria-expanded={sub}
                    aria-controls="expertise-menu"
                    onClick={() => setSub(!sub)}
                  >
                    <ChevronDown size={13} />
                  </button>
                </div>
                <div id="expertise-menu" className={`dropdown-menu ${sub ? 'is-open' : ''}`}>
                  {expertise.map(child => (
                    <NavLink key={child.path} to={child.path}>
                      {child.title}
                      <ArrowUpRight size={14} />
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={item.path} to={item.path}>
                {item.title}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

