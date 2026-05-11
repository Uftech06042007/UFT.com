// ===== Shared components: Nav, Footer, Icons, Page shell =====
const { useState, useEffect, useRef } = React;

// ---- Icons ----
const Icon = {
  Sun: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  Moon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Arrow: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>,
  ArrowUR: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 11L11 5M6 5h5v5"/></svg>,
  Plus: () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3v10M3 8h10"/></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3l10 10M13 3L3 13"/></svg>,
  LinkedIn: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>,
  Twitter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Facebook: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  Email: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  Phone: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Pin: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Menu: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
};

// ---- Theme toggle hook ----
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('uft-theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('uft-theme', theme);
  }, [theme]);
  return [theme, () => setTheme(t => t === 'dark' ? 'light' : 'dark')];
}

// ---- Router ----
function useRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || 'home');
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash.slice(1) || 'home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

// ---- Logo ----
const Logo = () => (
  <a href="#home" className="nav-logo">
    <img src="assets/uft-logo.png" alt="UFT — Inspired Innovations" className="nav-logo-img" />
  </a>
);

// ---- Modern command-bar overlay ----
function NavOverlay({ open, onClose }) {
  const data = window.UFT_DATA;
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  return (
    <div className={`nav-overlay ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="nav-overlay-panel" onClick={e => e.stopPropagation()}>
        <div className="nav-overlay-head">
          <span className="mono dim" style={{ fontSize: 11, letterSpacing: '0.14em' }}>EXPLORE UFT</span>
          <button className="overlay-close" onClick={onClose} aria-label="Close"><Icon.X /></button>
        </div>
        <div className="nav-overlay-body">
          <div className="overlay-col">
            <h4 className="overlay-h">Services</h4>
            <ul className="overlay-list">
              {data.services.map((s, i) => (
                <li key={s.id}>
                  <a href="#services" onClick={onClose}>
                    <span className="mono dim" style={{ fontSize: 11, width: 28 }}>0{i+1}</span>
                    <span>{s.title}</span>
                    <Icon.ArrowUR />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="overlay-col">
            <h4 className="overlay-h">Industries</h4>
            <ul className="overlay-list">
              {data.industries.map((ind, i) => (
                <li key={ind.id}>
                  <a href="#industries" onClick={onClose}>
                    <span className="mono dim" style={{ fontSize: 11, width: 28 }}>0{i+1}</span>
                    <span>{ind.name}</span>
                    <Icon.ArrowUR />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="overlay-col">
            <h4 className="overlay-h">Company</h4>
            <ul className="overlay-list">
              <li><a href="#about" onClick={onClose}><span>About us</span><Icon.ArrowUR /></a></li>
              <li><a href="#careers" onClick={onClose}><span>Careers & culture</span><Icon.ArrowUR /></a></li>
              <li><a href="#jobs" onClick={onClose}><span>Open roles</span><Icon.ArrowUR /></a></li>
              <li><a href="#contact" onClick={onClose}><span>Contact</span><Icon.ArrowUR /></a></li>
              <li><a href="#contact" onClick={onClose}><span>Locations</span><Icon.ArrowUR /></a></li>
            </ul>
            <div className="overlay-cta">
              <span className="mono dim" style={{ fontSize: 11, letterSpacing: '0.12em' }}>GET IN TOUCH</span>
              <a href="mailto:info@uftech.in" className="overlay-cta-line">info@uftech.in</a>
              <a href="tel:+918951390893" className="overlay-cta-line">+91 8951 390 893</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Nav ----
function Nav({ route }) {
  const [theme, toggleTheme] = useTheme();
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Logo />
          <div className="nav-links">
            <a href="#home" className={`nav-link ${route === 'home' ? 'active' : ''}`}>Home</a>
            <a href="#about" className={`nav-link ${route === 'about' ? 'active' : ''}`}>About</a>
            <a href="#careers" className={`nav-link ${route === 'careers' ? 'active' : ''}`}>Careers</a>
            <a href="#contact" className={`nav-link ${route === 'contact' ? 'active' : ''}`}>Contact</a>
          </div>
          <div className="nav-cta">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
            </button>
            <button className="explore-btn" onClick={() => setOverlayOpen(true)}>
              <span>Explore</span>
              <Icon.Plus />
            </button>
          </div>
        </div>
      </nav>
      <NavOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  );
}

// ---- Footer ----
function Footer() {
  const data = window.UFT_DATA;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p style={{ marginTop: 16, color: 'var(--fg-muted)', fontSize: 14, maxWidth: 280 }}>
              Inspired Innovations — software, engineering, and talent for global enterprises since 2005.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <a href={data.contact.socials.linkedin} className="social-btn"><Icon.LinkedIn /></a>
              <a href={data.contact.socials.twitter} className="social-btn"><Icon.Twitter /></a>
              <a href={data.contact.socials.facebook} className="social-btn"><Icon.Facebook /></a>
            </div>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              {data.services.map(s => <li key={s.id}><a href="#services">{s.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h5>Industries</h5>
            <ul>
              {data.industries.slice(0,5).map(i => <li key={i.id}><a href="#industries">{i.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#contact">Locations</a></li>
            </ul>
          </div>
          <div>
            <h5>Get in touch</h5>
            <ul>
              <li><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></li>
              {data.contact.phones.map(p => <li key={p}><a href={`tel:${p.replace(/\s/g,'')}`}>{p}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 UNITFORCE TECHNOLOGIES · ALL RIGHTS RESERVED</span>
          <span>BRIDGING BUSINESS & TECHNOLOGY</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Logo, Nav, Footer, useTheme, useRoute });
