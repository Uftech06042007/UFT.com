"use client";

import { useState } from "react";
import { UFT_DATA } from "@/lib/data";
import { Icon } from "@/components/icons";

interface ContactForm {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
}

const EMPTY_FORM: ContactForm = {
  name: "",
  email: "",
  company: "",
  topic: "Software Services",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm(EMPTY_FORM);
    }, 3000);
  };

  return (
    <main className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">[ Contact ]</span>
          <h1 className="page-title">
            Tell us what you&apos;re{" "}
            <span className="serif-italic">trying to build.</span>
          </h1>
          <p className="page-sub">
            A senior partner from the relevant practice will reply within one business day. No SDRs,
            no qualification calls — just the person who&apos;d actually run the work.
          </p>
        </div>
      </section>

      {/* Contact form + aside */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <form className="contact-form" onSubmit={submit}>
              <div className="field-row">
                <label className="field">
                  <span className="field-label mono">NAME</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jamie Chen"
                  />
                </label>
                <label className="field">
                  <span className="field-label mono">EMAIL</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jamie@company.com"
                  />
                </label>
              </div>
              <label className="field">
                <span className="field-label mono">COMPANY</span>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme Industries"
                />
              </label>
              <label className="field">
                <span className="field-label mono">WHAT CAN WE HELP WITH?</span>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                >
                  {UFT_DATA.services.map((s) => (
                    <option key={s.id}>{s.title}</option>
                  ))}
                  <option>General inquiry</option>
                  <option>Press / partnerships</option>
                </select>
              </label>
              <label className="field">
                <span className="field-label mono">TELL US MORE</span>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="A few sentences on the system, the team, or the problem…"
                />
              </label>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={sent}
                style={{ alignSelf: "flex-start" }}
              >
                {sent ? (
                  "Sent — we'll be in touch ✓"
                ) : (
                  <>
                    Send message <Icon.Arrow />
                  </>
                )}
              </button>
            </form>

            <aside className="contact-aside">
              <div className="contact-block">
                <h4 className="mono dim contact-block-title">DIRECT</h4>
                <a href={`mailto:${UFT_DATA.contact.email}`} className="contact-line">
                  <Icon.Email /> {UFT_DATA.contact.email}
                </a>
                {UFT_DATA.contact.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="contact-line">
                    <Icon.Phone /> {p}
                  </a>
                ))}
              </div>
              <div className="contact-block">
                <h4 className="mono dim contact-block-title">SOCIAL</h4>
                <a
                  href={UFT_DATA.contact.socials.linkedin}
                  className="contact-line"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon.LinkedIn /> /company/uftjobs
                </a>
                <a
                  href={UFT_DATA.contact.socials.twitter}
                  className="contact-line"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon.Twitter /> @uftec
                </a>
                <a
                  href={UFT_DATA.contact.socials.facebook}
                  className="contact-line"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon.Facebook /> /uftjobs
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">[ Locations ]</span>
            <h2 className="section-title">
              Four hubs, <span className="serif-italic">one delivery network.</span>
            </h2>
          </div>
          <div className="locations-grid">
            {UFT_DATA.locations.map((l) => (
              <div key={l.city} className="location-card">
                <div className="location-header">
                  <Icon.Pin />
                  <span
                    className="mono"
                    style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--fg-dim)" }}
                  >
                    {l.region}
                  </span>
                </div>
                <h3 style={{ fontSize: 28, marginTop: 8, marginBottom: 12 }} className="serif">
                  {l.city}
                </h3>
                <p className="muted" style={{ fontSize: 14, marginBottom: 8 }}>
                  {l.address}
                </p>
                <span className="mono dim" style={{ fontSize: 12 }}>
                  {l.tz}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
