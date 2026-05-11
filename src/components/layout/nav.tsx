"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";
import { useTheme } from "@/hooks/use-theme";

function Logo() {
  return (
    <Link href="/" className="nav-logo">
      <Image
        src="/assets/uft-logo.png"
        alt="UFT — Inspired Innovations"
        className="nav-logo-img"
        width={120}
        height={36}
        priority
        style={{ width: "auto", height: 36 }}
      />
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
    <div className={`nav-overlay ${open ? "open" : ""}`} onClick={onClose}>
      <div className="nav-overlay-panel" onClick={(e) => e.stopPropagation()}>
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
                  <Link href="/#services-section" onClick={onClose}>
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
                  <Link href="/#industries-section" onClick={onClose}>
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
                <Link href="/jobs" onClick={onClose}>
                  <span>Open roles</span>
                  <Icon.ArrowUR />
                </Link>
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
              <a href="mailto:info@uftech.in" className="overlay-cta-line">
                info@uftech.in
              </a>
              <a href="tel:+918951390893" className="overlay-cta-line">
                +91 8951 390 893
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const [theme, toggleTheme] = useTheme();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Logo />
          <div className="nav-links">
            <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>
            <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
              About
            </Link>
            <Link href="/careers" className={`nav-link ${isActive("/careers") ? "active" : ""}`}>
              Careers
            </Link>
            <Link href="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
              Contact
            </Link>
          </div>
          <div className="nav-cta">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}
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
