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

    // Mobile: section is pinned AND the cards are a native horizontal scroller.
    // Two-way sync on one shared position:
    //   • vertical page scroll → cards.scrollLeft (pinned scroll-jack)
    //   • finger swipe → window scroll (so native 1:1 drag + momentum still apply)
    if (window.matchMedia("(max-width: 900px)").matches) {
      const spacer = document.querySelector<HTMLElement>(".leadership-spacer");
      let stickyY = 0, maxScroll = 0, pinDuration = 1;
      let syncingLeft = false, syncingTop = false;

      const measure = () => {
        stickyY = sentinel.getBoundingClientRect().top + window.scrollY;
        maxScroll = Math.max(0, cards.scrollWidth - cards.clientWidth);
        pinDuration = maxScroll * 2.6 || 1; // vertical scroll distance for full horizontal
        if (spacer) spacer.style.height = `${pinDuration + window.innerHeight * 0.15}px`;
      };

      const onWinScroll = () => {
        if (syncingTop) { syncingTop = false; return; } // caused by our own scrollTo
        const progress = Math.max(0, Math.min(1, (window.scrollY - stickyY) / pinDuration));
        const target = progress * maxScroll;
        if (Math.abs(cards.scrollLeft - target) > 0.5) {
          syncingLeft = true;
          cards.scrollLeft = target;
        }
      };

      const onCardScroll = () => {
        if (syncingLeft) { syncingLeft = false; return; } // caused by our own scrollLeft set
        const progress = maxScroll ? cards.scrollLeft / maxScroll : 0;
        const targetY = stickyY + progress * pinDuration;
        if (Math.abs(window.scrollY - targetY) > 0.5) {
          syncingTop = true;
          window.scrollTo(0, targetY);
        }
      };

      measure();
      cards.style.transform = "";
      onWinScroll();
      window.addEventListener("scroll", onWinScroll, { passive: true });
      window.addEventListener("resize", measure, { passive: true });
      cards.addEventListener("scroll", onCardScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onWinScroll);
        window.removeEventListener("resize", measure);
        cards.removeEventListener("scroll", onCardScroll);
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
