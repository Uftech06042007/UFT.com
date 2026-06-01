"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";

export function CareersHero() {
  // Fade fixed title as first stack section reaches mid-screen
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("testimonial-section");
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const vh  = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - top) / (vh * 0.5)));
      document.documentElement.style.setProperty("--careers-fade", String(1 - progress));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed background title */}
      <div
        className="careers-title-fixed"
        style={{ position: "fixed", top: "80px", left: 0, right: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <div className="container" style={{ pointerEvents: "auto" }}>
          <span className="eyebrow">[ Careers · Culture ]</span>
          <h1 className="page-title">
            Build the things that{" "}
            <span className="serif-italic">build everything else.</span>
          </h1>
        </div>
      </div>

      {/* Scrolling card at bottom of hero */}
      <div className="careers-hero-card-wrap">
        <div className="container">
          <div className="hero-meta">
            <p className="hero-sub">
              We hire people who&apos;d rather ship hard problems for serious industries than chase
              the next shiny thing — across roles like Software Engineers, Embedded Engineers,
              SAP Consultants, Talent Recruiters, AI Specialists, Mechanical Engineers, PLM Analysts,
              Operations Managers, Business Analysts, and Finance Professionals.
              If that&apos;s you — read on.
            </p>
            <div className="hero-actions">
              <Link href="https://uftech.in/jobs" className="btn btn-primary">
                Find your next role <Icon.Arrow />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Talk to a recruiter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
