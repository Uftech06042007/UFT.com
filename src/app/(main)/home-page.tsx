"use client";

// Module-level: resets on F5 (new JS module load), persists across SPA navigation
let svcReloadHandled = false;
import { ClientCarousel } from "@/components/client-carousel";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";
import { DynamicYears } from "@/components/dynamic-years";
import { HomeStackFade } from "@/components/home-stack-fade";
import { useTheme } from "@/hooks/use-theme";


function MarqueeRow({
  items,
  reverse,
}: {
  items: { name: string; logo: string }[];
  reverse?: boolean;
}) {
  return (
    <div
      className="marquee-track"
      style={{ animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[...items, ...items, ...items].map((c, i) => (
        <div key={i} className="client-cell">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.logo}
            alt={c.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling as HTMLElement;
              if (fb) fb.style.display = "block";
            }}
          />
          <span className="client-cell-name" style={{ display: "none" }}>{c.name}</span>
        </div>
      ))}
    </div>
  );
}

function DotArrow() {
  return (
    <svg className="dot-arrow" width="30" height="28" viewBox="0 0 30 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle className="da da-1" cx="2"  cy="14" r="1.6"/>
      <circle className="da da-2" cx="7"  cy="14" r="1.6"/>
      <circle className="da da-3" cx="12" cy="14" r="1.6"/>
      <circle className="da da-3" cx="12" cy="5"  r="1.6"/>
      <circle className="da da-3" cx="12" cy="23" r="1.6"/>
      <circle className="da da-4" cx="17" cy="9"  r="1.6"/>
      <circle className="da da-4" cx="17" cy="19" r="1.6"/>
      <circle className="da da-5" cx="22" cy="12" r="1.6"/>
      <circle className="da da-5" cx="22" cy="16" r="1.6"/>
      <circle className="da da-6" cx="27" cy="14" r="1.6"/>
    </svg>
  );
}

const STEPS = [
  { n: "01", t: "Brief & Scope",      d: "Two-week discovery with a senior lead. Fixed deliverables, not vague intentions." },
  { n: "02", t: "Stand Up the Squad", d: "Engineers placed in 2–4 weeks. Vetted, ready to commit code on day one." },
  { n: "03", t: "Deliver in the Open",d: "Weekly demos, public backlog, real burndown. You see what we see." },
  { n: "04", t: "Scale or Hand-Off",  d: "Grow the team, transfer to your in-house engineers, or wind down cleanly." },
];

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  talent: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  software: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  engineering: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  manufacturing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <path d="M15 2v2M9 2v2M2 9h2M2 15h2M22 9h-2M22 15h-2M15 22v-2M9 22v-2"/>
    </svg>
  ),
};

export default function HomePage() {
  const [theme] = useTheme();
  const [activeService, setActiveService] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [clickedService, setClickedService] = useState<number | null>(null);


  useEffect(() => {
    if (!svcReloadHandled) {
      svcReloadHandled = true;
      const isReload = performance
        .getEntriesByType("navigation")
        .some((n) => (n as PerformanceNavigationTiming).type === "reload");
      if (isReload) sessionStorage.removeItem("uft-clicked-service");
    }
    const v = sessionStorage.getItem("uft-clicked-service");
    if (v !== null) setClickedService(Number(v));
  }, []);

  const handleServiceClick = (idx: number) => {
    setClickedService(idx);
    sessionStorage.setItem("uft-clicked-service", String(idx));
  };

  // Fade hero bg + fixed title only when services-section is near the top
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("services-section");
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const vh  = window.innerHeight;
      // start fading when services-section top is at 25% of viewport
      // fully faded when it reaches -20% (scrolled 20% past the top)
      const fadeStart = vh * 0.25;
      const fadeEnd   = vh * -0.20;
      const progress  = Math.max(0, Math.min(1, (fadeStart - top) / (fadeStart - fadeEnd)));
      document.documentElement.style.setProperty("--hero-fade", String(1 - progress));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      {/* HERO — scroll 1 */}
      {/* HERO background — sticky, stays behind everything */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="hero-title-sticky" style={{ position: "fixed", top: "80px", left: 0, right: 0, zIndex: 0, pointerEvents: "none" }}>
          <div className="hero-top" style={{ pointerEvents: "auto" }}>
            <h1 className="hero-title">
              Inspired Innovations
              <br />
              <span className="serif-italic">for the industries</span>
              <br />
              <span className="serif-italic">that build the world.</span>
            </h1>
            <div className="hero-kpis">
              {UFT_DATA.stats.map((s) => (
                <div key={s.label} className="hero-kpi">
                  <div className="hero-kpi-val">
                    {s.dynamicKey ? <DynamicYears type={s.dynamicKey} /> : s.kpi}
                  </div>
                  <div className="hero-kpi-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* HERO CARD — scrolls over the sticky hero background */}
      <div className="hero-card-wrap">
        <div className="container">
          <div className="hero-meta">
            <p className="hero-sub">
              We develop scalable pipeline software, integrate AI-driven services, place specialized engineers, and modernize manufacturing for the
              industries that move the world — from Automotive to Aerospace, BFSI to Oil &amp; Gas, Pharmacy to FMCG.
            </p>
            <div className="hero-actions">
              <Link href="/services" className="btn btn-primary">
                Our services <Icon.Arrow />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CLIENTS CAROUSEL — scroll 2 */}
      <section className="section clients-blur-section" style={{ backdropFilter: theme === "dark" ? "blur(6px)" : "blur(20px)", WebkitBackdropFilter: theme === "dark" ? "blur(6px)" : "blur(20px)" }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 24, textAlign: "center" }}>
          <span className="eyebrow" style={{ fontWeight: 600, color: "var(--fg)", fontSize: "clamp(11px, 1vw, 13px)", letterSpacing: "0.10em" }}>Trusted by global enterprises</span>
        </div>
        <ClientCarousel items={UFT_DATA.clients} />
      </section>

      {/* STACKED SECTIONS — scroll 3-6 */}
      <HomeStackFade />
      <div className="home-stack">

      {/* SERVICES — scroll 3 */}
      <section className="section home-stack-card" id="services-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="eyebrow">[ Services ]</span>
              <h2 className="section-title">
                What we do,{" "}
                <span className="serif-italic">end to end.</span>
              </h2>
            </div>
            <p className="section-sub-inline">
              From AI to Engineering Services — every UFT service is built around
              delivering real outcomes for the industries we serve.
            </p>
          </div>

          <div className="industries-strip">
            <div className="industries-rows">
              {UFT_DATA.services.map((svc, idx) => (
                <Link
                  key={svc.id}
                  href={`/services#${svc.id}`}
                  className={`industry-row ${activeService === idx ? "active" : ""} ${clickedService === idx ? "industry-row--clicked" : ""}`}
                  onMouseEnter={() => setActiveService(idx)}
                  onClick={() => handleServiceClick(idx)}
                >
                  <span className="industry-row-num" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {SERVICE_ICONS[svc.id] ?? null}
                  </span>
                  <span className="industry-row-name">
                    {svc.id === "talent" ? (<>Talent<br />Acquisition</>) :
                     svc.id === "software" ? (<>Software<br />Services</>) :
                     svc.title}
                  </span>
                  <span className="industry-row-blurb">{svc.tagline}</span>
                </Link>
              ))}
            </div>
            <div className="industry-visual">
              <div style={{
                background: "var(--bg-card)",
                borderRadius: "16px",
                padding: "12px 12px 24px",
                boxShadow: "0 12px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)",
                width: "100%",
                aspectRatio: "5/6",
                overflow: "hidden",
              }}>
                {UFT_DATA.services[activeService].image ? (
                  <Link href={`/services#${UFT_DATA.services[activeService].id}`}>
                  <img
                    src={UFT_DATA.services[activeService].image}
                    alt={UFT_DATA.services[activeService].title}
                    fetchPriority="low"
                    style={{
                      width: "100%",
                      aspectRatio: "4/3",
                      objectFit: "cover",
                      borderRadius: "8px",
                      display: "block",
                      cursor: "pointer",
                    }}
                  />
                  </Link>
                ) : (
                  <div className="ph" style={{ aspectRatio: "4/3", borderRadius: "8px" }}>
                    <span className="ph-label">
                      {UFT_DATA.services[activeService].title.toUpperCase()}
                    </span>
                  </div>
                )}
                <div style={{ padding: "20px 8px 0" }}>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--fg-muted)", marginBottom: 16 }}>
                    {UFT_DATA.services[activeService].desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {(() => {
                      const caps = [...UFT_DATA.services[activeService].capabilities].sort((a, b) => b.length - a.length);
                      const interleaved: string[] = [];
                      let lo = 0, hi = caps.length - 1;
                      while (lo <= hi) {
                        interleaved.push(caps[lo++]);
                        if (lo <= hi) interleaved.push(caps[hi--]);
                      }
                      return interleaved;
                    })().map((cap) => (
                      <span key={cap} style={{
                        padding: "4px 10px",
                        borderRadius: 100,
                        border: "1px solid var(--border)",
                        fontSize: 11,
                        color: "var(--fg-muted)",
                        lineHeight: 1.5,
                        whiteSpace: "nowrap",
                      }}>
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES — scroll 4 */}
      <section className="section home-stack-card" id="industries-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="eyebrow">[ Industries ]</span>
              <h2 className="section-title">
                Domain depth,{" "}
                <span className="serif-italic">across regulated sectors.</span>
              </h2>
            </div>
            <p className="section-sub-inline">
              We hire and train for the industries we serve — so our engineers speak the standards,
              the systems, and the safety frameworks.
            </p>
          </div>

          <div className="industries-strip">
            <div className="industries-rows">
              {UFT_DATA.industries.map((ind, idx) => (
                <button
                  key={ind.id}
                  className={`industry-row ${activeIndustry === idx ? "active" : ""}`}
                  onMouseEnter={() => setActiveIndustry(idx)}
                  onClick={() => setActiveIndustry(idx)}
                >
                  <span className="industry-row-num mono">
                    [{String(idx + 1).padStart(2, "0")}]
                  </span>
                  <span className="industry-row-name">{ind.name}</span>
                  <span className="industry-row-blurb">{ind.blurb}</span>
                </button>
              ))}
            </div>
            <div className="industry-visual">
              {UFT_DATA.industries[activeIndustry].image ? (
                <img
                  src={UFT_DATA.industries[activeIndustry].image}
                  alt={UFT_DATA.industries[activeIndustry].name}
                  fetchPriority="low"
                  style={{
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "cover",
                    borderRadius: "var(--radius-lg)",
                    display: "block",
                  }}
                />
              ) : (
                <div className="ph" style={{ aspectRatio: "4/5" }}>
                  <span className="ph-label">
                    {UFT_DATA.industries[activeIndustry].name.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH — scroll 5 */}
      <section className="section approach-section home-stack-card" id="approach-section">
        <div className="container">
          <div className="approach-grid">
            <div>
              <span className="eyebrow">[ How we work ]</span>
              <h2 className="section-title" style={{ marginTop: 16 }}>
                We deliver engineers,{" "}
                <span className="serif-italic">not decks.</span>
              </h2>
              <p className="muted" style={{ fontSize: 16, marginTop: 24, maxWidth: 460 }}>
                Every UFT engagement runs on the same model: a senior delivery lead, a transparent
                backlog, and a team that sits with yours. We price to your commercial model — scope-defined, time-and-materials, or fully outcome-based.
              </p>
            </div>
            <div className="approach-steps">
              {STEPS.map((step) => (
                <div key={step.n} className="approach-step">
                  <span className="approach-n mono">{step.n}</span>
                  <div>
                    <h4 style={{ fontSize: 17, marginBottom: 6 }}>{step.t}</h4>
                    <p className="muted" style={{ fontSize: 14 }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — scroll 6 */}
      <section className="cta-section home-stack-card">
        <div className="container">
          <div className="cta-card">
            <span className="eyebrow">[ Next ]</span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1,
                margin: "20px 0 24px",
                letterSpacing: "-0.02em",
              }}
            >
              Have a brief?{" "}
              <span className="serif-italic">Let&apos;s read it.</span>
            </h2>
            <p className="muted" style={{ fontSize: 17, maxWidth: 520, marginBottom: 32 }}>
              Tell us about the system you&apos;re modernizing, the team you&apos;re scaling, or
              the problem you can&apos;t solve. A senior partner replies within one business day.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary">
                Start a conversation <Icon.Arrow />
              </Link>
              <Link href="/careers" className="btn btn-ghost">
                Or join us — we&apos;re hiring
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>{/* end .home-stack */}
    </main>
  );
}
