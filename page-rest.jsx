// ===== About / Careers / Jobs / Contact pages =====

function AboutPage() {
  const data = window.UFT_DATA;
  return (
    <main className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">[ About UFT ]</span>
          <h1 className="page-title">
            Inspired innovations <span className="serif-italic">since 2005.</span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div><span className="eyebrow">Our story</span></div>
            <div className="about-prose">
              <p>Established in 2005, UnitForce Technologies is a prominent technology company offering software, engineering, and talent acquisition services to enterprises of various scales. With our international headquarters in Bengaluru, we have {data.employees} global employees across India, USA, and UAE.</p>
              <p>We operate as five interconnected practices — <em>software, engineering, talent, manufacturing, and AI</em> — and are recognized for our array of new product design and AI-enhanced analytic tools, helping firms enhance productivity, process, and data-based decision-making.</p>
              <p>With over 3.74 million man-hours delivered across onsite and offshore engagements, and an average client relationship spanning 20+ years — we are a proven, trusted partner. ISO 9001:2015 certified.</p>
            </div>
          </div>

          <div className="values-grid">
            {data.whyUs.map((v, i) => (
              { ...v, n: String(i + 1).padStart(2, '0') }
            )).map(v => (
              <div key={v.n} className="value-card">
                <span className="mono dim" style={{ fontSize: 11, letterSpacing: '0.12em' }}>[ {v.n} ]</span>
                <h4 style={{ fontSize: 22, marginTop: 16, marginBottom: 10 }} className="serif">{v.t}</h4>
                <p className="muted" style={{ fontSize: 14 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">[ Leadership ]</span>
            <h2 className="section-title">The people <span className="serif-italic">running the work.</span></h2>
          </div>
          <div className="team-grid" style={{ gridTemplateColumns: `repeat(${data.team.length}, 1fr)`, maxWidth: data.team.length <= 2 ? 700 : undefined }}>
            {data.team.map(p => (
              <div key={p.name} className="team-card">
                <div className="team-photo" style={{ aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ padding: '24px 4px 4px' }}>
                  <h3 style={{ fontSize: 20, marginBottom: 4 }}>{p.name}</h3>
                  <div className="mono dim" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
                    {p.role}
                  </div>
                  <p className="muted" style={{ fontSize: 14, marginBottom: 18 }}>{p.bio}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {p.socials.linkedin && <a href={p.socials.linkedin} className="social-btn"><Icon.LinkedIn /></a>}
                    {p.socials.twitter && <a href={p.socials.twitter} className="social-btn"><Icon.Twitter /></a>}
                    {p.socials.facebook && <a href={p.socials.facebook} className="social-btn"><Icon.Facebook /></a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">[ By the numbers ]</span>
            <h2 className="section-title">Where we are, <span className="serif-italic">how big we are.</span></h2>
          </div>
          <div className="bignum-grid">
            {data.stats.map(s => (
              <div key={s.label} className="bignum"><div className="bignum-v">{s.kpi}</div><div className="bignum-l mono">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CareersPage() {
  return (
    <main className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">[ Careers · Culture ]</span>
          <h1 className="page-title">
            Build the things that <span className="serif-italic">build everything else.</span>
          </h1>
          <p className="page-sub">
            We hire engineers, recruiters, and operators who'd rather ship hard problems for serious industries than chase the next shiny thing. If that's you — read on.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <a href="#jobs" className="btn btn-primary">Find your next role <Icon.Arrow /></a>
            <a href="#contact" className="btn btn-ghost">Talk to a recruiter</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="culture-grid">
            <div className="ph" style={{ aspectRatio: '4/5' }}><span className="ph-label">TEAM PHOTO 01</span></div>
            <div className="culture-content">
              <span className="eyebrow">Life at UFT</span>
              <h2 className="section-title" style={{ marginTop: 16, fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Senior people, <span className="serif-italic">flat structure, real ownership.</span>
              </h2>
              <p className="muted" style={{ marginTop: 20, fontSize: 16 }}>
                The average UFT engineer has 9+ years in their domain. We don't run pyramid staffing — every project is led by people who could do the work themselves.
              </p>
              <div className="perks-list">
                {[
                  ['Learning budget', '₹2L / engineer for conferences, certifications, books.'],
                  ['Remote-first, office-anywhere', 'Four hubs to drop into. Work from any of them.'],
                  ['Sabbatical at year 5', 'Six paid weeks. No questions asked.'],
                  ['Equity in the practice', 'Senior staff hold equity in their delivery group.'],
                ].map(([t, d]) => (
                  <div key={t} className="perk">
                    <div className="perk-dot"></div>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 2 }}>{t}</div>
                      <div className="muted" style={{ fontSize: 13 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 36 }}>
                <a href="#jobs" className="btn btn-primary">Browse open jobs <Icon.Arrow /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big jobs CTA band */}
      <section className="jobs-cta-band">
        <div className="container">
          <div className="jobs-cta">
            <div>
              <span className="eyebrow">[ Job portal ]</span>
              <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginTop: 16, lineHeight: 1, letterSpacing: '-0.02em' }}>
                Find your next role <span className="serif-italic">with UFT.</span>
              </h2>
              <p className="muted" style={{ marginTop: 16, fontSize: 16, maxWidth: 460 }}>
                Filter by job type, location, department, experience, and salary. Apply directly — no third-party portals.
              </p>
            </div>
            <a href="#jobs" className="btn btn-primary jobs-cta-btn">Browse jobs <Icon.Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ====== JOBS PORTAL — matching existing UFT portal layout ======
function JobsPage() {
  const allJobs = [
    { id: 'UFT-MNYOWD', title: 'Junior Full Stack AI Engineer', dept: 'IT', type: 'Full Time', loc: 'Remote', summary: 'We are seeking a talented Junior Full Stack AI Engineer to join our growing team. You will work on developing and deploying...', skills: ['Python', 'Machine Learning', 'React or Vue.js', 'Node.js or FastAPI', 'REST APIs'], moreSkills: 3, openings: 1, exp: 'Fresher', salary: '0-3' },
    { id: 'UFT-BDHSCN', title: 'Software Engineer', dept: 'IT', type: 'Full Time', loc: 'Remote', summary: 'We are seeking a talented Software Engineer to join our dynamic development team. In this role, you will design, develop, and maintain high-...', skills: ['JavaScript', 'Python', 'SQL', 'Git', 'REST APIs'], moreSkills: 5, openings: 1, exp: 'Fresher', salary: '0-3' },
    { id: 'UFT-RW2QQC', title: 'Junior Robotics Engineer', dept: 'IT', type: 'Full Time', loc: 'San Francisco, CA', summary: 'We are seeking a passionate Junior Robotics Engineer to join our innovative robotics team. This role offers an excellent opportunity for a r...', skills: ['Python', 'C++', 'ROS', 'Control Systems', 'Computer Vision'], moreSkills: 1, openings: 3, exp: 'Junior', salary: '3-6' },
    { id: 'UFT-PY4DEV', title: 'Python Junior Dev', dept: 'IT', type: 'Full Time', loc: 'Remote', summary: 'Looking for a motivated Python developer to work on backend services, data pipelines, and API development.', skills: ['Python', 'Django', 'PostgreSQL', 'Docker'], moreSkills: 2, openings: 2, exp: 'Fresher', salary: '0-3' },
    { id: 'JOB-SEED-002', title: 'Technical Recruiter', dept: 'Recruitment', type: 'Full Time', loc: 'Hyderabad, India', summary: 'Source and screen engineering candidates for enterprise clients across the APAC region.', skills: ['Sourcing', 'LinkedIn Recruiter', 'ATS', 'Communication'], moreSkills: 0, openings: 3, exp: 'Junior', salary: '3-6' },
    { id: 'JOB-SEED-005', title: 'Frontend Engineer — Fintech', dept: 'IT', type: 'Contract', loc: 'Hyderabad, India', summary: 'Build dashboards for a Tier-1 banking client. React, charting, accessibility-first.', skills: ['React', 'D3', 'TypeScript', 'WCAG'], moreSkills: 0, openings: 2, exp: 'Mid', salary: '6-10' },
    { id: 'JOB-SEED-006', title: 'Recruitment Intern', dept: 'Recruitment', type: 'Internship / Trainee', loc: 'Hyderabad, India', summary: 'Six-month internship sourcing candidates and learning modern recruiting tools.', skills: ['Communication', 'Excel'], moreSkills: 0, openings: 4, exp: 'Fresher', salary: '0-3' },
  ];

  const [filters, setFilters] = useState({ types: [], locs: [], depts: [], exps: [], salaries: [] });
  const [query, setQuery] = useState('');
  const [field, setField] = useState('All Fields');

  const toggle = (cat, val) => {
    setFilters(f => ({
      ...f,
      [cat]: f[cat].includes(val) ? f[cat].filter(v => v !== val) : [...f[cat], val],
    }));
  };

  const visible = allJobs.filter(j => {
    if (filters.types.length && !filters.types.includes(j.type)) return false;
    if (filters.locs.length && !filters.locs.includes(j.loc)) return false;
    if (filters.depts.length && !filters.depts.includes(j.dept)) return false;
    if (filters.exps.length && !filters.exps.includes(j.exp)) return false;
    if (filters.salaries.length && !filters.salaries.includes(j.salary)) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!j.title.toLowerCase().includes(q) && !j.dept.toLowerCase().includes(q) &&
          !j.skills.some(s => s.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const hasFilters = Object.values(filters).some(a => a.length > 0) || query;

  const FilterGroup = ({ title, cat, opts }) => (
    <div className="jp-filter-group">
      <h5 className="jp-filter-h">{title}</h5>
      {opts.map(o => (
        <label key={o} className="jp-filter-check">
          <input type="checkbox" checked={filters[cat].includes(o)} onChange={() => toggle(cat, o)} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );

  const deptColors = { IT: 'jp-tag-it', Recruitment: 'jp-tag-recruit' };

  return (
    <main className="page-enter">
      {/* Hero */}
      <section className="jp-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="jp-hero-eyebrow">CAREERS WITH UFT</span>
          <h1 className="jp-hero-title">Find your next role with UFT</h1>
          <div className="jp-search-bar">
            <select value={field} onChange={e => setField(e.target.value)} className="jp-search-field">
              <option>All Fields</option>
              <option>Title</option>
              <option>Department</option>
              <option>Skill</option>
            </select>
            <div className="jp-search-input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title, department, or keyword..." className="jp-search-input" />
            </div>
            <button className="jp-search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="jp-body">
        <div className="container">
          <div className="jp-layout">
            {/* Sidebar */}
            <aside className="jp-sidebar">
              <h4 className="jp-sidebar-title">All Filters</h4>
              {hasFilters && (
                <button className="jp-clear-filters" onClick={() => { setFilters({ types:[], locs:[], depts:[], exps:[], salaries:[] }); setQuery(''); }}>
                  Clear all ×
                </button>
              )}
              <FilterGroup title="JOB TYPE" cat="types" opts={['Full Time', 'Part Time', 'Contract', 'Internship / Trainee']} />
              <FilterGroup title="LOCATION" cat="locs" opts={['Hyderabad, India', 'Bangalore', 'Remote', 'San Francisco, CA']} />
              <FilterGroup title="DEPARTMENT" cat="depts" opts={['IT', 'Recruitment']} />
              <FilterGroup title="EXPERIENCE" cat="exps" opts={['Fresher (0-1 yr)', 'Junior (1-3 yrs)', 'Mid (3-5 yrs)', 'Senior (5+ yrs)'].map((label, i) => ['Fresher','Junior','Mid','Senior'][i])} />
              <FilterGroup title="SALARY / STIPEND" cat="salaries" opts={['0-3', '3-6', '6-10', '10-20', '20+']} />
            </aside>

            {/* Job list */}
            <div className="jp-list-area">
              <div className="jp-list-head">
                <span>{visible.length} open positions</span>
                <span className="muted">Sort by: <span className="jp-sort-active">Relevance</span></span>
              </div>

              {visible.length === 0 && (
                <div className="jp-empty">
                  <p className="muted" style={{ fontSize: 16 }}>No positions match those filters.</p>
                  <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={() => { setFilters({ types:[], locs:[], depts:[], exps:[], salaries:[] }); setQuery(''); }}>Clear all filters</button>
                </div>
              )}

              <div className="jp-jobs">
                {visible.map(j => (
                  <article key={j.id} className="jp-card">
                    <div className="jp-card-tags">
                      <span className={`jp-tag ${deptColors[j.dept] || 'jp-tag-default'}`}>
                        {j.dept === 'IT' && '💻'}{j.dept === 'Recruitment' && '🎯'} {j.dept}
                      </span>
                      <span className="jp-tag jp-tag-type">{j.type}</span>
                    </div>
                    <div className="jp-card-body">
                      <div className="jp-card-main">
                        <h3 className="jp-card-title">{j.title}</h3>
                        <p className="jp-card-summary">{j.summary}</p>
                        <div className="jp-card-meta">
                          <span className="jp-card-meta-item"><Icon.Pin /> {j.loc}</span>
                          <span className="jp-card-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>
                            {j.openings} openings
                          </span>
                        </div>
                        <div className="jp-card-skills">
                          {j.skills.map(s => <span key={s} className="jp-skill">{s}</span>)}
                          {j.moreSkills > 0 && <span className="jp-skill jp-skill-more">+{j.moreSkills} more</span>}
                        </div>
                      </div>
                      <div className="jp-card-actions">
                        <button className="jp-apply-btn">Apply Now <Icon.Arrow size={12} /></button>
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

function ContactPage() {
  const data = window.UFT_DATA;
  const [form, setForm] = useState({ name: '', email: '', company: '', topic: 'Software Services', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', company: '', topic: 'Software Services', message: '' }); }, 3000);
  };

  return (
    <main className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">[ Contact ]</span>
          <h1 className="page-title">
            Tell us what you're <span className="serif-italic">trying to build.</span>
          </h1>
          <p className="page-sub">A senior partner from the relevant practice will reply within one business day. No SDRs, no qualification calls — just the person who'd actually run the work.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <form className="contact-form" onSubmit={submit}>
              <div className="field-row">
                <label className="field">
                  <span className="field-label mono">NAME</span>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Jamie Chen" />
                </label>
                <label className="field">
                  <span className="field-label mono">EMAIL</span>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="jamie@company.com" />
                </label>
              </div>
              <label className="field">
                <span className="field-label mono">COMPANY</span>
                <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Acme Industries" />
              </label>
              <label className="field">
                <span className="field-label mono">WHAT CAN WE HELP WITH?</span>
                <select value={form.topic} onChange={e => setForm({...form, topic: e.target.value})}>
                  {data.services.map(s => <option key={s.id}>{s.title}</option>)}
                  <option>General inquiry</option>
                  <option>Press / partnerships</option>
                </select>
              </label>
              <label className="field">
                <span className="field-label mono">TELL US MORE</span>
                <textarea required rows="6" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="A few sentences on the system, the team, or the problem…" />
              </label>
              <button type="submit" className="btn btn-primary" disabled={sent} style={{ alignSelf: 'flex-start' }}>
                {sent ? "Sent — we'll be in touch ✓" : <>Send message <Icon.Arrow /></>}
              </button>
            </form>

            <aside className="contact-aside">
              <div className="contact-block">
                <h4 className="mono dim contact-block-title">DIRECT</h4>
                <a href={`mailto:${data.contact.email}`} className="contact-line"><Icon.Email /> {data.contact.email}</a>
                {data.contact.phones.map(p => (
                  <a key={p} href={`tel:${p.replace(/\s/g,'')}`} className="contact-line"><Icon.Phone /> {p}</a>
                ))}
              </div>
              <div className="contact-block">
                <h4 className="mono dim contact-block-title">SOCIAL</h4>
                <a href={data.contact.socials.linkedin} className="contact-line"><Icon.LinkedIn /> /company/uftjobs</a>
                <a href={data.contact.socials.twitter} className="contact-line"><Icon.Twitter /> @uftec</a>
                <a href={data.contact.socials.facebook} className="contact-line"><Icon.Facebook /> /uftjobs</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">[ Locations ]</span>
            <h2 className="section-title">Four hubs, <span className="serif-italic">one delivery network.</span></h2>
          </div>
          <div className="locations-grid">
            {data.locations.map(l => (
              <div key={l.city} className="location-card">
                <div className="location-header">
                  <Icon.Pin />
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--fg-dim)' }}>{l.region}</span>
                </div>
                <h3 style={{ fontSize: 28, marginTop: 8, marginBottom: 12 }} className="serif">{l.city}</h3>
                <p className="muted" style={{ fontSize: 14, marginBottom: 8 }}>{l.address}</p>
                <span className="mono dim" style={{ fontSize: 12 }}>{l.tz}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { AboutPage, CareersPage, JobsPage, ContactPage });
