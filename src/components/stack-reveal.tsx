"use client";
import { useEffect } from "react";

/**
 * Stacks the sticky "over" card on top of the "under" card the same way the
 * site's other stacked cards behave: the under card parks with its bottom at
 * mid-screen (top = 50vh - height), then fades out as the over card slides up
 * and overlaps it. We only touch the under card's position/opacity — the over
 * card keeps its own sticky positioning (the leadership card runs StickyExpand,
 * so its top/transform must be left alone). Runs on mobile + desktop.
 */
export function StackReveal({ underId, overId }: { underId: string; overId: string }) {
  useEffect(() => {
    const under = document.getElementById(underId);
    const over = document.getElementById(overId);
    if (!under || !over) return;

    // Park the under card with its bottom at mid-screen (matches StackFade).
    const init = () => {
      under.style.position = "sticky";
      under.style.top = `${window.innerHeight * 0.5 - under.offsetHeight}px`;
    };

    let ticking = false;
    const update = () => {
      const uRect = under.getBoundingClientRect();
      const oRect = over.getBoundingClientRect();
      const overlap = uRect.bottom - oRect.top;
      const opacity = overlap <= 0 ? 1 : Math.max(0, 1 - overlap / uRect.height);
      under.style.opacity = String(opacity);
      // Once faded out it's still parked underneath — stop it eating clicks.
      under.style.pointerEvents = opacity < 0.05 ? "none" : "";
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };
    const onResize = () => { init(); update(); };

    init();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      under.style.position = "";
      under.style.top = "";
      under.style.opacity = "";
      under.style.pointerEvents = "";
    };
  }, [underId, overId]);

  return null;
}
