"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const VISIBLE_DESKTOP = 5;
const VISIBLE_MOBILE  = 3;

export function ClientCarousel({ items }: { items: { name: string; logo: string }[] }) {
  const total = items.length;
  const [visibleCount, setVisibleCount] = useState(VISIBLE_DESKTOP);

  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth < 640 ? VISIBLE_MOBILE : VISIBLE_DESKTOP);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const extended = useMemo(
    () => [...items.slice(-visibleCount), ...items, ...items.slice(0, visibleCount)],
    [items, visibleCount]
  );

  const [idx, setIdx] = useState(VISIBLE_DESKTOP);
  const [animated, setAnimated] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  const outerRef  = useRef<HTMLDivElement>(null);
  const dragX     = useRef(0);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset position when visible count changes
  useEffect(() => {
    setAnimated(false);
    setIdx(visibleCount);
  }, [visibleCount]);

  const measureCard = useCallback(() => {
    if (outerRef.current) {
      const w = outerRef.current.getBoundingClientRect().width || outerRef.current.offsetWidth;
      if (w > 0) setCardWidth(w / visibleCount);
    }
  }, [visibleCount]);

  const advance = useCallback((dir: 1 | -1) => {
    setAnimated(true);
    setIdx(i => Math.max(0, Math.min(visibleCount + total, i + dir)));
  }, [total, visibleCount]);

  const stopTimer  = useCallback(() => {
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
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const onTransitionEnd = useCallback(() => {
    if (idx >= visibleCount + total) { setAnimated(false); setIdx(visibleCount); }
    else if (idx === 0)              { setAnimated(false); setIdx(total); }
  }, [idx, total, visibleCount]);

  const onMouseDown  = (e: React.MouseEvent)  => { dragX.current = e.clientX; };
  const handleSwipe  = (endX: number, active: boolean) => {
    if (!active) return;
    const diff = dragX.current - endX;
    if (Math.abs(diff) > 20) { advance(diff > 0 ? 1 : -1); resetTimer(); }
  };
  const onMouseUp    = (e: React.MouseEvent)  => handleSwipe(e.clientX, true);
  const onMouseLeave = (e: React.MouseEvent)  => handleSwipe(e.clientX, e.buttons > 0);
  const onTouchStart = (e: React.TouchEvent)  => { dragX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent)  => handleSwipe(e.changedTouches[0].clientX, true);

  const centerPos = Math.floor(visibleCount / 2);
  const scaleMap: Record<number, number> = visibleCount === 3
    ? { 0: 0.88, 1: 1.0, 2: 0.88 }
    : { 0: 0.82, 1: 0.92, 2: 1.0, 3: 0.92, 4: 0.82 };

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
          const pos   = i - idx;
          const scale = scaleMap[pos] ?? 0.82;
          return (
            <div
              key={i}
              className="cc-card"
              style={{
                width: cardWidth ? `${cardWidth - 12}px` : undefined,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                transition: animated ? "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.5s ease" : "none",
                zIndex: pos === centerPos ? 2 : 1,
                position: "relative",
                boxShadow: pos === centerPos
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
