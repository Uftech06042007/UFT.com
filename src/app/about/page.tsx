import type { Metadata } from "next";
import Image from "next/image";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";

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
            Inspired innovations <span className="serif-italic">since 2003.</span>
          </h1>
        </div>
      </section>

      {/* Story + values */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="eyebrow">Our story</span>
            </div>
            <div className="about-prose">
              <p>
                Established in 2003, UnitForce Technologies is a prominent technology company
                offering software, engineering, and talent acquisition services to enterprises of
                various scales. With our international headquarters in Bengaluru, we have{" "}
                {UFT_DATA.employees} global employees across India, USA, and UAE.
              </p>
              <p>
                We operate as five interconnected practices —{" "}
                <em>software, engineering, talent, manufacturing, and AI</em> — and are recognized
                for our array of new product design and AI-enhanced analytic tools, helping firms
                enhance productivity, process, and data-based decision-making.
              </p>
              <p>
                With over 3.74 million man-hours delivered across onsite and offshore engagements,
                and an average client relationship spanning 20+ years — we are a proven, trusted
                partner. ISO 9001:2015 certified.
              </p>
            </div>
          </div>

          <div className="values-grid">
            {UFT_DATA.whyUs
              .map((v, i) => ({ ...v, n: String(i + 1).padStart(2, "0") }))
              .map((v) => (
                <div key={v.n} className="value-card">
                  <span className="mono dim" style={{ fontSize: 11, letterSpacing: "0.12em" }}>
                    [ {v.n} ]
                  </span>
                  <h4
                    style={{ fontSize: 22, marginTop: 16, marginBottom: 10 }}
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
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">[ Leadership ]</span>
            <h2 className="section-title">
              The people <span className="serif-italic">running the work.</span>
            </h2>
          </div>
          <div
            className="team-grid"
            style={{
              gridTemplateColumns: `repeat(${UFT_DATA.team.length}, 1fr)`,
              maxWidth: UFT_DATA.team.length <= 2 ? 700 : undefined,
            }}
          >
            {UFT_DATA.team.map((p) => (
              <div key={p.name} className="team-card">
                <div
                  className="team-photo"
                  style={{
                    aspectRatio: "4/5",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Image
                    src={p.photo}
                    alt={p.name}
                    width={400}
                    height={500}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <div style={{ padding: "24px 4px 4px" }}>
                  <h3 style={{ fontSize: 20, marginBottom: 4 }}>{p.name}</h3>
                  <div
                    className="mono dim"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 14,
                    }}
                  >
                    {p.role}
                  </div>
                  <p className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
                    {p.bio}
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    {p.socials.linkedin && (
                      <a href={p.socials.linkedin} className="social-btn">
                        <Icon.LinkedIn />
                      </a>
                    )}
                    {p.socials.twitter && (
                      <a href={p.socials.twitter} className="social-btn">
                        <Icon.Twitter />
                      </a>
                    )}
                    {p.socials.facebook && (
                      <a href={p.socials.facebook} className="social-btn">
                        <Icon.Facebook />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">[ By the numbers ]</span>
            <h2 className="section-title">
              Where we are, <span className="serif-italic">how big we are.</span>
            </h2>
          </div>
          <div className="bignum-grid">
            {UFT_DATA.stats.map((s) => (
              <div key={s.label} className="bignum">
                <div className="bignum-v">{s.kpi}</div>
                <div className="bignum-l mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
