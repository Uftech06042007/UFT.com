import { Icon } from "@/components/icons";

// Resume templates mirrored from the uftech.in CV builder marquee (skills-first
// omitted, matching the marquee). Previews live in /public/assets/resume.
const RESUME_TEMPLATES = [
  { id: "professional", name: "Professional", tagline: "ATS-optimised classic" },
  { id: "classic", name: "Classic", tagline: "Timeless elegance" },
  { id: "chicago", name: "Chicago", tagline: "Bold & structured" },
  { id: "easy", name: "Easy", tagline: "Simple & scannable" },
  { id: "empire-state", name: "Empire State", tagline: "Executive presence" },
  { id: "milano", name: "Milano", tagline: "Modern European" },
];

// The marquee animates 0 → -50%, so the track is two identical halves and the
// reset is seamless. Each half must be wider than the visible strip or a gap
// appears at the loop point — so we repeat the 6 templates ×3 per half (×6 total,
// ~6800px of track) to stay full on ultrawide screens too.
const HALF = [...RESUME_TEMPLATES, ...RESUME_TEMPLATES, ...RESUME_TEMPLATES];
const MARQUEE = [...HALF, ...HALF];

export function ResumeAd() {
  return (
    <aside className="cv-ad">
      <span className="cv-ad-badge">✦ AI · ATS-optimised · Instant</span>
      <h2 className="cv-ad-title">
        Build a resume that{" "}
        <span className="serif-italic">gets you hired.</span>
      </h2>
      <p className="cv-ad-sub">
        Upload your CV, pick from six recruiter-ready templates, and we&apos;ll deliver an
        ATS-optimised resume to your inbox in minutes.
      </p>

      <div className="cv-ad-marquee">
        <div className="cv-ad-track">
          {MARQUEE.map((t, i) => (
            <figure key={`${t.id}-${i}`} className="cv-ad-card" aria-hidden={i >= RESUME_TEMPLATES.length}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/resume/${t.id}.png`}
                alt={`${t.name} resume template`}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span className="cv-ad-card-name">{t.name}</span>
                <span className="cv-ad-card-tag">{t.tagline}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <a
        href="https://uftech.in/enhance-cv"
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary cv-ad-cta"
      >
        Build your resume now <Icon.Arrow />
      </a>
    </aside>
  );
}
