import type { Metadata } from "next";
import type React from "react";
import { StickyHeroFade } from "@/components/sticky-hero-fade";
import { Icon } from "@/components/icons";
import { JobsList } from "@/components/jobs-list";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build the things that build everything else. Join UFT.",
};

export default function CareersPage() {
  return (
    <main className="page-enter sticky-hero">
      <StickyHeroFade />
      <section className="page-hero" style={{ paddingBottom: 16 }}>
        <div className="container">
          <span className="eyebrow">[ Careers · Culture ]</span>
          <h1 className="page-title">
            Build the things that{" "}
            <span className="serif-italic">build everything else.</span>
          </h1>
          <p className="page-sub">
            We hire relentless problem-solvers across roles like Software and Embedded Engineers,
            SAP Consultants, Talent Recruiters, AI Specialists, Mechanical Engineers, PLM Analysts,
            Operations Managers, Business Analysts, Finance Professionals, and dozens of other
            critical disciplines. If you prefer real impact over hype — read on.
          </p>
        </div>
      </section>

      {/* Open roles — latest jobs from uftech.in/jobs */}
      <section className="section" id="careers-intro-section" style={{ paddingTop: 24 }}>
        <div className="container">
          <span className="eyebrow">[ Open Roles ]</span>
          <h2
            className="section-title"
            style={{ marginTop: 12, marginBottom: 32, fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            Latest openings{" "}
            <span className="serif-italic">at UFT.</span>
          </h2>
          <JobsList />
          <div className="jobs-explore-wrap">
            <a href="https://uftech.in" target="_blank" rel="noreferrer" className="jobs-explore-btn">
              Explore more jobs <Icon.Arrow size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Life at UFT — photo collage */}
      <section className="section" id="lau-section">
        <div className="container">
          <span className="eyebrow">[ Life at UFT ]</span>
          <h2
            className="section-title"
            style={{ marginTop: 12, marginBottom: 40, fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            Senior people,{" "}
            <span className="serif-italic">flat structure, real ownership.</span>
          </h2>
          <div className="lau-collage">
            {([
              { cls: "lau-a", src: "/assets/lau-a.jpg", alt: "UFT office entrance" },
              { cls: "lau-b", src: "/assets/lau-b.jpg", alt: "UFT meeting room" },
              { cls: "lau-c", src: "/assets/lau-c.jpg", alt: "UFT team" },
              { cls: "lau-d", src: "/assets/lau-d.jpg", alt: "UFT team" },
              // Empty slots (mobile only): bottom of left column + top of right column
              { cls: "lau-slot lau-slot-1", slot: true },
              { cls: "lau-slot lau-slot-2", slot: true },
              { cls: "lau-e", src: "/assets/lau-e.jpg", alt: "UFT all-hands" },
              { cls: "lau-f", src: "/assets/lau-f.jpg", alt: "UFT team" },
              { cls: "lau-g", src: "/assets/lau-g-3.jpg", alt: "UFT workspace", imgStyle: { transform: "scale(1.75)", transformOrigin: "35% center" } },
              { cls: "lau-h", src: "/assets/lau-h.jpg", alt: "UFT team event" },
            ] as { cls: string; src?: string; alt?: string; imgStyle?: React.CSSProperties; slot?: boolean }[]).map(({ cls, src, alt, imgStyle, slot }) =>
              slot ? (
                <div key={cls} className={cls} aria-hidden="true" />
              ) : (
                <div key={cls} className={cls} style={{ position: "relative" }}>
                  <img src={src} alt={alt} style={imgStyle} loading="lazy" decoding="async" />
                </div>
              )
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
