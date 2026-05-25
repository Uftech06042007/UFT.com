"use client";
import { useEffect } from "react";

// Adds/removes the `section-in-view` CSS class on sections as they scroll into
// the visible viewport area. Home-page sticky-stack cards are excluded here
// because HomeStackFade manages their class separately based on card opacity.
export function SectionObserver() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "section:not(.home-stack-card), .service-card"
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("section-in-view", entry.isIntersecting);
        });
      },
      { rootMargin: "-5% 0px -5% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
