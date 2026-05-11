// ===== UFT site data — sourced from Corporate Deck 2026 =====

export interface Service {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  capabilities: string[];
  flagship?: boolean;
}

export interface Industry {
  id: string;
  name: string;
  blurb: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
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
}

export interface Stat {
  kpi: string;
  label: string;
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
  clients: string[];
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
  founded: 2005,
  hq: "Bengaluru, India",
  employees: "160+",
  services: [
    {
      id: "software",
      title: "Software Services",
      tagline: "End-to-end product engineering.",
      desc: "Custom software development, mobile applications, BFSI platforms, retail systems, and healthcare solutions — built to your business needs.",
      capabilities: ["Custom development", "Mobile apps", "BFSI platforms", "Retail & healthcare", "Cloud & DevOps"],
      flagship: true,
    },
    {
      id: "engineering",
      title: "Engineering Services",
      tagline: "3.74M+ man-hours delivered onsite & offshore.",
      desc: "Product design, sustaining engineering, drafting & modeling, FEA, GD&T, and new product development across oil & gas, automotive, aerospace, and locomotive.",
      capabilities: ["New product design", "Sustaining engineering", "FEA & GD&T", "Drafting & modeling", "Legacy conversion"],
    },
    {
      id: "talent",
      title: "Talent Acquisition",
      tagline: "Right resources, desired timelines.",
      desc: "Staff augmentation, lateral & campus hiring, and our Hire-Train-Deploy model. We reduce time-to-hire, improve quality, and cut costs.",
      capabilities: ["Staff augmentation", "Lateral hiring", "Campus hiring", "Hire-Train-Deploy", "Contract staffing"],
    },
    {
      id: "manufacturing",
      title: "Manufacturing Solutions",
      tagline: "Quality engineered. Quality delivered.",
      desc: "Serving major OEMs with customized hiring models — assemblers, machine operators, FPGA engineers, quality engineers, maintenance technicians, and more.",
      capabilities: ["Industrial staffing", "Skilled technicians", "Engineering roles", "Quality assurance", "Packaging & biomedical"],
    },
    {
      id: "ai",
      title: "AI Services",
      tagline: "Build the future with AI strategies.",
      desc: "Applied AI and ML solutions that make your business faster, stronger, and more effective — from analytics to computer vision to intelligent automation.",
      capabilities: ["AI & ML solutions", "Data analytics", "Computer vision", "Intelligent automation", "AI governance"],
    },
  ],
  industries: [
    { id: "automotive", name: "Automotive", blurb: "Product design, ECU firmware, ADAS systems." },
    { id: "aerospace", name: "Aerospace", blurb: "Avionics, systems engineering, certification." },
    { id: "locomotive", name: "Locomotive", blurb: "Rolling stock, signaling, PTC systems." },
    { id: "oilgas", name: "Oil & Gas", blurb: "Downhole tools, well completion, production optimization." },
    { id: "bfsi", name: "Banking, Finance & Insurance", blurb: "Core modernization, platforms, digital banking." },
    { id: "retail", name: "Retail", blurb: "Omnichannel, supply chain, personalization." },
    { id: "govt", name: "Government & Public Sector", blurb: "Citizen services, digital identity, GovCloud." },
  ],
  clients: [
    "WIPRO", "MPHASIS", "TATA MOTORS", "ASHOK LEYLAND", "L&T",
    "INFOSYS", "ICICI BANK", "ANZ", "HALLIBURTON", "AB INBEV",
  ],
  team: [
    {
      name: "P. L. Somashekar",
      role: "President",
      photo: "/assets/president.png",
      bio: "29 years of experience in product development and engineering services across automotive and oil & gas. Built UFT from the ground up into a leading service provider. Former leadership roles at Kinetic Engineering, LML Vespa, and Tata Group. B.E. Mechanical (Bangalore University), MMS Finance (Pune University).",
      socials: { linkedin: "#" },
    },
    {
      name: "N. S. Natesh",
      role: "Chief Executive Officer",
      photo: "/assets/ceo.png",
      bio: "CEO & Founder with 16+ years across sales, business development, and channel management. NASSCOM National SME Council Member. Built UFT's AI/ML, software product, and IT infrastructure verticals across India, USA, and UAE. MCA from Malnad College of Engineering.",
      socials: { linkedin: "#" },
    },
  ],
  locations: [
    {
      city: "Bengaluru",
      region: "India — Global HQ",
      address: '"White House", No 7, 3rd Floor, 17th Cross Road, Behind Maruthi Mandir, Vijayanagar, Bengaluru-560040',
      tz: "GMT+5:30",
      entity: "Unitforce Technologies Consulting Pvt. Ltd.",
    },
    {
      city: "Charlotte",
      region: "USA",
      address: "1002, Carmel Drive, Gastonia, North Carolina, USA-28056",
      tz: "GMT-5",
      entity: "Unitforce Technologies LLC",
    },
    {
      city: "Fujairah",
      region: "UAE",
      address: "1309, 13th Floor, Creative Tower, Fujairah Creative City Free zone, PO Box-4422",
      tz: "GMT+4",
      entity: "Unitforce Technologies FZ LLC",
    },
  ],
  stats: [
    { kpi: "160+", label: "Global employees" },
    { kpi: "3.74M", label: "Man-hours delivered" },
    { kpi: "20yr+", label: "Avg. client relationship" },
    { kpi: "19yr", label: "In operation since 2005" },
  ],
  contact: {
    phones: ["+91 8951390893", "+91 9743110259"],
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
    { t: "Reliable & trusted", d: "Over 20 years of experience providing excellent service and building strong relationships." },
    { t: "Cost-effective pricing", d: "Competitive pricing that offers great value without sacrificing quality." },
    { t: "Customized solutions", d: "We tailor services and products to meet your unique needs and specifications." },
    { t: "Mature delivery", d: "ISO 9001:2015 certified with a predictable, mature delivery process." },
  ],
};
