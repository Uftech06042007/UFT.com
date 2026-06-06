"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { FALLBACK_JOBS, type Job } from "@/lib/jobs";

export function JobsList() {
  // Seed with the fallback so cards show instantly; replace with live data
  // fetched from /api/jobs on every page load.
  const [jobs, setJobs] = useState<Job[]>(FALLBACK_JOBS);

  useEffect(() => {
    let alive = true;
    fetch("/api/jobs", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (alive && Array.isArray(d?.jobs) && d.jobs.length) setJobs(d.jobs);
      })
      .catch(() => { /* keep fallback */ });
    return () => { alive = false; };
  }, []);

  return (
    <div className="jobs-grid">
      {jobs.map((j) => (
        <a key={j.id} href={j.url} target="_blank" rel="noreferrer" className="job-card">
          <div className="job-card-head">
            <span className="mono job-card-ref">{j.id.replace("-", " ").toUpperCase()}</span>
            <span className="job-card-arrow"><Icon.Arrow size={14} /></span>
          </div>
          <h3 className="job-card-title">{j.title}</h3>
          {j.location && (
            <div className="job-card-loc">
              <Icon.Pin /> <span>{j.location}</span>
            </div>
          )}
          {j.skills.length > 0 && (
            <div className="job-card-skills">
              {j.skills.map((s) => (
                <span key={s} className="job-skill">{s}</span>
              ))}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
