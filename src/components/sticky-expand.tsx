"use client";

import { useEffect, useRef } from "react";

const FIRST_TWO_WIDTH = 560 * 2 + 24;
const CONTAINER_PAD   = 48;
const CARD_GAP        = 24;
const HIDE_BUFFER     = 24;

const EXPAND_AT = 0.05;
const SCROLL_AT = 0.10;

const GREEN_GLOW = "0 0 0 2px oklch(0.72 0.18 145 / 0.6), 0 0 32px oklch(0.72 0.18 145 / 0.55), 0 0 64px oklch(0.72 0.18 145 / 0.3), 0 12px 40px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)";
const BASE_SHADOW = "0 12px 40px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)";

export function StickyExpand({
  sectionId,
  cardsId,
  spacerVh = 200,
  holdVh = 0,
  enableBacklight = false,
}: {
  sectionId: string;
  cardsId: string;
  spacerVh?: number;
  holdVh?: number;
  enableBacklight?: boolean;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const section  = document.getElementById(sectionId);
    const cards    = document.getElementById(cardsId);
    if (!sentinel || !section || !cards) return;

    // Mobile: section is pinned. One source of truth (window.scrollY → transform):
    //   • vertical page scroll drives the cards horizontally
    //   • horizontal finger drag is converted to page scroll (1:1, no momentum)
    // No native horizontal scroll, so no momentum write-back loop / rollback.
    if (window.matchMedia("(max-width: 900px)").matches) {
      const spacer = document.querySelector<HTMLElement>(".leadership-spacer");
      let stickyY = 0, maxTranslate = 0, pinDuration = 1, step = 1, lastIndex = 0;

      const measure = () => {
        stickyY = sentinel.getBoundingClientRect().top + window.scrollY;
        maxTranslate = Math.max(0, cards.scrollWidth - cards.clientWidth);
        pinDuration = maxTranslate * 2.6 || 1; // vertical scroll distance for full horizontal
        const first = cards.children[0] as HTMLElement | undefined;
        step = first ? first.offsetWidth + 16 : cards.clientWidth || 1; // card width + gap
        lastIndex = step ? Math.round(maxTranslate / step) : 0;
        if (spacer) spacer.style.height = `${pinDuration + window.innerHeight * 0.15}px`;
      };

      const apply = () => {
        const progress = Math.max(0, Math.min(1, (window.scrollY - stickyY) / pinDuration));
        cards.style.transform = `translateX(${-progress * maxTranslate}px)`;
      };

      // Custom fast snap animation (native smooth-scroll is too slow / fixed)
      let rafId = 0;
      const animateTo = (targetY: number) => {
        cancelAnimationFrame(rafId);
        const startY = window.scrollY;
        const dist = targetY - startY;
        const dur = 45; // ms — lower = faster snap
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          // easeOutQuint — fast start, very smooth settle
          const eased = 1 - Math.pow(1 - p, 5);
          window.scrollTo(0, startY + dist * eased);
          if (p < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      };

      // Horizontal swipe = discrete pager: one swipe → exactly one card. Fires the
      // instant the swipe crosses a small threshold (no wait for finger-lift).
      const SWIPE_TRIGGER = 24;
      let startX = 0, startY = 0, mode: "h" | "v" | null = null, paged = false;
      const page = (dir: 1 | -1) => {
        const progress = Math.max(0, Math.min(1, (window.scrollY - stickyY) / pinDuration));
        const curIdx = step ? (progress * maxTranslate) / step : 0;
        let target = dir > 0 ? Math.floor(curIdx + 0.001) + 1 : Math.ceil(curIdx - 0.001) - 1;
        target = Math.max(0, Math.min(lastIndex, target));
        const targetTranslate = Math.min(target * step, maxTranslate);
        animateTo(stickyY + (maxTranslate ? targetTranslate / maxTranslate : 0) * pinDuration);
      };
      const onTouchStart = (e: TouchEvent) => {
        cancelAnimationFrame(rafId);
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        mode = null;
        paged = false;
      };
      const onTouchMove = (e: TouchEvent) => {
        const x = e.touches[0].clientX, y = e.touches[0].clientY;
        if (mode === null) {
          const dx = Math.abs(x - startX), dy = Math.abs(y - startY);
          if (dx > 6 || dy > 6) mode = dx > dy ? "h" : "v";
        }
        if (mode === "h") {
          e.preventDefault(); // block page scroll; we page horizontally
          if (!paged && Math.abs(x - startX) > SWIPE_TRIGGER) {
            paged = true;
            page(x < startX ? 1 : -1); // left → next, right → previous
          }
        }
      };
      const onTouchEnd = () => {};

      measure();
      apply();
      window.addEventListener("scroll", apply, { passive: true });
      window.addEventListener("resize", measure, { passive: true });
      section.addEventListener("touchstart", onTouchStart, { passive: true });
      section.addEventListener("touchmove", onTouchMove, { passive: false });
      section.addEventListener("touchend", onTouchEnd, { passive: true });
      return () => {
        window.removeEventListener("scroll", apply);
        window.removeEventListener("resize", measure);
        section.removeEventListener("touchstart", onTouchStart);
        section.removeEventListener("touchmove", onTouchMove);
        section.removeEventListener("touchend", onTouchEnd);
        cancelAnimationFrame(rafId);
        cards.style.transform = "";
        if (spacer) spacer.style.height = "";
      };
    }

    const stickyY = sentinel.getBoundingClientRect().top + window.scrollY;

    if (enableBacklight) {
      Array.from(cards.children).forEach((child) => {
        (child as HTMLElement).style.transition = "box-shadow 0.5s ease";
      });
    }

    const onScroll = () => {
      const totalVh  = spacerVh + holdVh;
      const spacer   = window.innerHeight * (totalVh / 100);
      const progress = Math.max(0, Math.min(1, (window.scrollY - stickyY) / spacer));
      // Remap so cards complete their scroll at the spacerVh fraction; hold after
      const cardProgress = holdVh > 0 ? Math.min(1, progress / (spacerVh / totalVh)) : progress;

      section.classList.toggle("sticky-expanded", progress >= EXPAND_AT);

      const sectionWidth   = section.clientWidth;
      const initialOffset  = (sectionWidth - CONTAINER_PAD * 2 - FIRST_TWO_WIDTH) / 2;
      const thirdCard      = cards.children[2] as HTMLElement | null;

      if (cardProgress < SCROLL_AT) {
        cards.style.transform = `translateX(${initialOffset}px)`;

        if (thirdCard) {
          const thirdCardLeft = CONTAINER_PAD + initialOffset + FIRST_TWO_WIDTH + CARD_GAP;
          const extra = Math.max(0, sectionWidth - thirdCardLeft + HIDE_BUFFER);
          thirdCard.style.marginLeft = `${extra}px`;
        }

        if (enableBacklight) {
          Array.from(cards.children).forEach((child) => {
            (child as HTMLElement).style.boxShadow = GREEN_GLOW;
          });
        }
      } else {
        if (thirdCard) thirdCard.style.marginLeft = "";

        const scrollProgress = (cardProgress - SCROLL_AT) / (1 - SCROLL_AT);
        const maxTranslate   = Math.max(
          0,
          initialOffset - sectionWidth + CONTAINER_PAD + cards.scrollWidth
        );
        cards.style.transform = `translateX(${initialOffset - scrollProgress * maxTranslate}px)`;

        if (enableBacklight) {
          const n = cards.children.length;
          const highlightIdx = scrollProgress >= 0.99
            ? n - 1
            : Math.min(n - 1, Math.round(scrollProgress * (n - 1)));
          Array.from(cards.children).forEach((child, i) => {
            (child as HTMLElement).style.boxShadow = i === highlightIdx ? GREEN_GLOW : BASE_SHADOW;
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (enableBacklight) {
        Array.from(cards.children).forEach((child) => {
          (child as HTMLElement).style.transition = "";
          (child as HTMLElement).style.boxShadow = "";
        });
      }
    };
  }, [sectionId, cardsId, spacerVh, enableBacklight]);

  return <div ref={sentinelRef} style={{ height: 0 }} />;
}
