import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, company, topic, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: email,
      subject: `Contact: ${topic} — ${name}${company ? ` (${company})` : ""}`,
      html: `
        <table style="font-family:sans-serif;font-size:15px;color:#222;border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:32px 32px 0">
            <h2 style="margin:0 0 24px;font-size:20px;font-weight:700">New contact form submission</h2>
          </td></tr>
          <tr><td style="padding:0 32px">
            <table style="width:100%;border-top:1px solid #e0e0e0">
              <tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;width:120px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.06em">Name</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e0e0e0;font-weight:600">${escHtml(name)}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.06em">Email</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e0e0e0"><a href="mailto:${escHtml(email)}" style="color:#1a73e8">${escHtml(email)}</a></td></tr>
              ${company ? `<tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.06em">Company</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e0e0e0">${escHtml(company)}</td></tr>` : ""}
              <tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.06em">Topic</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e0e0e0">${escHtml(topic)}</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:24px 32px 32px">
            <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.06em">Message</p>
            <p style="margin:0;line-height:1.7;white-space:pre-wrap">${escHtml(message)}</p>
          </td></tr>
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

function escHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
