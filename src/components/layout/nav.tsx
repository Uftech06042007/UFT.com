"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";
import { useTheme } from "@/hooks/use-theme";

function Logo() {
  return (
    <Link href="/" className="nav-logo" style={{ marginLeft: "-24px" }}>
      <Image
        src="/assets/uft-logo.png"
        alt="UFT — Inspired Innovations"
        className="nav-logo-img logo-light"
        width={120}
        height={36}
        priority
        style={{ width: "auto", height: 34, filter: "contrast(1.3) brightness(1.1)" }}
      />
      <Image
        src="/assets/uft-logo-dark.png"
        alt="UFT — Inspired Innovations"
        className="nav-logo-img logo-dark"
        width={120}
        height={36}
        priority
        style={{ width: "auto", filter: "contrast(1.3) brightness(1.2)" }}
      />
      <span className="nav-logo-wordmark" style={{
        display: "flex",
        flexDirection: "column",
        color: "#223778",
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: "-0.02em",
        fontStretch: "condensed",
      }}>
        <span>UNITFORCE</span>
        <span>TECHNOLOGIES</span>
      </span>
    </Link>
  );
}

function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop dim — separate from panel so panel's backdrop-filter hits real page content */}
      <div className={`nav-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <div className={`nav-overlay-panel ${open ? "open" : ""}`}>
        <div className="nav-overlay-head">
          <span className="mono dim" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
            EXPLORE UFT
          </span>
          <button className="overlay-close" onClick={onClose} aria-label="Close">
            <Icon.X />
          </button>
        </div>
        <div className="nav-overlay-body">
          <div className="overlay-col">
            <h4 className="overlay-h">Services</h4>
            <ul className="overlay-list">
              {UFT_DATA.services.map((s, i) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} onClick={onClose}>
                    <span className="mono dim" style={{ fontSize: 11, width: 28 }}>
                      0{i + 1}
                    </span>
                    <span>{s.title}</span>
                    <Icon.ArrowUR />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="overlay-col">
            <h4 className="overlay-h">Industries</h4>
            <ul className="overlay-list">
              {UFT_DATA.industries.map((ind, i) => (
                <li key={ind.id}>
                  <Link href={`/#industries-section`} onClick={onClose}>
                    <span className="mono dim" style={{ fontSize: 11, width: 28 }}>
                      0{i + 1}
                    </span>
                    <span>{ind.name}</span>
                    <Icon.ArrowUR />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="overlay-col">
            <h4 className="overlay-h">Company</h4>
            <ul className="overlay-list">
              <li>
                <Link href="/about" onClick={onClose}>
                  <span>About us</span>
                  <Icon.ArrowUR />
                </Link>
              </li>
              <li>
                <Link href="/careers" onClick={onClose}>
                  <span>Careers &amp; culture</span>
                  <Icon.ArrowUR />
                </Link>
              </li>
              <li>
                <a href="https://uftech.in/jobs" target="_blank" rel="noreferrer" onClick={onClose}>
                  <span>Open roles</span>
                  <Icon.ArrowUR />
                </a>
              </li>
              <li>
                <Link href="/contact" onClick={onClose}>
                  <span>Contact</span>
                  <Icon.ArrowUR />
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={onClose}>
                  <span>Locations</span>
                  <Icon.ArrowUR />
                </Link>
              </li>
            </ul>
            <div className="overlay-cta">
              <span className="mono dim" style={{ fontSize: 11, letterSpacing: "0.12em" }}>
                GET IN TOUCH
              </span>
              <a href="mailto:info@uftech.com" className="overlay-cta-line">
                info@uftech.com
              </a>
              <a href="tel:+918951390893" className="overlay-cta-line">
                +91 8951 390 893
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Nav() {
  const [, toggleTheme] = useTheme();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const navLinksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hoverIndicatorRef = useRef<HTMLDivElement>(null);
  const themeToggleRef = useRef<HTMLButtonElement>(null);
  const firstRender = useRef(true);
  const lastY = useRef(0);
  const scrollAcc = useRef(0);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const isMobile = window.innerWidth <= 900;
      // Hysteresis (dead-zone) so small scrolls near the threshold don't flip
      // attached <-> island repeatedly, which reads as jitter.
      if (isMobile) {
        setScrolled(prev => (prev ? y > 6 : y > 28));
      } else {
        setScrolled(y > 8);
      }
      // Hide/show on direction, but only after SUSTAINED movement so momentum-scroll
      // wobble (rapid +/- deltas) can't bounce the bar up and down.
      const delta = y - lastY.current;
      if ((delta > 0) !== (scrollAcc.current > 0)) scrollAcc.current = 0;
      scrollAcc.current += delta;
      if (scrollAcc.current > 64 && y > 90) setHidden(true);
      else if (scrollAcc.current < -48 || y < 90) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = navLinksRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;
    const active = container.querySelector<HTMLElement>(".nav-link.active");
    if (!active) { indicator.style.opacity = "0"; return; }
    const cr = container.getBoundingClientRect();
    const lr = active.getBoundingClientRect();
    if (firstRender.current) {
      indicator.style.transition = "none";
      firstRender.current = false;
    } else {
      indicator.style.transition = "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), width 0.3s cubic-bezier(0.25,0.46,0.45,0.94)";
    }
    indicator.style.opacity = "1";
    indicator.style.width = `${lr.width}px`;
    indicator.style.transform = `translateX(${lr.left - cr.left}px)`;
  }, [pathname]);

  const handleThemeToggle = () => {
    const btn = themeToggleRef.current;
    const rect = btn?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);
    const d = document as any;
    if (d.startViewTransition) {
      d.startViewTransition(() => toggleTheme());
    } else {
      toggleTheme();
    }
  };

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const moveIndicatorTo = (target: HTMLElement) => {
    const container = navLinksRef.current;
    const hover = hoverIndicatorRef.current;
    if (!container || !hover) return;
    const cr = container.getBoundingClientRect();
    const lr = target.getBoundingClientRect();
    hover.style.transition = "transform 0.2s cubic-bezier(0.25,0.46,0.45,0.94), width 0.2s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.15s";
    hover.style.opacity = "1";
    hover.style.width = `${lr.width}px`;
    hover.style.transform = `translateX(${lr.left - cr.left}px)`;
  };

  const resetIndicatorToActive = () => {
    const hover = hoverIndicatorRef.current;
    if (!hover) return;
    hover.style.transition = "opacity 0.15s";
    hover.style.opacity = "0";
  };

  return (
    <>
      <nav className={`nav${scrolled ? " nav--scrolled" : " nav--float"}${hidden ? " nav--hidden" : ""}`} style={{ backdropFilter: "blur(20px)" }}>
        <div className="nav-inner">
          {/* Mobile: sits in grid col-1 (left). Desktop: hidden via CSS. */}
          <button
            className={`mobile-hamburger${mobileMenuOpen ? " open" : ""}`}
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
          <Logo />
          <div className="nav-links" ref={navLinksRef} onMouseLeave={resetIndicatorToActive}>
            <div className="nav-link-indicator" ref={indicatorRef} />
            <div className="nav-link-hover-indicator" ref={hoverIndicatorRef} />
            <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}>
              Home
            </Link>
            <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`} onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}>
              About
            </Link>
            <Link href="/services" className={`nav-link ${isActive("/services") ? "active" : ""}`} onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}>
              Services
            </Link>
            <Link href="/careers" className={`nav-link ${isActive("/careers") ? "active" : ""}`} onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}>
              Careers
            </Link>
            <Link href="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`} onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}>
              Contact
            </Link>
          </div>
          <div className="nav-cta">
            <button ref={themeToggleRef} className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme">
              <span className="theme-icon theme-icon--sun"><Icon.Sun /></span>
              <span className="theme-icon theme-icon--moon"><Icon.Moon /></span>
            </button>
            <a
              href="https://uftech.in/jobs"
              className="jobs-btn"
              target="_blank"
              rel="noreferrer"
            >
              Jobs <Icon.Arrow size={12} />
            </a>
            <button className="explore-btn" onClick={() => setOverlayOpen(true)}>
              <span>Explore</span>
              <Icon.Plus />
            </button>
          </div>
        </div>
        <div className={`mobile-nav-menu${mobileMenuOpen ? " open" : ""}`}>
          <div className="mobile-nav-links">
            <Link href="/" className={isActive("/") ? "active" : ""} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className={isActive("/about") ? "active" : ""} onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/services" className={isActive("/services") ? "active" : ""} onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/careers" className={isActive("/careers") ? "active" : ""} onClick={() => setMobileMenuOpen(false)}>Careers</Link>
            <Link href="/contact" className={isActive("/contact") ? "active" : ""} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <a href="https://uftech.in/jobs" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>Jobs ↗</a>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}
      <NavOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  );
}
