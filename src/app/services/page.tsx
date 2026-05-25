import type { Metadata } from "next";
import { UFT_DATA } from "@/lib/data";
import { StickyHeroFade } from "@/components/sticky-hero-fade";
import { ServicesStackFade } from "@/components/services-stack-fade";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore UFT's full range of services — talent acquisition, engineering, software, manufacturing, and AI.",
};

export default function ServicesPage() {
  return (
    <main className="page-enter sticky-hero">
      <StickyHeroFade />
      <ServicesStackFade />
      <section className="page-hero" style={{ paddingBottom: 16 }}>
        <div className="container">
          <span className="eyebrow">[ Services ]</span>
          <h1 className="page-title">
            What we do,{" "}<br /><span className="serif-italic">end to end.</span>
          </h1>
          <p className="page-sub">
            From core engineering and custom software development to SAP, PLM, and advanced data pipelining, we provide end-to-end IT solutions and specialized talent through flexible global delivery models.
          </p>
        </div>
      </section>

      <section className="section services-cards-section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="services-stack" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {UFT_DATA.services.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className="service-card"
                style={{
                  scrollMarginTop: "96px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 64,
                  alignItems: "center",
                }}
              >
                {/* Text — left */}
                <div>
                  <span className="mono dim sect-num" style={{ fontSize: 11, letterSpacing: "0.14em", color: "oklch(0.72 0.18 145)" }}>
                    [ 0{i + 1} ]
                  </span>
                  <h2 className="serif" style={{ fontSize: 36, marginTop: 16, marginBottom: 8, fontWeight: 700 }}>
                    {s.title}
                  </h2>
                  <p className="muted" style={{ fontSize: 14, marginBottom: 24, fontWeight: 700 }}>
                    {s.tagline}
                  </p>
                  <p style={{ fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>{s.descFull ?? s.desc}</p>
                  <div>
                    <span
                      className="mono dim"
                      style={{ fontSize: 11, letterSpacing: "0.12em", display: "block", marginBottom: 16, color: "var(--accent)" }}
                    >
                      CAPABILITIES
                    </span>
                    <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                      {s.capabilities.map((cap) => (
                        <li
                          key={cap}
                          style={{
                            padding: "6px 14px",
                            borderRadius: 100,
                            border: "1px solid var(--border)",
                            fontSize: 13,
                            color: "var(--fg-muted)",
                          }}
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Image — right */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{
                    background: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                    width: "100%",
                  }}>
                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.title}
                        style={{
                          width: "100%",
                          aspectRatio: "4/3",
                          objectFit: "cover",
                          borderRadius: "6px",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div className="ph" style={{ aspectRatio: "4/3" }}>
                        <span className="ph-label">{s.title.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
