import type { Metadata } from "next";
import type React from "react";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { StackFade } from "@/components/stack-fade";
import { CareersHero } from "@/components/careers-hero";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build the things that build everything else. Join UFT.",
};

export default function CareersPage() {
  return (
    <main className="page-enter">
      <section className="page-hero careers-page-hero">
        <CareersHero />
      </section>

      <StackFade container=".careers-stack" card=".careers-stack-card" />
      <div className="careers-stack">
      {/* Client Testimonials */}
      <section className="section testimonial-section careers-stack-card" id="testimonial-section">
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
            { company: "LMT", body: "UFT has been a key recruitment partner supporting LMT's HTD model and Embedded Systems division. Their ability to identify niche talent in embedded technologies and hardware design — within the timelines our projects demand — is commendable. We look forward to a long and growing relationship with UFT.", by: "Senior Manager – Talent" },
            { company: "ICICI Bank", body: "UFT has delivered high-quality software development services for ICICI Bank, with a strong focus on insurance-related projects. Their development teams demonstrated deep expertise in insurance domain workflows, integration layers, and compliance-driven software design. They integrated seamlessly with our in-house teams, maintained our stringent security standards. A highly professional and dependable partner.", by: "CTO Office" },
            { company: "Yes Bank", body: "UFT's AI team helped us design and deploy intelligent automation solutions that significantly reduced operational friction across our branches. They are very supportive and highly professional in their approach, starting with our business problem rather than the technology. They have executed every project without any problems and we saw measurable impact within the first quarter. It is a pleasure working with UFT.", by: "Head of Digital Innovation" },
            { company: "Tata Group", body: "UFT has consistently delivered high-calibre professionals across multiple Tata businesses. Their wide network and thorough screening process ensure every candidate meets both the technical and cultural bar we set. The team at UFT is very supportive, highly professional, and goes above and beyond — they truly treat our hiring priorities as their own. A partner we rely on year after year.", by: "Group HR Head" },
            { company: "Tata Technologies", body: "Partnering with UFT on our AI initiatives has been a highly rewarding experience. Their team brought deep expertise in applied machine learning and product engineering, enabling us to accelerate our smart manufacturing roadmap. UFT is very supportive, highly professional, and goes the extra mile in delivering without a single compromise on quality. We look forward to a long and growing partnership with them.", by: "VP – Digital Engineering" },
          ]} />
        </div>
      </section>

      {/* Life at UFT — photo collage */}
      <section className="section careers-stack-card" id="lau-section">
        <div className="container">
          <span className="eyebrow">[ Life at UFT ]</span>
          <h2
            className="section-title"
            style={{ marginTop: 12, marginBottom: 40, fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            Senior people,{" "}
            <span className="serif-italic">flat structure, real ownership.</span>
          </h2>
          <div className="lau-collage">
            {([
              { cls: "lau-a", src: "/assets/lau-a.jpg", alt: "UFT office entrance" },
              { cls: "lau-b", src: "/assets/lau-b.jpg", alt: "UFT meeting room" },
              { cls: "lau-c", src: "/assets/lau-c.jpg", alt: "UFT team" },
              { cls: "lau-d", src: "/assets/lau-d.jpg", alt: "UFT team" },
              // Empty slots (mobile only): bottom of left column + top of right column
              { cls: "lau-slot lau-slot-1", slot: true },
              { cls: "lau-slot lau-slot-2", slot: true },
              { cls: "lau-e", src: "/assets/lau-e.jpg", alt: "UFT all-hands" },
              { cls: "lau-f", src: "/assets/lau-f.jpg", alt: "UFT team" },
              { cls: "lau-g", src: "/assets/lau-g-3.jpg", alt: "UFT workspace", imgStyle: { transform: "scale(1.75)", transformOrigin: "35% center" } },
              { cls: "lau-h", src: "/assets/lau-h.jpg", alt: "UFT team event" },
            ] as { cls: string; src?: string; alt?: string; imgStyle?: React.CSSProperties; slot?: boolean }[]).map(({ cls, src, alt, imgStyle, slot }) =>
              slot ? (
                <div key={cls} className={cls} aria-hidden="true" />
              ) : (
                <div key={cls} className={cls} style={{ position: "relative" }}>
                  <img src={src} alt={alt} style={imgStyle} />
                </div>
              )
            )}
          </div>
        </div>
      </section>
      </div>

    </main>
  );
}
