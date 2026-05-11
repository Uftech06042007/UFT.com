"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { Icon } from "@/components/icons";

interface Job {
  id: string;
  title: string;
  dept: string;
  type: string;
  loc: string;
  summary: string;
  skills: string[];
  moreSkills: number;
  openings: number;
  exp: string;
  salary: string;
}

type FilterKey = "types" | "locs" | "depts" | "exps" | "salaries";
type Filters = Record<FilterKey, string[]>;

const ALL_JOBS: Job[] = [
  {
    id: "UFT-MNYOWD",
    title: "Junior Full Stack AI Engineer",
    dept: "IT",
    type: "Full Time",
    loc: "Remote",
    summary:
      "We are seeking a talented Junior Full Stack AI Engineer to join our growing team. You will work on developing and deploying...",
    skills: ["Python", "Machine Learning", "React or Vue.js", "Node.js or FastAPI", "REST APIs"],
    moreSkills: 3,
    openings: 1,
    exp: "Fresher",
    salary: "0-3",
  },
  {
    id: "UFT-BDHSCN",
    title: "Software Engineer",
    dept: "IT",
    type: "Full Time",
    loc: "Remote",
    summary:
      "We are seeking a talented Software Engineer to join our dynamic development team. In this role, you will design, develop, and maintain high-...",
    skills: ["JavaScript", "Python", "SQL", "Git", "REST APIs"],
    moreSkills: 5,
    openings: 1,
    exp: "Fresher",
    salary: "0-3",
  },
  {
    id: "UFT-RW2QQC",
    title: "Junior Robotics Engineer",
    dept: "IT",
    type: "Full Time",
    loc: "San Francisco, CA",
    summary:
      "We are seeking a passionate Junior Robotics Engineer to join our innovative robotics team. This role offers an excellent opportunity for a r...",
    skills: ["Python", "C++", "ROS", "Control Systems", "Computer Vision"],
    moreSkills: 1,
    openings: 3,
    exp: "Junior",
    salary: "3-6",
  },
  {
    id: "UFT-PY4DEV",
    title: "Python Junior Dev",
    dept: "IT",
    type: "Full Time",
    loc: "Remote",
    summary:
      "Looking for a motivated Python developer to work on backend services, data pipelines, and API development.",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    moreSkills: 2,
    openings: 2,
    exp: "Fresher",
    salary: "0-3",
  },
  {
    id: "JOB-SEED-002",
    title: "Technical Recruiter",
    dept: "Recruitment",
    type: "Full Time",
    loc: "Hyderabad, India",
    summary:
      "Source and screen engineering candidates for enterprise clients across the APAC region.",
    skills: ["Sourcing", "LinkedIn Recruiter", "ATS", "Communication"],
    moreSkills: 0,
    openings: 3,
    exp: "Junior",
    salary: "3-6",
  },
  {
    id: "JOB-SEED-005",
    title: "Frontend Engineer — Fintech",
    dept: "IT",
    type: "Contract",
    loc: "Hyderabad, India",
    summary: "Build dashboards for a Tier-1 banking client. React, charting, accessibility-first.",
    skills: ["React", "D3", "TypeScript", "WCAG"],
    moreSkills: 0,
    openings: 2,
    exp: "Mid",
    salary: "6-10",
  },
  {
    id: "JOB-SEED-006",
    title: "Recruitment Intern",
    dept: "Recruitment",
    type: "Internship / Trainee",
    loc: "Hyderabad, India",
    summary: "Six-month internship sourcing candidates and learning modern recruiting tools.",
    skills: ["Communication", "Excel"],
    moreSkills: 0,
    openings: 4,
    exp: "Fresher",
    salary: "0-3",
  },
];

const DEPT_COLORS: Record<string, string> = {
  IT: "jp-tag-it",
  Recruitment: "jp-tag-recruit",
};

const EMPTY_FILTERS: Filters = { types: [], locs: [], depts: [], exps: [], salaries: [] };

interface FilterGroupProps {
  title: string;
  cat: FilterKey;
  opts: string[];
  filters: Filters;
  toggle: (cat: FilterKey, val: string) => void;
}

function FilterGroup({ title, cat, opts, filters, toggle }: FilterGroupProps) {
  return (
    <div className="jp-filter-group">
      <h5 className="jp-filter-h">{title}</h5>
      {opts.map((o) => (
        <label key={o} className="jp-filter-check">
          <input
            type="checkbox"
            checked={filters[cat].includes(o)}
            onChange={() => toggle(cat, o)}
          />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}

export default function JobsPage() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [query, setQuery] = useState("");
  const [field, setField] = useState("All Fields");

  const toggle = (cat: FilterKey, val: string) => {
    setFilters((f) => ({
      ...f,
      [cat]: f[cat].includes(val) ? f[cat].filter((v) => v !== val) : [...f[cat], val],
    }));
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setQuery("");
  };

  const visible = ALL_JOBS.filter((j) => {
    if (filters.types.length && !filters.types.includes(j.type)) return false;
    if (filters.locs.length && !filters.locs.includes(j.loc)) return false;
    if (filters.depts.length && !filters.depts.includes(j.dept)) return false;
    if (filters.exps.length && !filters.exps.includes(j.exp)) return false;
    if (filters.salaries.length && !filters.salaries.includes(j.salary)) return false;
    if (query) {
      const q = query.toLowerCase();
      if (
        !j.title.toLowerCase().includes(q) &&
        !j.dept.toLowerCase().includes(q) &&
        !j.skills.some((s) => s.toLowerCase().includes(q))
      )
        return false;
    }
    return true;
  });

  const hasFilters = Object.values(filters).some((a) => a.length > 0) || !!query;

  return (
    <main className="page-enter">
      {/* Hero */}
      <section className="jp-hero">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="jp-hero-eyebrow">CAREERS WITH UFT</span>
          <h1 className="jp-hero-title">Find your next role with UFT</h1>
          <div className="jp-search-bar">
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="jp-search-field"
            >
              <option>All Fields</option>
              <option>Title</option>
              <option>Department</option>
              <option>Skill</option>
            </select>
            <div className="jp-search-input-wrap">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-5-5" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, department, or keyword..."
                className="jp-search-input"
              />
            </div>
            <button className="jp-search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="jp-body">
        <div className="container">
          <div className="jp-layout">
            {/* Sidebar filters */}
            <aside className="jp-sidebar">
              <h4 className="jp-sidebar-title">All Filters</h4>
              {hasFilters && (
                <button className="jp-clear-filters" onClick={clearFilters}>
                  Clear all ×
                </button>
              )}
              <FilterGroup
                title="JOB TYPE"
                cat="types"
                opts={["Full Time", "Part Time", "Contract", "Internship / Trainee"]}
                filters={filters}
                toggle={toggle}
              />
              <FilterGroup
                title="LOCATION"
                cat="locs"
                opts={["Hyderabad, India", "Bangalore", "Remote", "San Francisco, CA"]}
                filters={filters}
                toggle={toggle}
              />
              <FilterGroup
                title="DEPARTMENT"
                cat="depts"
                opts={["IT", "Recruitment"]}
                filters={filters}
                toggle={toggle}
              />
              <FilterGroup
                title="EXPERIENCE"
                cat="exps"
                opts={["Fresher", "Junior", "Mid", "Senior"]}
                filters={filters}
                toggle={toggle}
              />
              <FilterGroup
                title="SALARY / STIPEND"
                cat="salaries"
                opts={["0-3", "3-6", "6-10", "10-20", "20+"]}
                filters={filters}
                toggle={toggle}
              />
            </aside>

            {/* Job list */}
            <div className="jp-list-area">
              <div className="jp-list-head">
                <span>{visible.length} open positions</span>
                <span className="muted">
                  Sort by: <span className="jp-sort-active">Relevance</span>
                </span>
              </div>

              {visible.length === 0 && (
                <div className="jp-empty">
                  <p className="muted" style={{ fontSize: 16 }}>
                    No positions match those filters.
                  </p>
                  <button
                    className="btn btn-ghost"
                    style={{ marginTop: 16 }}
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              <div className="jp-jobs">
                {visible.map((j) => (
                  <article key={j.id} className="jp-card">
                    <div className="jp-card-tags">
                      <span className={`jp-tag ${DEPT_COLORS[j.dept] ?? "jp-tag-default"}`}>
                        {j.dept === "IT" && "💻"}
                        {j.dept === "Recruitment" && "🎯"} {j.dept}
                      </span>
                      <span className="jp-tag jp-tag-type">{j.type}</span>
                    </div>
                    <div className="jp-card-body">
                      <div className="jp-card-main">
                        <h3 className="jp-card-title">{j.title}</h3>
                        <p className="jp-card-summary">{j.summary}</p>
                        <div className="jp-card-meta">
                          <span className="jp-card-meta-item">
                            <Icon.Pin /> {j.loc}
                          </span>
                          <span className="jp-card-meta-item">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="8.5" cy="7" r="4" />
                              <path d="M20 8v6M23 11h-6" />
                            </svg>
                            {j.openings} openings
                          </span>
                        </div>
                        <div className="jp-card-skills">
                          {j.skills.map((s) => (
                            <span key={s} className="jp-skill">
                              {s}
                            </span>
                          ))}
                          {j.moreSkills > 0 && (
                            <span className="jp-skill jp-skill-more">
                              +{j.moreSkills} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="jp-card-actions">
                        <button className="jp-apply-btn">
                          Apply Now <Icon.Arrow size={12} />
                        </button>
                        <button className="jp-details-btn">View Details</button>
                        <span className="jp-ref mono">Ref: {j.id}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
