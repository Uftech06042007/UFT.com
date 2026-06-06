import type { Metadata } from "next";
import Image from "next/image";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";
import { DynamicYears } from "@/components/dynamic-years";
import { StickyExpand } from "@/components/sticky-expand";
import { StackReveal } from "@/components/stack-reveal";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about UnitForce Technologies — our story, leadership, and values since 2003.",
};

export default function AboutPage() {
  return (
    <main className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">[ About UFT ]</span>
          <h1 className="page-title">
            Inspired Innovations <span className="serif-italic">since 2003.</span>
          </h1>
        </div>
      </section>

      {/* Story + values */}
      <section className="section" style={{ padding: 0 }}>
        <div className="about-story-bg" style={{ padding: "88px 0" }}>
          <div className="container">
            <div className="about-grid">
              <div>
                <span className="eyebrow">[ Our story ]</span>
                <div className="about-prose" style={{ marginTop: 24 }}>
                  <p>
                    Established in 2003, UnitForce Technologies is a prominent technology company
                    offering software, engineering, and talent acquisition services to enterprises of
                    various scales. With our international headquarters in Bengaluru, we have{" "}
                    {UFT_DATA.employees} global employees across India, USA, and UAE.
                  </p>
                  <p>
                    We operate as five interconnected practices —{" "}
                    <em>AI, engineering, talent, software, and manufacturing</em> — and are recognized
                    for our array of new product design and AI-enhanced analytic tools, helping firms
                    enhance productivity, process, and data-based decision-making.
                  </p>
                  <p>
                    With over 4.5 million man-hours delivered across onsite and offshore engagements,
                    and an average client relationship spanning{" "}
                    <DynamicYears type="client_years" suffix="+" /> years — we are a proven, trusted
                    partner. ISO 9001:2015 certified.
                  </p>
                </div>
              </div>
              <div className="about-stats" style={{ marginTop: 36 }}>
                {UFT_DATA.stats.map((s) => (
                  <div key={s.label} className="bignum">
                    <div className="bignum-v">
                      {s.dynamicKey ? <DynamicYears type={s.dynamicKey} /> : s.kpi}
                    </div>
                    <div className="bignum-l mono">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="values-grid">
              {UFT_DATA.whyUs
                .map((v, i) => ({ ...v, n: String(i + 1).padStart(2, "0") }))
                .map((v) => (
                  <div key={v.n} className="value-card">
                    <span className="mono dim sect-num" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)" }}>
                      [ {v.n} ]
                    </span>
                    <h4
                      style={{ fontSize: 22, marginTop: 16, marginBottom: 10, fontWeight: 700 }}
                      className="serif"
                    >
                      {v.t}
                    </h4>
                    <p className="muted" style={{ fontSize: 14 }}>
                      {v.d}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section testimonial-section" id="testimonial-section">
        <div className="container">
          <div className="testimonial-header">
            <span className="eyebrow">[ Client Success Stories ]</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Client Testimonials
            </h2>
            <p className="muted" style={{ marginTop: 8, fontSize: 15 }}>
              Insights into Our Excellence and Dedication
            </p>
          </div>
          <TestimonialCarousel items={[
            { company: "Mphasis", body: "My relationship with UFT is almost for 5 years now and they have been a very key vendor to Mphasis in terms of providing Staff Augmentation Services and Secondment Model Payroll services across various Geographies. UFT is very supportive and highly professional in their approach in fulfilling our requirements. They go an extra mile in supporting their clients like us and have executed many projects for us without any issues. It is pleasure working with UFT and looking for many more projects to work with them.", by: "Naresh V K" },
            { company: "Toyota", body: "UFT has been a reliable and highly professional recruitment partner for our India manufacturing and R&D divisions. They demonstrate a deep understanding of the automotive talent landscape and consistently deliver quality candidates within tight timelines. They have executed many requirements for us without any problems and it is truly a pleasure working with a team that takes ownership of outcomes the way UFT does.", by: "Director – HR Operations" },
            { company: "Infosys", body: "In a competitive talent market, finding the right people quickly is critical. UFT has repeatedly stepped up with strong pipelines for our technology and delivery roles. Their recruiters understand the IT services industry inside out, and that expertise shows clearly in every shortlist they deliver. It is a pleasure working with UFT and we look forward to many more engagements together.", by: "Associate VP – Workforce Planning" },
            { company: "ANZ", body: "UFT has been an outstanding recruitment partner for ANZ, specialising in sourcing highly skilled Agile Coaches and Scrum Masters for our transformation programmes. Their deep understanding of agile frameworks and the ability to identify candidates who can drive real change within large organisations sets them apart. It is a pleasure working with the UFT team.", by: "Head of Talent Acquisition" },
            { company: "Bharti AXA", body: "UFT has been a valued software development partner for Bharti AXA, contributing significantly to our insurance platform projects. Their teams brought strong technical capability across insurance application development, policy management systems, digital servicing solutions, and end-to-end payment gateway integrations. UFT is highly professional, very supportive, and consistently delivered quality outcomes. We look forward to continuing this partnership.", by: "Head of Technology" },
            { company: "Indomim", body: "UFT has been a dependable and professional recruitment partner for Indomim. Their team took time to understand our specific talent needs, our work culture, and our business objectives — bringing us candidates who were not just technically strong but genuinely aligned with what we were looking for. UFT is very supportive and goes the extra mile in fulfilling requirements. It is a pleasure working with them.", by: "VP – Human Resources" },
            { company: "Halliburton", body: "UFT has been a strong engineering services partner for Halliburton, with a primary focus on Oil & Gas projects and design services. Their engineers bring deep domain expertise in upstream and downstream oil and gas operations, and have delivered design engagements to the highest technical and safety standards our industry demands. They are highly professional, very supportive, and have executed multiple projects.", by: "Operations Director – Asia Pacific" },
            { company: "Aditya Birla", body: "UFT has been a valued software development partner for Aditya Birla, contributing significantly to our retail platform projects. Their team demonstrated deep technical capability and domain expertise in complex PL/SQL development, database optimization, and backend data architecture tailored for high-volume retail operations. UFT is highly professional, very supportive, and consistently delivered quality outcomes within our timelines.", by: "Head of Technology" },
            { company: "AB InBev", body: "UFT has been an excellent recruitment partner for AB InBev, successfully supporting our Salesforce and technical hiring requirements with precision and speed. Their understanding of CRM platform skills and technology talent dynamics in the FMCG space is impressive. UFT is very supportive, highly professional, and has executed every requirement. Our hiring managers consistently appreciate the quality they deliver.", by: "People Director – South Asia" },
            { company: "Wipro", body: "UFT has been a trusted partner for Wipro's contract hiring needs across our digital and cloud practices. Their expertise in contract workforce solutions, ability to mobilise resources quickly, and thorough vetting of candidates makes them a go-to partner for our flexible staffing requirements. They have delivered consistently without a single issue and it is a pleasure working with the UFT team.", by: "Head of Lateral Hiring" },
            { company: "LTTS", body: "UFT has been a key recruitment partner supporting LTTS's HTD model and Embedded Systems division. Their ability to identify niche talent in embedded technologies and hardware design — within the timelines our projects demand — is commendable. We look forward to a long and growing relationship with UFT.", by: "Senior Manager – Talent" },
            { company: "ICICI Bank", body: "UFT has delivered high-quality software development services for ICICI Bank, with a strong focus on insurance-related projects. Their development teams demonstrated deep expertise in insurance domain workflows, integration layers, and compliance-driven software design. They integrated seamlessly with our in-house teams, maintained our stringent security standards. A highly professional and dependable partner.", by: "CTO Office" },
            { company: "Yes Bank", body: "UFT's AI team helped us design and deploy intelligent automation solutions that significantly reduced operational friction across our branches. They are very supportive and highly professional in their approach, starting with our business problem rather than the technology. They have executed every project without any problems and we saw measurable impact within the first quarter. It is a pleasure working with UFT.", by: "Head of Digital Innovation" },
            { company: "Tata Group", body: "UFT has consistently delivered high-calibre professionals across multiple Tata businesses. Their wide network and thorough screening process ensure every candidate meets both the technical and cultural bar we set. The team at UFT is very supportive, highly professional, and goes above and beyond — they truly treat our hiring priorities as their own. A partner we rely on year after year.", by: "Group HR Head" },
            { company: "Tata Technologies", body: "Partnering with UFT on our AI initiatives has been a highly rewarding experience. Their team brought deep expertise in applied machine learning and product engineering, enabling us to accelerate our smart manufacturing roadmap. UFT is very supportive, highly professional, and goes the extra mile in delivering without a single compromise on quality. We look forward to a long and growing partnership with them.", by: "VP – Digital Engineering" },
          ]} />
        </div>
      </section>

      <StackReveal underId="testimonial-section" overId="leadership-section" />
      <StickyExpand sectionId="leadership-section" cardsId="leadership-cards" spacerVh={320} holdVh={100} enableBacklight />

      {/* Leadership */}
      <section className="section" id="leadership-section">
        <div className="container">
          <div className="section-header" style={{ width: "100%" }}>
            <span className="eyebrow">[ Leadership ]</span>
            <h2 className="section-title">
              The people <span className="serif-italic">running the work.</span>
            </h2>
          </div>
          <div id="leadership-cards" style={{ display: "flex", gap: 24, marginTop: 20, willChange: "transform" }}>
            {UFT_DATA.team.map((p, i) => (
              <div key={i} className="leader-card" style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", boxShadow: "0 12px 40px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden", display: "flex", flexDirection: "row", alignItems: "center", width: 640, flexShrink: 0, padding: "36px 32px 36px 28px", gap: 28 }}>
                {/* Polaroid */}
                <div className="leader-polaroid" style={{ flexShrink: 0, background: "var(--bg-elev)", padding: "2px 2px 0", boxShadow: "0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)", borderRadius: 0, display: "flex", flexDirection: "column" }}>
                  <div className="leader-photobox" style={{ width: 260, height: 260, overflow: "hidden" }}>
                    {p.photo.startsWith("[") ? (
                      <div style={{ width: "100%", height: "100%", background: "#e8e8e4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.08em" }}>[ photo ]</span>
                      </div>
                    ) : (
                      <Image
                        src={p.photo}
                        alt={p.name}
                        width={380}
                        height={380}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: p.photoPosition ?? "top", display: "block", transform: p.photoScale ? `scale(${p.photoScale})` : undefined, transformOrigin: p.photoPosition ?? "top" }}
                      />
                    )}
                  </div>
                  <div className="leader-nameplate" style={{ height: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2, letterSpacing: "0.02em" }}>{p.name}</h3>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>{p.role}</div>
                  </div>
                </div>
                {/* Mobile-only meta row: name+role left, socials right */}
                <div className="leader-meta-mobile">
                  <div className="leader-id-m">
                    <h3>{p.name}</h3>
                    <div className="mono leader-role-m">{p.role}</div>
                  </div>
                  <div className="leader-socials-m">
                    {p.socials.linkedin && (
                      <a href={p.socials.linkedin} className="social-btn" target="_blank" rel="noreferrer"><Icon.LinkedIn /></a>
                    )}
                    {p.socials.twitter && (
                      <a href={p.socials.twitter} className="social-btn" target="_blank" rel="noreferrer"><Icon.Twitter /></a>
                    )}
                    {p.socials.facebook && (
                      <a href={p.socials.facebook} className="social-btn" target="_blank" rel="noreferrer"><Icon.Facebook /></a>
                    )}
                  </div>
                </div>
                {/* Bio */}
                <div className="leader-bio" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignSelf: "stretch" }}>
                  <p className="muted" style={{ fontSize: 13, lineHeight: 1.75 }}>{p.bio}</p>
                  <div className="leader-socials-d" style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                    {p.socials.linkedin && (
                      <a href={p.socials.linkedin} className="social-btn" target="_blank" rel="noreferrer"><Icon.LinkedIn /></a>
                    )}
                    {p.socials.twitter && (
                      <a href={p.socials.twitter} className="social-btn" target="_blank" rel="noreferrer"><Icon.Twitter /></a>
                    )}
                    {p.socials.facebook && (
                      <a href={p.socials.facebook} className="social-btn" target="_blank" rel="noreferrer"><Icon.Facebook /></a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="leadership-spacer" style={{ height: "420vh" }} />
    </main>
  );
}
