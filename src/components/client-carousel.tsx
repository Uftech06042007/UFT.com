"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const VISIBLE = 5;

export function ClientCarousel({ items }: { items: { name: string; logo: string }[] }) {
  const total = items.length;
  const extended = [...items.slice(-VISIBLE), ...items, ...items.slice(0, VISIBLE)];

  const [idx, setIdx] = useState(VISIBLE);
  const [animated, setAnimated] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const dragX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const measureCard = useCallback(() => {
    if (outerRef.current) setCardWidth(outerRef.current.offsetWidth / VISIBLE);
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    setAnimated(true);
    setIdx(i => Math.max(0, Math.min(VISIBLE + total, i + dir)));
  }, [total]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => advance(1), 3000);
  }, [advance, stopTimer]);

  useEffect(() => {
    measureCard();
    resetTimer();
    const ro = new ResizeObserver(measureCard);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => { stopTimer(); ro.disconnect(); };
  }, [measureCard, resetTimer, stopTimer]);

  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const onTransitionEnd = useCallback(() => {
    if (idx >= VISIBLE + total) { setAnimated(false); setIdx(VISIBLE); }
    else if (idx === 0) { setAnimated(false); setIdx(total); }
  }, [idx, total]);

  const onMouseDown = (e: React.MouseEvent) => { dragX.current = e.clientX; };
  const handleSwipe = (endX: number, active: boolean) => {
    if (!active) return;
    const diff = dragX.current - endX;
    if (Math.abs(diff) > 40) { advance(diff > 0 ? 1 : -1); resetTimer(); }
  };
  const onMouseUp = (e: React.MouseEvent) => handleSwipe(e.clientX, true);
  const onMouseLeave = (e: React.MouseEvent) => handleSwipe(e.clientX, e.buttons > 0);
  const onTouchStart = (e: React.TouchEvent) => { dragX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => handleSwipe(e.changedTouches[0].clientX, true);

  return (
    <div
      ref={outerRef}
      className="cc-outer"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="cc-track"
        style={{
          transform: `translateX(${-idx * cardWidth}px)`,
          transition: animated ? "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {extended.map((c, i) => {
          const pos = i - idx;
          const scaleMap: Record<number, number> = { 0: 0.78, 1: 0.90, 2: 1.08, 3: 0.90, 4: 0.78 };
          const originMap: Record<number, string> = { 0: "right center", 1: "center center", 2: "center center", 3: "center center", 4: "left center" };
          const scale = scaleMap[pos] ?? 0.78;
          const origin = originMap[pos] ?? "center center";
          return (
            <div
              key={i}
              className="cc-card"
              style={{
                width: cardWidth ? `${cardWidth - 12}px` : undefined,
                transform: `scale(${scale})`,
                transformOrigin: origin,
                transition: animated ? "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.5s ease" : "none",
                zIndex: pos === 2 ? 2 : 1,
                position: "relative",
                boxShadow: pos === 2
                  ? "0 0 0 1px rgba(255,120,30,0.3), 0 4px 24px rgba(255,100,20,0.35), 0 0 40px rgba(255,120,30,0.2)"
                  : undefined,
              }}
            >
              <img
                src={c.logo}
                alt={c.name}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = "block";
                }}
              />
              <span className="cc-name" style={{ display: "none" }}>{c.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
