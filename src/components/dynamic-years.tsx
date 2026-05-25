"use client";

import { useState, useEffect } from "react";

// April 6 is UFT's anniversary — both counters tick over on that date each year.
// ops_years   : years in operation (founded April 6, 2003)
// client_years: avg client relationship (base April 6, 2006 → 20yr in 2026)
const BASE_YEAR: Record<"ops_years" | "client_years", number> = {
  ops_years: 2003,
  client_years: 2006,
};

function yearsFrom(
  baseYear: number,
  d: { year: number; month: number; day: number }
): number {
  const pastAnniversary = d.month > 4 || (d.month === 4 && d.day >= 6);
  return pastAnniversary ? d.year - baseYear : d.year - baseYear - 1;
}

interface Props {
  type: "ops_years" | "client_years";
  /** Override the suffix appended after the number. Defaults: ops_years → "yr", client_years → "yr+" */
  suffix?: string;
}

export function DynamicYears({ type, suffix }: Props) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const display = (d: { year: number; month: number; day: number }) => {
      const years = yearsFrom(BASE_YEAR[type], d);
      const s = suffix ?? (type === "ops_years" ? "yr" : "yr+");
      setValue(years + s);
    };

    fetch("https://timeapi.io/api/time/current/zone?timeZone=UTC")
      .then((r) => r.json())
      .then((data) => display({ year: data.year, month: data.month, day: data.day }))
      .catch(() => {
        const now = new Date();
        display({ year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() });
      });
  }, [type, suffix]);

  return <>{value ?? "—"}</>;
}
