"use client";
import { useEffect } from "react";

export function HomeStackFade() {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".home-stack .home-stack-card")
    );
    if (!cards.length) return;

    const initCards = () => {
      const vh = window.innerHeight;
      cards.forEach((c, i) => {
        const h = c.offsetHeight;
        c.style.position = "sticky";
        c.style.top = `${vh * 0.5 - h}px`;
        c.style.zIndex = String(i + 1);
      });
    };

    let ticking = false;

    const update = () => {
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) { c.style.opacity = "1"; return; }

        const cRect = c.getBoundingClientRect();
        const nRect = next.getBoundingClientRect();
        const overlap = cRect.bottom - nRect.top;

        c.style.opacity = overlap <= 0
          ? "1"
          : String(Math.max(0, 1 - overlap / cRect.height));
      });

      // Mark the frontmost visible card as section-in-view.
      // The active card = the highest-index card that has entered its sticky
      // position (rect.top ≈ stickyTop) and still has opacity > 0.
      let topCard: HTMLElement | null = null;
      cards.forEach((card) => {
        const opacity = parseFloat(card.style.opacity || "1");
        const stickyTop = parseFloat(card.style.top || "0");
        const rect = card.getBoundingClientRect();
        if (rect.top <= stickyTop + 24 && opacity > 0) {
          topCard = card;
        }
      });
      cards.forEach((card) => {
        card.classList.toggle("section-in-view", card === topCard);
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
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
