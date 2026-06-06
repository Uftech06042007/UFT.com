export interface Job {
  id: string;
  title: string;
  location: string;
  skills: string[];
  url: string;
}

const JOBS_URL = "https://uftech.in/jobs";

// Shown instantly on first paint and used if the live fetch fails, so the
// section is never empty. Refreshed by the live fetch on every page load.
export const FALLBACK_JOBS: Job[] = [
  { id: "uft-271", title: "Product Owner - Banking", location: "Remote", skills: ["Product Ownership", "Agile Methodologies"], url: `${JOBS_URL}/uft-271` },
  { id: "uft-270", title: "Senior Backend Engineer - Microservices & Cloud", location: "Bengaluru, Chennai, Kerala, Pune", skills: ["Java", "Spring Boot"], url: `${JOBS_URL}/uft-270` },
  { id: "uft-269", title: "Backend Developer", location: "Bangalore, Pune, Trivandrum, Or Chennai, India (hybrid)", skills: ["Java", "Spring Boot"], url: `${JOBS_URL}/uft-269` },
  { id: "uft-268", title: "Senior QA Automation Engineer (.NET/Karate Framework)", location: "Hyderabad, Pune", skills: ["Selenium WebDriver", "C#"], url: `${JOBS_URL}/uft-268` },
];

const UA = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "text/html",
};

function decode(s: string): string {
  return s.replace(/\\n/g, " ").replace(/\\"/g, '"').replace(/\\\\/g, "\\").replace(/\s+/g, " ").trim();
}

// uftech.in/jobs is a Next.js app that ships its data inside the RSC flight
// payload (self.__next_f.push). We reconstruct that string, then read each
// card's id (href), title (the gradient <h2>), location (map-pin span) and
// skill badges. Resilient by design: anything unparsed just falls back.
export function parseJobs(html: string): Job[] {
  const parts: string[] = [];
  const pushRe = /self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g;
  let p: RegExpExecArray | null;
  while ((p = pushRe.exec(html))) {
    try { parts.push(JSON.parse('"' + p[1] + '"')); } catch { /* skip bad chunk */ }
  }
  const flight = parts.join("");
  if (!flight) return [];

  const ids: string[] = [];
  const hrefRe = /"\/jobs\/(uft-\d+)"/g;
  let h: RegExpExecArray | null;
  while ((h = hrefRe.exec(flight))) ids.push(h[1]);

  const titles: { title: string; idx: number }[] = [];
  const titleRe = /bg-clip-text text-transparent","children":"((?:[^"\\]|\\.)*)"/g;
  let t: RegExpExecArray | null;
  while ((t = titleRe.exec(flight))) titles.push({ title: t[1], idx: t.index });

  const jobs: Job[] = [];
  const n = Math.min(ids.length, titles.length);
  for (let i = 0; i < n; i++) {
    const seg = flight.slice(titles[i].idx, i + 1 < titles.length ? titles[i + 1].idx : flight.length);

    const locM =
      seg.match(/map-pin[\s\S]{0,260}?"children":"((?:[^"\\]|\\.)*)"/) ||
      seg.match(/map-pin[^}]*}\][^"]*?,"((?:[^"\\]|\\.)*)"\]/);

    const childRe = /"children":"((?:[^"\\]|\\.)*)"/g;
    const childs: string[] = [];
    let c: RegExpExecArray | null;
    while ((c = childRe.exec(seg))) childs.push(c[1]);
    const descI = childs.findIndex((x) => x.startsWith("Job Description"));
    const skills = (descI >= 0 ? childs.slice(descI + 1) : [])
      .map(decode)
      .filter(
        (x) =>
          x.length >= 2 &&
          x.length <= 40 &&
          !/^View Details$/i.test(x) &&
          !/Terms of Use|Privacy Policy|hybrid/i.test(x) &&
          // drop the next card's date badge (e.g. "5 Jun 2026") that trails the segment
          !/^\d{1,2}\s+\w{3,}\s+\d{4}$/.test(x)
      )
      .slice(0, 3);

    jobs.push({
      id: ids[i],
      title: decode(titles[i].title),
      location: locM ? decode(locM[1]) : "",
      skills,
      url: `${JOBS_URL}/${ids[i]}`,
    });
  }
  return jobs;
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { headers: UA, cache: "no-store", signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchLatestJobs(limit = 4): Promise<Job[]> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchWithTimeout(JOBS_URL, 6000);
      if (res.ok) {
        const html = await res.text();
        const jobs = parseJobs(html);
        if (jobs.length) return jobs.slice(0, limit);
      }
    } catch {
      /* network/timeout — retry, then fall back */
    }
  }
  return FALLBACK_JOBS.slice(0, limit);
}
