"use client";

import Link from "next/link";
import { useState } from "react";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";

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

export default function HomePage() {
  const [activeServiceId, setActiveServiceId] = useState("talent");
  const [activeIndustry, setActiveIndustry] = useState(0);

  const active =
    UFT_DATA.services.find((s) => s.id === activeServiceId) ?? UFT_DATA.services[0];

  return (
    <main className="page-enter">
      {/* HERO — scroll 1 */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">
            <span className="status-dot"></span>
            <span className="mono">UNITFORCE TECHNOLOGIES · BENGALURU · EST. 2003</span>
          </div>
          <h1 className="hero-title">
            Inspired innovations{" "}
            <span className="serif-italic">for the industries that build the world.</span>
          </h1>
          <div className="hero-meta">
            <p className="hero-sub">
              We design software, place specialized engineers, and modernize manufacturing for the
              industries that move the world — from automotive to aerospace, banking to oil &amp; gas.
            </p>
            <div className="hero-actions">
              <Link href="/#services-section" className="btn btn-primary">
                Our services <Icon.Arrow />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Talk to us
              </Link>
            </div>
          </div>
          <div className="hero-stats">
            {UFT_DATA.stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat-kpi">{s.kpi}</div>
                <div className="stat-label mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE — scroll 2 */}
      <section className="clients-section">
        <div className="container">
          <div className="clients-header">
            <span className="eyebrow">Trusted by global enterprises</span>
          </div>
        </div>
        <div className="marquee">
          <MarqueeRow items={UFT_DATA.clients} />
        </div>
      </section>

      {/* SERVICES — scroll 3 */}
      <section className="section" id="services-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="eyebrow">[ 01 ] What we do</span>
              <h2 className="section-title">
                Five practices,{" "}
                <span className="serif-italic">one delivery muscle.</span>
              </h2>
            </div>
            <p className="section-sub-inline">
              From a single embedded engineer to a 200-person modernization program — we operate as
              one integrated services group.
            </p>
          </div>

          <div className="services-explorer">
            <div className="services-list">
              {UFT_DATA.services.map((s, idx) => (
                <button
                  key={s.id}
                  className={`service-tab ${activeServiceId === s.id ? "active" : ""}`}
                  onClick={() => setActiveServiceId(s.id)}
                >
                  <span className="service-num mono">0{idx + 1}</span>
                  <div className="service-tab-body">
                    <div className="service-tab-title">
                      {s.title}
                      {s.flagship && (
                        <span className="flagship-badge mono">FLAGSHIP</span>
                      )}
                    </div>
                    <div className="service-tab-tagline">{s.tagline}</div>
                  </div>
                  <Icon.Arrow size={14} />
                </button>
              ))}
            </div>
            <div className="service-detail">
              {active.image ? (
                <img
                  src={active.image}
                  alt={active.title}
                  style={{
                    width: "100%",
                    aspectRatio: "16/10",
                    objectFit: "cover",
                    borderRadius: "var(--radius-lg)",
                    marginBottom: 24,
                    display: "block",
                  }}
                />
              ) : (
                <div className="ph" style={{ aspectRatio: "16/10", marginBottom: 24 }}>
                  <span className="ph-label">{active.title.toUpperCase()}</span>
                </div>
              )}
              <div
                className="mono dim"
                style={{ fontSize: 11, letterSpacing: "0.12em", marginBottom: 8 }}
              >
                PRACTICE / {active.id.toUpperCase()}
              </div>
              <h3
                className="serif"
                style={{ fontSize: 30, marginBottom: 12, letterSpacing: "-0.01em" }}
              >
                {active.title}
              </h3>
              <p className="muted" style={{ marginBottom: 20, fontSize: 15 }}>
                {active.desc}
              </p>
              <div className="capabilities">
                {active.capabilities.map((c) => (
                  <span key={c} className="capability-pill">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES — scroll 4 */}
      <section className="section" id="industries-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="eyebrow">[ 02 ] Industries</span>
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
                  <Icon.ArrowUR />
                </button>
              ))}
            </div>
            <div className="industry-visual">
              {UFT_DATA.industries[activeIndustry].image ? (
                <img
                  src={UFT_DATA.industries[activeIndustry].image}
                  alt={UFT_DATA.industries[activeIndustry].name}
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
      <section className="section approach-section">
        <div className="container">
          <div className="approach-grid">
            <div>
              <span className="eyebrow">[ 03 ] How we work</span>
              <h2 className="section-title" style={{ marginTop: 16 }}>
                We deliver engineers,{" "}
                <span className="serif-italic">not decks.</span>
              </h2>
              <p className="muted" style={{ fontSize: 16, marginTop: 24, maxWidth: 460 }}>
                Every UFT engagement runs on the same model: a senior delivery lead, a transparent
                backlog, and a team that sits with yours. Pricing is fixed, time-and-materials, or
                outcome-based — your call.
              </p>
            </div>
            <div className="approach-steps">
              {[
                {
                  n: "01",
                  t: "Brief & scope",
                  d: "Two-week discovery with a senior lead. Fixed deliverables, not vague intentions.",
                },
                {
                  n: "02",
                  t: "Stand up the squad",
                  d: "Engineers placed in 2–4 weeks. Vetted, ready to commit code on day one.",
                },
                {
                  n: "03",
                  t: "Deliver in the open",
                  d: "Weekly demos, public backlog, real burndown. You see what we see.",
                },
                {
                  n: "04",
                  t: "Scale or hand-off",
                  d: "Grow the team, transfer to your in-house engineers, or wind down cleanly.",
                },
              ].map((step) => (
                <div key={step.n} className="approach-step">
                  <span className="approach-n mono">{step.n}</span>
                  <div>
                    <h4 style={{ fontSize: 17, marginBottom: 6 }}>{step.t}</h4>
                    <p className="muted" style={{ fontSize: 14 }}>
                      {step.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — scroll 6 */}
      <section className="cta-section">
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
    </main>
  );
}
