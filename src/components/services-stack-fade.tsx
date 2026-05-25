"use client";
import { useEffect } from "react";

export function ServicesStackFade() {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".services-stack .service-card")
    );
    if (!cards.length) return;

    const initCards = () => {
      const vh = window.innerHeight;
      cards.forEach((card, i) => {
        const h = card.offsetHeight;
        card.style.position = "sticky";
        card.style.top = `${vh * 0.5 - h}px`;
        card.style.zIndex = String(i + 1);
      });
    };

    let ticking = false;

    const update = () => {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) {
          card.style.opacity = "1";
          return;
        }
        const cardRect = card.getBoundingClientRect();
        const nextRect = next.getBoundingClientRect();
        const overlap = cardRect.bottom - nextRect.top;
        card.style.opacity = overlap <= 0
          ? "1"
          : String(Math.max(0, 1 - overlap / cardRect.height));
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    initCards();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", initCards);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", initCards);
      cards.forEach((c) => {
        c.style.position = "";
        c.style.top = "";
        c.style.zIndex = "";
        c.style.opacity = "";
      });
    };
  }, []);

  return null;
}
