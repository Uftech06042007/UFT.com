"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORE_KEY = "uft-btn-clicked";
const SELECTOR = ".btn, .jobs-btn, .explore-btn";

function getClicked(): Set<string> {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveClicked(set: Set<string>) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify([...set])); } catch {}
}

export function ButtonPersistence() {
  const pathname = usePathname();

  // Run once on mount: clear state if F5 reload
  useEffect(() => {
    const isReload = performance
      .getEntriesByType("navigation")
      .some((n) => (n as PerformanceNavigationTiming).type === "reload");
    if (isReload) localStorage.removeItem(STORE_KEY);
  }, []);

  // Run on every route: re-apply data-clicked + track new clicks
  useEffect(() => {
    const clicked = getClicked();
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((btn) => {
      const key = btn.textContent?.trim() ?? "";
      if (key && clicked.has(key)) btn.setAttribute("data-clicked", "1");
    });

    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(SELECTOR);
      if (!btn) return;
      btn.setAttribute("data-clicked", "1");
      const key = btn.textContent?.trim() ?? "";
      if (key) {
        const c = getClicked();
        c.add(key);
        saveClicked(c);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
