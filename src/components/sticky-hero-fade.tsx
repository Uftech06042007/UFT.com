"use client";
import { useEffect } from "react";

export function StickyHeroFade() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".sticky-hero .page-hero");
    const firstSection = document.querySelector<HTMLElement>(".sticky-hero .section");
    if (!hero || !firstSection) return;

    const container = hero.querySelector<HTMLElement>(".container");
    if (!container) return;

    let ticking = false;

    const update = () => {
      const cardTop = firstSection.getBoundingClientRect().top;
      const lastChild = container.lastElementChild as HTMLElement | null;
      const textBottom = lastChild
        ? lastChild.getBoundingClientRect().bottom
        : hero.getBoundingClientRect().bottom;

      const overlap = textBottom - cardTop;

      if (overlap <= 0) {
        container.style.opacity = "1";
      } else {
        const fadeRange = hero.getBoundingClientRect().height * 0.65;
        container.style.opacity = String(Math.max(0, 1 - overlap / fadeRange));
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
