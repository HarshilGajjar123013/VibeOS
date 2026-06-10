import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import './Navbar.scss';

// ─── Data ────────────────────────────────────────────────────────────────────

type PlatformLink = {
  label: string;
  page: string;
  description: string;
  badge: string | null;
};

type ResourceLink = {
  label: string;
  page: string;
  description: string;
};

const PLATFORM_LINKS: PlatformLink[] = [
  { label: 'Engage', page: 'features', description: 'Understand your employees and focus your action plans', badge: null },
  { label: 'Performance Culture Quadrant', page: 'features', description: 'Measure impact across engagement and performance', badge: 'New' },
  { label: 'Retention Insights', page: 'features', description: 'Identify patterns that help you keep great people', badge: null },
  { label: 'DEI Survey', page: 'features', description: 'Capture inclusion feedback across the organization', badge: null },
  { label: 'Ready-to-use Surveys', page: 'features', description: 'Launch proven survey templates faster', badge: null },
  { label: 'AI Comment Summaries', page: 'features', description: 'Turn open-text feedback into concise themes', badge: null },
  { label: 'Proven Action Plans', page: 'features', description: 'Recommend next steps with confidence', badge: null },
  { label: 'Pulse Surveys', page: 'features', description: 'Check in frequently with lightweight surveys', badge: null },
  { label: 'Onboarding/Offboarding Survey', page: 'features', description: 'Learn from critical employee transitions', badge: null },
  { label: 'Benchmarking', page: 'features', description: 'Compare results against relevant norms', badge: null },
];

const RESOURCE_LINKS: ResourceLink[] = [
  { label: 'People Science', page: 'blog', description: 'Expert guidance and proven strategies to build thriving workplaces.' },
  { label: 'Research', page: 'blog', description: 'Industry trends and evidence-based best practices powered by employee insights.' },
  { label: 'Benchmarks', page: 'blog', description: 'Compare your employee experience against relevant industry standards.' },
  { label: 'ROI Calculator', page: 'blog', description: 'Quantify the value of investing in culture and employee engagement.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  // Close drawer on page change
  useEffect(() => { setMobileOpen(false); }, [currentPage]);

  const nav = (page: string) => {
    setCurrentPage(page);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">

          {/* ── Logo ── */}
          <button
            type="button"
            className="navbar__logo"
            onClick={() => nav('landing')}
            aria-label="Go to home"
          >
            Vibe OS
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="navbar__nav" aria-label="Primary navigation">

            {/* Home */}
            <button
              type="button"
              className="navbar__link"
              onClick={() => nav('landing')}
            >
              Home
            </button>

            {/* Platform dropdown */}
            <div className="navbar__dropdown">
              <button
                type="button"
                className="navbar__link navbar__link--trigger"
              >
                Platform
                <span className="navbar__caret" aria-hidden="true" />
              </button>

              <div className="navbar__dropdown-panel navbar__dropdown-panel--platform">
                {/* Left intro */}
                <div className="navbar__platform-intro">
                  <h3 className="navbar__platform-heading">Platform</h3>
                  <p className="navbar__platform-text">
                    Everything you need to listen to employees, understand your culture,
                    and take action at scale.
                  </p>
                </div>

                {/* Grid of links */}
                <div className="navbar__platform-grid">
                  {PLATFORM_LINKS.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      className="navbar__platform-item"
                      onClick={() => nav(link.page)}
                    >
                      <div className="navbar__platform-item-head">
                        <span className="navbar__platform-item-title">{link.label}</span>
                        {link.badge && (
                          <span className="navbar__platform-badge">{link.badge}</span>
                        )}
                      </div>
                      <p className="navbar__platform-item-description">{link.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Science dropdown */}
            <div className="navbar__dropdown">
              <button
                type="button"
                className="navbar__link navbar__link--trigger"
              >
                Science
                <span className="navbar__caret" aria-hidden="true" />
              </button>

              <div className="navbar__dropdown-panel navbar__dropdown-panel--resources">
                {/* Left intro */}
                <div className="navbar__resources-intro">
                  <p className="navbar__resources-kicker">Science</p>
                  <h3 className="navbar__resources-heading">
                    Explore practical guides, research, and tools to build
                    high-performing teams.
                  </h3>
                </div>

                {/* Resource list */}
                <div className="navbar__resources-list">
                  {RESOURCE_LINKS.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      className="navbar__resource-item"
                      onClick={() => nav(link.page)}
                    >
                      <span className="navbar__resource-title">{link.label}</span>
                      <p className="navbar__resource-description">{link.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* About */}
            <button
              type="button"
              className="navbar__link"
              onClick={() => nav('about')}
            >
              About
            </button>

            {/* Contact */}
            <button
              type="button"
              className="navbar__link"
              onClick={() => nav('contact')}
            >
              Contact
            </button>

          </nav>

          {/* ── Action Buttons ── */}
          <div className="navbar__actions">
            <button
              type="button"
              className="navbar__button navbar__button--secondary"
              onClick={() => nav('login')}
            >
              Sign in
            </button>
            <button
              type="button"
              className="navbar__button navbar__button--primary"
              onClick={() => nav('signup')}
            >
              Request a Demo
            </button>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            type="button"
            className={`navbar__menu${mobileOpen ? ' navbar__menu--open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="navbar__drawer" ref={drawerRef} role="dialog" aria-label="Mobile navigation">
          <button type="button" className="navbar__drawer-link" onClick={() => nav('landing')}>Home</button>
          <button type="button" className="navbar__drawer-link" onClick={() => nav('features')}>Platform</button>
          <button type="button" className="navbar__drawer-link" onClick={() => nav('blog')}>Science</button>
          <button type="button" className="navbar__drawer-link" onClick={() => nav('about')}>About</button>
          <button type="button" className="navbar__drawer-link" onClick={() => nav('contact')}>Contact</button>
          <div className="navbar__drawer-divider" />
          <div className="navbar__drawer-actions">
            <button
              type="button"
              className="navbar__button navbar__button--secondary"
              onClick={() => nav('login')}
            >
              Sign in
            </button>
            <button
              type="button"
              className="navbar__button navbar__button--primary"
              onClick={() => nav('signup')}
            >
              Request a Demo
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
