import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL || "info@arcontractglazing.com";
const FROM = process.env.CONTACT_FROM_EMAIL || "ARCG Website <onboarding@resend.dev>";

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured.");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const { name, email, company, phone, projectType, message, website } = await req.json();

    if (website) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const subject = `New website inquiry — ${name}${company ? ` (${company})` : ""}`;
    const html = `
      <h2>New inquiry from arcontractglazing.com</h2>
      <p><strong>Name:</strong> ${escape(name)}</p>
      <p><strong>Email:</strong> ${escape(email)}</p>
      ${company ? `<p><strong>Company:</strong> ${escape(company)}</p>` : ""}
      ${phone ? `<p><strong>Phone:</strong> ${escape(phone)}</p>` : ""}
      ${projectType ? `<p><strong>Project Type:</strong> ${escape(projectType)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escape(message)}</p>
    `;

    const result = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject,
      html,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: "Send failed." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
