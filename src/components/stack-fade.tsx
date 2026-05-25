"use client";
import { useEffect } from "react";

interface Props {
  container: string;
  card: string;
}

export function StackFade({ container, card }: Props) {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(`${container} ${card}`)
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
  }, [container, card]);

  return null;
}
