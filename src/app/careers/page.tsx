import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build the things that build everything else. Join UFT.",
};

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
            <Link href="https://uftech.in/jobs" className="btn btn-primary">
              Find your next role <Icon.Arrow />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Talk to a recruiter
            </Link>
          </div>
        </div>
      </section>

      {/* Life at UFT — photo collage */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Life at UFT</span>
          <h2
            className="section-title"
            style={{ marginTop: 12, marginBottom: 40, fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            Senior people,{" "}
            <span className="serif-italic">flat structure, real ownership.</span>
          </h2>
        </div>
        <div className="container">
          <div className="lau-collage">
            <div className="lau-a"><img src="/assets/lau1.jpg"  alt="UFT office entrance" /></div>
            <div className="lau-b"><img src="/assets/lau5.jpg"  alt="UFT meeting room" /></div>
            <div className="lau-c"><img src="/assets/lau10.jpg" alt="UFT team" /></div>
            <div className="lau-d"><img src="/assets/lau11.jpg" alt="UFT team" /></div>
            <div className="lau-e"><img src="/assets/lau7.jpg"  alt="UFT all-hands" /></div>
            <div className="lau-f"><img src="/assets/lau12.jpg" alt="UFT team" /></div>
            <div className="lau-g"><img src="/assets/lau8.jpg"  alt="UFT workspace" /></div>
            <div className="lau-h"><img src="/assets/lau13.jpg" alt="UFT team event" /></div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section testimonial-section">
        <div className="container">
          <div className="testimonial-header">
            <span className="eyebrow">Client Success Stories</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Client Testimonials
            </h2>
            <p className="muted" style={{ marginTop: 8, fontSize: 15 }}>
              Insights into Our Excellence and Dedication
            </p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">&ldquo;</div>
              <p className="testimonial-body">
                My relationship with UFT is almost for 5 years now and they have been a very key
                vendor to Mphasis in terms of providing Staff Augmentation Services and Secondment
                Model Payroll services across various Geographies. UFT is very supportive and highly
                professional in their approach in fulfilling our requirements. They go an extra mile
                in supporting their clients like us and have executed many projects for us without a
                single issue. It is pleasure working with UFT and looking for many more projects to
                work with them.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-info">
                  <span className="testimonial-name">Naresh V K</span>
                  <span className="testimonial-company mono">Mphasis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
