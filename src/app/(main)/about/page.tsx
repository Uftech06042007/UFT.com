import type { Metadata } from "next";
import Image from "next/image";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";
import { DynamicYears } from "@/components/dynamic-years";
import { StickyExpand } from "@/components/sticky-expand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about UnitForce Technologies — our story, leadership, and values since 2003.",
};

export default function AboutPage() {
  return (
    <main className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">[ About UFT ]</span>
          <h1 className="page-title">
            Inspired Innovations <span className="serif-italic">since 2003.</span>
          </h1>
        </div>
      </section>

      {/* Story + values */}
      <section className="section" style={{ padding: 0 }}>
        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />
        <div style={{ background: "var(--bg-card)", padding: "88px 0", boxShadow: "0 -12px 32px rgba(0,0,0,0.07), 0 12px 32px rgba(0,0,0,0.07)" }}>
          <div className="container">
            <div className="about-grid">
              <div>
                <span className="eyebrow">[ Our story ]</span>
                <div className="about-prose" style={{ marginTop: 24 }}>
                  <p>
                    Established in 2003, UnitForce Technologies is a prominent technology company
                    offering software, engineering, and talent acquisition services to enterprises of
                    various scales. With our international headquarters in Bengaluru, we have{" "}
                    {UFT_DATA.employees} global employees across India, USA, and UAE.
                  </p>
                  <p>
                    We operate as five interconnected practices —{" "}
                    <em>AI, engineering, talent, software, and manufacturing</em> — and are recognized
                    for our array of new product design and AI-enhanced analytic tools, helping firms
                    enhance productivity, process, and data-based decision-making.
                  </p>
                  <p>
                    With over 4.5 million man-hours delivered across onsite and offshore engagements,
                    and an average client relationship spanning{" "}
                    <DynamicYears type="client_years" suffix="+" /> years — we are a proven, trusted
                    partner. ISO 9001:2015 certified.
                  </p>
                </div>
              </div>
              <div className="about-stats" style={{ marginTop: 36 }}>
                {UFT_DATA.stats.map((s) => (
                  <div key={s.label} className="bignum">
                    <div className="bignum-v">
                      {s.dynamicKey ? <DynamicYears type={s.dynamicKey} /> : s.kpi}
                    </div>
                    <div className="bignum-l mono">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="values-grid">
              {UFT_DATA.whyUs
                .map((v, i) => ({ ...v, n: String(i + 1).padStart(2, "0") }))
                .map((v) => (
                  <div key={v.n} className="value-card">
                    <span className="mono dim sect-num" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)" }}>
                      [ {v.n} ]
                    </span>
                    <h4
                      style={{ fontSize: 22, marginTop: 16, marginBottom: 10, fontWeight: 700 }}
                      className="serif"
                    >
                      {v.t}
                    </h4>
                    <p className="muted" style={{ fontSize: 14 }}>
                      {v.d}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />
      </section>

      <StickyExpand sectionId="leadership-section" cardsId="leadership-cards" spacerVh={320} holdVh={100} enableBacklight />

      {/* Leadership */}
      <section className="section" id="leadership-section">
        <div className="container">
          <div className="section-header" style={{ width: "100%" }}>
            <span className="eyebrow">[ Leadership ]</span>
            <h2 className="section-title">
              The people <span className="serif-italic">running the work.</span>
            </h2>
          </div>
          <div id="leadership-cards" style={{ display: "flex", gap: 24, marginTop: 20, willChange: "transform" }}>
            {UFT_DATA.team.map((p, i) => (
              <div key={i} style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", boxShadow: "0 12px 40px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden", display: "flex", flexDirection: "row", alignItems: "center", width: 640, flexShrink: 0, padding: "36px 32px 36px 28px", gap: 28 }}>
                {/* Polaroid */}
                <div style={{ flexShrink: 0, background: "var(--bg-elev)", padding: "2px 2px 0", boxShadow: "0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)", borderRadius: 0, display: "flex", flexDirection: "column" }}>
                  <div style={{ width: 260, height: 260, overflow: "hidden" }}>
                    {p.photo.startsWith("[") ? (
                      <div style={{ width: "100%", height: "100%", background: "#e8e8e4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.08em" }}>[ photo ]</span>
                      </div>
                    ) : (
                      <Image
                        src={p.photo}
                        alt={p.name}
                        width={380}
                        height={380}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: p.photoPosition ?? "top", display: "block", transform: p.photoScale ? `scale(${p.photoScale})` : undefined, transformOrigin: p.photoPosition ?? "top" }}
                      />
                    )}
                  </div>
                  <div style={{ height: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2, letterSpacing: "0.02em" }}>{p.name}</h3>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>{p.role}</div>
                  </div>
                </div>
                {/* Bio */}
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignSelf: "stretch" }}>
                  <p className="muted" style={{ fontSize: 13, lineHeight: 1.75 }}>{p.bio}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                    {p.socials.linkedin && (
                      <a href={p.socials.linkedin} className="social-btn" target="_blank" rel="noreferrer"><Icon.LinkedIn /></a>
                    )}
                    {p.socials.twitter && (
                      <a href={p.socials.twitter} className="social-btn" target="_blank" rel="noreferrer"><Icon.Twitter /></a>
                    )}
                    {p.socials.facebook && (
                      <a href={p.socials.facebook} className="social-btn" target="_blank" rel="noreferrer"><Icon.Facebook /></a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div style={{ height: "420vh" }} />
    </main>
  );
}
