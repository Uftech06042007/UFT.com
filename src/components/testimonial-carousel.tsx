"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface T { company: string; body: string; by: string; }

export function TestimonialCarousel({ items }: { items: T[] }) {
  const total = items.length;

  // Visible count: 3 on desktop, 1 on phones (must match .tc-card flex-basis breakpoint)
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    const update = () => setVisible(window.innerWidth <= 640 ? 1 : 3);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const center = Math.floor(visible / 2);
  const extended = useMemo(
    () => [...items.slice(-visible), ...items, ...items.slice(0, visible)],
    [items, visible]
  );

  const [idx, setIdx] = useState(3);
  const [animated, setAnimated] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  const [dragging, setDragging] = useState(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragX = useRef(0);
  const isDragging = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const idxRef = useRef(3);
  const cardWidthRef = useRef(0);
  const animatedRef = useRef(true);

  useEffect(() => { idxRef.current = idx; }, [idx]);
  useEffect(() => { cardWidthRef.current = cardWidth; }, [cardWidth]);
  useEffect(() => { animatedRef.current = animated; }, [animated]);

  const applyTransform = useCallback((extraOffset = 0, withTransition?: boolean) => {
    if (!trackRef.current) return;
    const tr = withTransition ?? animatedRef.current;
    trackRef.current.style.transition = tr
      ? "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      : "none";
    trackRef.current.style.transform =
      `translateX(${-idxRef.current * cardWidthRef.current + extraOffset}px)`;
  }, []);

  const measureCard = useCallback(() => {
    if (!outerRef.current) return;
    const w = outerRef.current.offsetWidth / visible;
    setCardWidth(w);
    cardWidthRef.current = w;
    applyTransform(0, false);
  }, [applyTransform, visible]);

  // Reset to the first slide when the visible count changes
  useEffect(() => {
    idxRef.current = visible;
    setIdx(visible);
    animatedRef.current = false;
    setAnimated(false);
    measureCard();
  }, [visible, measureCard]);

  const advance = useCallback((dir: 1 | -1) => {
    const next = Math.max(0, Math.min(visible + total, idxRef.current + dir));
    idxRef.current = next;
    animatedRef.current = true;
    setIdx(next);
    setAnimated(true);
    applyTransform(0, true);
  }, [total, visible, applyTransform]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => advance(1), 5000);
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
      const id = requestAnimationFrame(() => {
        applyTransform(0, false);
        animatedRef.current = true;
        setAnimated(true);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [animated, applyTransform]);

  const onTransitionEnd = useCallback(() => {
    if (idxRef.current >= visible + total) {
      idxRef.current = visible;
      animatedRef.current = false;
      setIdx(visible);
      setAnimated(false);
      applyTransform(0, false);
    } else if (idxRef.current === 0) {
      idxRef.current = total;
      animatedRef.current = false;
      setIdx(total);
      setAnimated(false);
      applyTransform(0, false);
    }
  }, [total, visible, applyTransform]);

  const realIdx = Math.max(0, Math.min(total - 1, idx - visible));
  const sliderPct = total > 1 ? (realIdx / (total - 1)) * 100 : 0;

  const goToReal = (n: number) => {
    idxRef.current = n + visible;
    animatedRef.current = true;
    setIdx(n + visible);
    setAnimated(true);
    applyTransform(0, true);
    resetTimer();
  };

  const startDrag = (x: number) => {
    dragX.current = x;
    isDragging.current = true;
    setDragging(true);
    applyTransform(0, false);
  };

  const moveDrag = (x: number) => {
    if (!isDragging.current) return;
    applyTransform(x - dragX.current, false);
  };

  const endDrag = (x: number, active: boolean) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    if (!active) { applyTransform(0, true); return; }
    const diff = dragX.current - x;
    if (Math.abs(diff) > 40) {
      advance(diff > 0 ? 1 : -1);
      resetTimer();
    } else {
      applyTransform(0, true);
    }
  };

  const onMouseDown  = (e: React.MouseEvent)  => startDrag(e.clientX);
  const onMouseMove  = (e: React.MouseEvent)  => moveDrag(e.clientX);
  const onMouseUp    = (e: React.MouseEvent)  => endDrag(e.clientX, true);
  const onMouseLeave = (e: React.MouseEvent)  => endDrag(e.clientX, e.buttons > 0);
  const onTouchStart = (e: React.TouchEvent)  => startDrag(e.touches[0].clientX);
  const onTouchMove  = (e: React.TouchEvent)  => moveDrag(e.touches[0].clientX);
  const onTouchEnd   = (e: React.TouchEvent)  => endDrag(e.changedTouches[0].clientX, true);

  return (
    <div className="tc-wrapper">
      <div
        ref={outerRef}
        className={`tc-outer${dragging ? " tc-dragging" : ""}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div ref={trackRef} className="tc-track" onTransitionEnd={onTransitionEnd}>
          {extended.map((t, i) => {
            const pos = i - idx;
            const isCenter = pos === center;
            const isSide   = visible > 1 && (pos === center - 1 || pos === center + 1);
            const scale   = isCenter ? (visible === 1 ? 1 : 1.07) : 0.88;
            const opacity = isCenter ? 1 : isSide ? 0.72 : 0.3;
            const cardTransition = animated
              ? "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              : "none";
            return (
              <div
                key={i}
                className={`testimonial-card tc-card${isCenter ? " tc-card--center" : ""}`}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  transition: cardTransition,
                  zIndex: isCenter ? 15 : 1,
                  position: "relative",
                }}
              >
                <span className="testimonial-company mono">{t.company}</span>
                <div className="testimonial-quote">&ldquo;</div>
                <p className="testimonial-body">{t.body}</p>
                <span className="testimonial-name">— {t.by}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="tc-slider-wrap">
        <input
          type="range"
          min={0}
          max={total - 1}
          value={realIdx}
          onChange={e => goToReal(Number(e.target.value))}
          onPointerDown={stopTimer}
          onPointerUp={resetTimer}
          className="tc-slider"
          style={{ '--fill': `${sliderPct}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
