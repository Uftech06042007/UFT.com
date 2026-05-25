// ===== UFT site data — sourced from Corporate Deck 2026 =====

export interface Service {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  descFull?: string;
  capabilities: string[];
  flagship?: boolean;
  image?: string;
}

export interface Industry {
  id: string;
  name: string;
  blurb: string;
  image?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  photoPosition?: string;
  photoScale?: number;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Location {
  city: string;
  region: string;
  address: string;
  tz: string;
  entity: string;
  photo?: string;
}

export interface Stat {
  kpi: string;
  label: string;
  dynamicKey?: "ops_years" | "client_years";
}

export interface WhyUs {
  t: string;
  d: string;
}

export interface UFTData {
  tagline: string;
  fullName: string;
  founded: number;
  hq: string;
  employees: string;
  services: Service[];
  industries: Industry[];
  clients: { name: string; logo: string }[];
  team: TeamMember[];
  locations: Location[];
  stats: Stat[];
  contact: {
    phones: string[];
    email: string;
    salesContact: { name: string; phone: string; email: string };
    socials: { linkedin: string; twitter: string; facebook: string };
  };
  certifications: string[];
  whyUs: WhyUs[];
}

export const UFT_DATA: UFTData = {
  tagline: "Inspired Innovations",
  fullName: "UnitForce Technologies Consulting Pvt. Ltd.",
  founded: 2003,
  hq: "Bengaluru, India",
  employees: "400+",
  services: [
    {
      id: "ai",
      title: "AI Services",
      tagline: "Build the future with AI strategies.",
      desc: "Applied AI and ML solutions that make your business faster, stronger, and more effective — from analytics to computer vision to intelligent automation.",
      descFull: "We design and implement AI and ML solutions that solve real operational problems — not generic demos. For engineering clients, that means predictive maintenance, visual defect detection, and simulation acceleration. For BFSI clients, fraud detection, credit scoring models, and intelligent document processing. We handle the full stack: data preparation, model development, fine-tuning on your proprietary data, and production deployment with monitoring. All work is delivered with responsible AI and compliance guardrails built in from day one.",
      capabilities: ["Generative AI implementation", "Predictive maintenance & defect detection", "Fraud detection & credit scoring", "Intelligent document processing", "Model fine-tuning & deployment", "AI for engineering & BFSI", "Responsible AI & compliance"],
      image: "/assets/service-ai.png",
    },
    {
      id: "engineering",
      title: "Engineering Services",
      tagline: "4.5M+ man-hours delivered onsite & offshore.",
      desc: "Product design, sustaining engineering, drafting & modeling, FEA, GD&T, and new product development across oil & gas, automotive, aerospace, and locomotive.",
      descFull: "UFT engineers work across the full product lifecycle — from concept and new product design through sustaining engineering, drafting, 3D modeling, FEA simulation, GD&T validation, reverse engineering techniques, and Class A surface building. We deploy onsite at client facilities or operate offshore, serving automotive, aerospace, oil & gas, and locomotive OEMs. Our teams are proficient in CATIA, SolidWorks, Creo, ANSYS, and AutoCAD, and have supported CAD legacy migration programs from 2D to full 3D parametric models. Every engagement is run by a senior lead with domain experience in your specific industry standard.",
      capabilities: ["New product design", "Sustaining engineering", "FEA & GD&T", "Reverse engineering", "Class A surface building", "CATIA / SolidWorks / Creo / ANSYS", "CAD legacy migration", "Onsite & offshore delivery", "Drafting & 3D modeling"],
      image: "/assets/service-engineering.jpg",
    },
    {
      id: "talent",
      title: "Talent Acquisition",
      tagline: "Right resources, desired timelines.",
      desc: "Staff augmentation, lateral & campus hiring, and our Hire-Train-Deploy model. We reduce time-to-hire, improve quality, and reduce costs.",
      descFull: "We are a specialist contract staffing and staff augmentation firm — not a generalist recruiter. Our Hire-Train-Deploy model sources, trains, and deploys engineers on contract directly to your team, reducing time-to-hire while maintaining quality. We also manage the full secondment cycle including cross-geography payroll, compliance, and employer-of-record services across India, the USA, and the UAE. ISO 9001:2015 certified delivery ensures a predictable, audit-ready hiring process for regulated industries.",
      capabilities: ["Contract Staffing", "Hire-Train-Deploy", "Campus Hiring", "Staff augmentation", "Secondment model", "Payroll & EOR", "Cross-geography deployment", "ISO 9001:2015 process"],
      flagship: true,
      image: "/assets/service-talent.jpg",
    },
    {
      id: "software",
      title: "Software Services",
      tagline: "End-to-end product engineering.",
      desc: "Custom software development, mobile applications, BFSI platforms, retail systems, and healthcare solutions — built to your business needs.",
      descFull: "We build, modernize, and scale software products for enterprises across BFSI, retail, and healthcare — from core banking and insurance platforms to omnichannel retail systems and clinical applications. Our full-stack teams work in Java, Python, .NET, React, and Node.js, delivering everything from greenfield product development to rearchitecting aging monoliths into cloud-native services. We also provide QA, DevOps, and mobile application development, giving clients a single engineering partner across the entire software delivery chain.",
      capabilities: ["Product engineering & modernization", "Core banking & insurance platforms", "Java / Python / .NET / React", "Cloud & DevOps", "Mobile applications", "QA & testing", "Legacy system modernization"],
      image: "/assets/service-software.jpg",
    },
    {
      id: "manufacturing",
      title: "Manufacturing Solutions",
      tagline: "Quality engineered. Quality delivered.",
      desc: "Serving major OEMs with customized hiring models — assemblers, machine operators, FPGA engineers, quality engineers, maintenance technicians, and more.",
      descFull: "We supply contract-based skilled manpower to major OEMs and Tier-1 manufacturers — assemblers, CNC operators, FPGA engineers, validation engineers, quality engineers, and maintenance technicians. Our hiring process is ISO 9001:2015 certified, and we work to each client's specific skill matrix and safety framework, ensuring workers are production-ready on day one. We serve clients in automotive, pharma packaging, medical devices, and semiconductor manufacturing, with the ability to scale headcount up or down based on production cycles.",
      capabilities: ["CNC & assembly operators", "FPGA & validation engineers", "Quality & maintenance roles", "Pharma & medical devices", "Automotive OEM staffing", "ISO-certified hiring process", "Production-cycle scaling"],
      image: "/assets/service-manufacturing.png",
    },
  ],
  industries: [
    { id: "automotive", name: "Automotive", blurb: "Product design, ECU firmware, ADAS systems.", image: "/assets/industry-automotive.png" },
    { id: "aerospace", name: "Aerospace", blurb: "Avionics, systems engineering, certification.", image: "/assets/industry-aerospace.jpg" },
    { id: "locomotive", name: "Locomotive", blurb: "Rolling stock, signaling, PTC systems.", image: "/assets/industry-locomotive.jpg" },
    { id: "oilgas", name: "Oil & Gas", blurb: "Downhole tools, well completion, production optimization.", image: "/assets/industry-oilgas.jpg" },
    { id: "bfsi", name: "Banking, Finance & Insurance", blurb: "Core modernization, platforms, digital banking.", image: "/assets/industry-bfsi.jpg" },
    { id: "retail", name: "Retail", blurb: "Omnichannel, supply chain, personalization.", image: "/assets/industry-retail.jpg" },
    { id: "govt", name: "Government & Public Sector", blurb: "Citizen services, digital identity, GovCloud.", image: "/assets/industry-govt.jpg" },
  ],
  clients: [
    { name: "WIPRO", logo: "/logos/wipro.svg" },
    { name: "MPHASIS", logo: "/logos/mphasis.png" },
    { name: "TATA MOTORS", logo: "/logos/tata-motors.png" },
    { name: "ASHOK LEYLAND", logo: "/logos/ashok-leyland.png" },
    { name: "LMT", logo: "/logos/lt.png" },
    { name: "INFOSYS", logo: "/logos/infosys.png" },
    { name: "ICICI BANK", logo: "/logos/icici-bank.png" },
    { name: "ANZ", logo: "/logos/anz.png" },
    { name: "HALLIBURTON", logo: "/logos/halliburton.png" },
    { name: "AB INBEV", logo: "/logos/ab-inbev.png" },
  ],
  team: [
    {
      name: "P. L. Somashekar",
      role: "President",
      photo: "/assets/president.png",
      bio: "29 years of experience in product development and engineering services across automotive and oil & gas. Built UFT from the ground up into a leading service provider. Former leadership roles at Kinetic Engineering, LML Vespa, and Tata Group. B.E. Mechanical (Bangalore University), MMS Finance (Pune University).",
      socials: { linkedin: "https://www.linkedin.com/in/somashekar-pl-398b556/" },
    },
    {
      name: "N. S. Natesh",
      role: "Chief Executive Officer",
      photo: "/assets/ceo.png",
      photoPosition: "center 20%",
      bio: "CEO & Director at UnitForce Technologies with 23+ years of leadership in digital transformation, operational excellence, and global delivery management. Former COO with deep expertise across technology, corporate affairs, and strategic growth. Active NASSCOM Regional Council Member and executive alumnus of IIM Bangalore.",
      socials: { linkedin: "https://www.linkedin.com/in/nateshns" },
    },
    {
      name: "Gayathri Murthy",
      role: "Global - Business Head",
      photo: "/assets/team-gayathri.jpg",
      photoPosition: "65% 35%",
      photoScale: 1.8,
      bio: "Global Business Head with 19+ years' experience in HR, Talent Acquisition, Business Development, and Client Relations. Currently leading global operations at UnitForce Technologies, driving account mining and workforce management. Proven success scaling recruitment teams, driving growth, and optimizing talent delivery.",
      socials: { linkedin: "https://www.linkedin.com/in/gayathri-murthy-43b03411/" },
    },
    {
      name: "Chitkala Raghunath",
      role: "Sr. Delivery Manager",
      photo: "/assets/team-chitkala.jpg",
      bio: "Sr. Delivery Manager & Talent Acquisition Expert with 17+ years of experience leading end-to-end recruitment delivery and stakeholder management. Built robust client relationships and sourcing frameworks at UnitForce Technologies Consulting Pvt Ltd, managing accounts across technical and consulting domains. Holds an MSc in IT.",
      socials: { linkedin: "https://www.linkedin.com/in/chitkala-raghunath-40698411/" },
    },
    {
      name: "Nanditha D N",
      role: "Operations Manager",
      photo: "/assets/team-nanditha.jpg",
      photoPosition: "center 15%",
      photoScale: 1.5,
      bio: "Operations Manager with 13+ years across financial controllership, strategic growth, and P&L optimization. Former Head of Finance & Controlling at Unitforce Technologies managing global cluster operations across India, UAE, and the USA. MBA in Finance.",
      socials: { linkedin: "https://www.linkedin.com/in/nanditha-natesh-b72434175/" },
    },
    {
      name: "Pavithra H.D",
      role: "Account Manager",
      photo: "/assets/team-pavithra.jpg",
      bio: "Account Manager with 15+ years of experience in recruitment and talent acquisition across APAC, Middle East, and Southeast Asia regions. Holds a BE and MBA background with strong expertise in managing end-to-end recruitment operations, client relationship management, and regional stakeholder coordination across diverse international markets.",
      socials: { linkedin: "https://www.linkedin.com/in/pavithra-hd-ba419150" },
    },
    {
      name: "Sujita K",
      role: "HR Head",
      photo: "/assets/team-sujita.jpg",
      bio: "HR Head with 17+ years across talent acquisition, core human resource operations, and framework development. Built end-to-end workforce strategies across IT services and consulting sectors including TAMS InfoTech and Suchir Consulting. MBA in Marketing & HR.",
      socials: { linkedin: "https://www.linkedin.com/in/sujitakemdeo/" },
    },
    {
      name: "Prasanna K",
      role: "Manager - Finance & Accounts",
      photo: "/assets/team-prasanna.jpg",
      photoPosition: "60% 46%",
      photoScale: 1.8,
      bio: "Finance & Accounts professional with 12+ years of experience in accounting, taxation, compliance, MIS reporting, audits, and financial operations. Currently working as Manager – Finance & Accounts at UFTC with expertise in GST, TDS, budgeting, reconciliations, and financial reporting.",
      socials: { linkedin: "https://www.linkedin.com/in/prasanna-kumar-9246339a" },
    },
    {
      name: "Balaji B S",
      role: "Team Lead",
      photo: "[insert image]",
      bio: "Team Lead & Mechanical Engineer with extensive experience in design, project coordination, and technical problem-solving. Directed engineering development programs for major global clients across the USA, UK, Europe, and India. B.E. in Mechanical Engineering.",
      socials: { linkedin: "https://www.linkedin.com/in/balaji-b-s-26b140171/" },
    },
  ],
  locations: [
    {
      city: "Bengaluru",
      region: "India — Global Head Office",
      address: '"White House", No 7, 3rd Floor, 17th Cross Road, Behind Maruthi Mandir, Vijayanagar, Bengaluru - 560040',
      tz: "GMT+5:30",
      entity: "Unitforce Technologies Consulting Pvt. Ltd.",
      photo: "/assets/Bengaluru.png",
    },
    {
      city: "Mumbai",
      region: "India — Mumbai",
      address: "106, Ujagar Chambers, Deonar, Chembur East, Mumbai - 400088",
      tz: "GMT+5:30",
      entity: "Unitforce Technologies Consulting Pvt. Ltd.",
      photo: "/assets/mumbai.png",
    },
    {
      city: "Charlotte",
      region: "USA",
      address: "1002, Carmel Drive, Gastonia, Charlotte, North Carolina - 28056",
      tz: "GMT-5",
      entity: "Unitforce Technologies LLC",
      photo: "/assets/Usa.png",
    },
    {
      city: "Dubai",
      region: "UAE — Dubai",
      address: "1309, 13th Floor, Creative Tower, Fujairah Creative City Free zone, Fujairah, UAE. PO Box - 4422",
      tz: "GMT+4",
      entity: "Unitforce Technologies FZ LLC",
      photo: "/assets/Dubai.png",
    },
  ],
  stats: [
    { kpi: "400+", label: "Global employees" },
    { kpi: "4.5M+", label: "Man-hours delivered" },
    { kpi: "", label: "Avg. client relationship", dynamicKey: "client_years" as const },
    { kpi: "", label: "In operation since 2003", dynamicKey: "ops_years" as const },
  ],
  contact: {
    phones: ["+91 8951390893", "+91 8951003881"],
    email: "info@uftech.in",
    salesContact: { name: "Gayathri S Murthy", phone: "+91-9741032333", email: "gayathri@uftech.com" },
    socials: {
      linkedin: "https://www.linkedin.com/company/uftjobs/",
      twitter: "https://x.com/uftec",
      facebook: "https://www.facebook.com/uftjobs",
    },
  },
  certifications: ["ISO 9001:2015"],
  whyUs: [
    { t: "Reliable & Trusted", d: "Over 20 years of experience providing excellent service and building strong relationships." },
    { t: "Cost-effective Pricing", d: "Competitive pricing that offers great value without sacrificing quality." },
    { t: "Customized Solutions", d: "We tailor services and products to meet your unique needs and specifications." },
    { t: "Mature Delivery", d: "ISO 9001:2015 certified with a predictable, mature delivery process." },
  ],
};
