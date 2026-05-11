import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build the things that build everything else. Join UFT.",
};

const PERKS = [
  ["Learning budget", "₹2L / engineer for conferences, certifications, books."],
  ["Remote-first, office-anywhere", "Four hubs to drop into. Work from any of them."],
  ["Sabbatical at year 5", "Six paid weeks. No questions asked."],
  ["Equity in the practice", "Senior staff hold equity in their delivery group."],
] as const;

export default function CareersPage() {
  return (
    <main className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">[ Careers · Culture ]</span>
          <h1 className="page-title">
            Build the things that{" "}
            <span className="serif-italic">build everything else.</span>
          </h1>
          <p className="page-sub">
            We hire engineers, recruiters, and operators who&apos;d rather ship hard problems for
            serious industries than chase the next shiny thing. If that&apos;s you — read on.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Link href="/jobs" className="btn btn-primary">
              Find your next role <Icon.Arrow />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Talk to a recruiter
            </Link>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section">
        <div className="container">
          <div className="culture-grid">
            <div className="ph" style={{ aspectRatio: "4/5" }}>
              <span className="ph-label">TEAM PHOTO 01</span>
            </div>
            <div className="culture-content">
              <span className="eyebrow">Life at UFT</span>
              <h2
                className="section-title"
                style={{ marginTop: 16, fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                Senior people,{" "}
                <span className="serif-italic">flat structure, real ownership.</span>
              </h2>
              <p className="muted" style={{ marginTop: 20, fontSize: 16 }}>
                The average UFT engineer has 9+ years in their domain. We don&apos;t run pyramid
                staffing — every project is led by people who could do the work themselves.
              </p>
              <div className="perks-list">
                {PERKS.map(([t, d]) => (
                  <div key={t} className="perk">
                    <div className="perk-dot"></div>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 2 }}>{t}</div>
                      <div className="muted" style={{ fontSize: 13 }}>
                        {d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 36 }}>
                <Link href="/jobs" className="btn btn-primary">
                  Browse open jobs <Icon.Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs CTA band */}
      <section className="jobs-cta-band">
        <div className="container">
          <div className="jobs-cta">
            <div>
              <span className="eyebrow">[ Job portal ]</span>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  marginTop: 16,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                Find your next role <span className="serif-italic">with UFT.</span>
              </h2>
              <p className="muted" style={{ marginTop: 16, fontSize: 16, maxWidth: 460 }}>
                Filter by job type, location, department, experience, and salary. Apply directly —
                no third-party portals.
              </p>
            </div>
            <Link href="/jobs" className="btn btn-primary jobs-cta-btn">
              Browse jobs <Icon.Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
