import Link from "next/link";
import Image from "next/image";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";

function Logo() {
  return (
    <Link href="/" className="nav-logo">
      <Image
        src="/assets/uft-logo.png"
        alt="UFT"
        className="nav-logo-img logo-light"
        width={120}
        height={36}
        style={{ width: "auto" }}
      />
      <Image
        src="/assets/uft-logo-dark.png"
        alt="UFT"
        className="nav-logo-img logo-dark"
        width={120}
        height={36}
        style={{ width: "auto" }}
      />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-row">
              <Logo />
              <p className="footer-tagline" style={{ marginTop: 16, color: "var(--fg-muted)", fontSize: 14, maxWidth: 280 }}>
                Inspired Innovations — software, engineering, and talent for global enterprises since 2003.
              </p>
            </div>
            <div className="footer-socials" style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <a href={UFT_DATA.contact.socials.linkedin} className="social-btn" target="_blank" rel="noreferrer">
                <Icon.LinkedIn />
              </a>
              <a href={UFT_DATA.contact.socials.twitter} className="social-btn" target="_blank" rel="noreferrer">
                <Icon.Twitter />
              </a>
              <a href={UFT_DATA.contact.socials.facebook} className="social-btn" target="_blank" rel="noreferrer">
                <Icon.Facebook />
              </a>
            </div>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              {UFT_DATA.services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Industries</h5>
            <ul>
              {UFT_DATA.industries.slice(0, 5).map((ind) => (
                <li key={ind.id}>
                  <Link href={`/#industries-section`}>{ind.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/contact">Locations</Link></li>
            </ul>
          </div>
          <div>
            <h5>Get in touch</h5>
            <ul>
              <li>
                <a href={`mailto:${UFT_DATA.contact.email}`}>{UFT_DATA.contact.email}</a>
              </li>
              {UFT_DATA.contact.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span style={{ color: "var(--accent)" }}>© 2026 UNITFORCE TECHNOLOGIES · ALL RIGHTS RESERVED</span>
          <span style={{ color: "var(--accent)" }}>BRIDGING BUSINESS &amp; TECHNOLOGY</span>
        </div>
      </div>
    </footer>
  );
}
