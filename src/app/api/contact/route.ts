import { NextResponse } from "next/server";
import { Resend } from "resend";
import { services } from "@/lib/services";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL || "info@arcontractglazing.com";
const FROM = process.env.CONTACT_FROM_EMAIL || "ARCG Website <onboarding@resend.dev>";

const SERVICE_SLUGS = new Set(services.map((s) => s.slug));
const SERVICE_TITLE = new Map(services.map((s) => [s.slug, s.title]));

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

/** Accept a string-or-absent field; reject non-strings; trim and cap length. */
function str(v: unknown, max: number): string | null {
  if (v == null) return "";
  if (typeof v !== "string") return null;
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured.");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    // Honeypot — silently accept and drop.
    if (body.website) return NextResponse.json({ ok: true });

    const type = body.type === "bid" || body.type === "application" ? body.type : "general";
    const name = str(body.name, 200);
    const company = str(body.company, 200);
    const email = str(body.email, 320);
    const phone = str(body.phone, 200);
    const message = str(body.message, 5000);
    const projectName = str(body.projectName, 300);
    const delivery = str(body.delivery, 200);
    const bidDate = str(body.bidDate, 40);
    const plansUrl = str(body.plansUrl, 2000);
    const projectType = str(body.projectType, 200); // legacy field, still accepted
    const position = str(body.position, 200);
    const experience = str(body.experience, 40);
    const scopeRaw: unknown[] = Array.isArray(body.scope) ? body.scope : [];
    const scope: string[] = scopeRaw.filter((s): s is string => typeof s === "string" && SERVICE_SLUGS.has(s));

    // Any non-string field is a malformed/abusive payload.
    if ([name, company, email, phone, message, projectName, delivery, bidDate, plansUrl, projectType, position, experience].some((v) => v === null)) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }
    if (!name) return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }
    if (type !== "application" && !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (type === "bid" && !projectName) {
      return NextResponse.json({ error: "Project name is required for a bid request." }, { status: 400 });
    }
    if (plansUrl && !/^https?:\/\//i.test(plansUrl)) {
      return NextResponse.json({ error: "Plans link must start with http:// or https://." }, { status: 400 });
    }

    const subject =
      type === "bid"
        ? `Bid request — ${projectName} — ${company || name}${bidDate ? ` (due ${bidDate})` : ""}`
        : type === "application"
          ? `Application — ${position || "General"} — ${name}`
          : `New website inquiry — ${name}${company ? ` (${company})` : ""}`;

    const rows: [string, string][] = [
      ["Type", type === "bid" ? "Bid request" : type === "application" ? "Job application" : "General inquiry"],
      ["Name", name],
      ["Email", email],
      ["Company", company],
      ["Phone", phone],
      ["Project", projectName],
      ["Scope", scope.map((s) => SERVICE_TITLE.get(s)).join(", ")],
      ["Delivery", delivery],
      ["Bid due", bidDate],
      ["Position", position],
      ["Experience", experience],
      ["Project type", projectType],
    ].filter(([, v]) => v) as [string, string][];

    const htmlRows = rows
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5b6b7d;vertical-align:top"><strong>${escape(k)}</strong></td><td style="padding:4px 0">${escape(v)}</td></tr>`)
      .join("");
    const plansRow = plansUrl
      ? `<tr><td style="padding:4px 12px 4px 0;color:#5b6b7d"><strong>Plans</strong></td><td style="padding:4px 0"><a href="${escape(plansUrl)}">${escape(plansUrl)}</a></td></tr>`
      : "";
    const html = `
      <h2>New ${type} from arcontractglazing.com</h2>
      <table style="border-collapse:collapse;font-family:system-ui,sans-serif">${htmlRows}${plansRow}</table>
      ${message ? `<p style="margin-top:16px"><strong>Message:</strong></p><p style="white-space:pre-wrap">${escape(message)}</p>` : ""}
    `;
    const text = [
      ...rows.map(([k, v]) => `${k}: ${v}`),
      plansUrl ? `Plans: ${plansUrl}` : "",
      message ? `\nMessage:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const result = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email || undefined,
      subject,
      html,
      text,
    });

    if (result.error) {
      // Log the sanitized payload so a failed send is recoverable from Vercel logs.
      console.error("Contact submission failed (Resend error) — recover from logs:", result.error, JSON.stringify({ type, name, email, company, phone, projectName, scope, message }));
      return NextResponse.json({ error: "Send failed." }, { status: 500 });
    }

    // Best-effort acknowledgment to the submitter. Only when a verified-domain
    // sender is configured (the default onboarding@ sender can't deliver to
    // arbitrary addresses). Fixed body — never echo user content (spam-relay
    // guard). Never blocks or fails the response.
    if (process.env.CONTACT_FROM_EMAIL && email && type !== "application") {
      const ackBody =
        "Thanks for reaching out to AR Contract Glazing. Your message is in our inbox and a real person reads it. We'll get back to you within one business day. If it's urgent, call (213) 293-7298.\n\nAR Contract Glazing\n726 S Santa Fe #400, Los Angeles, CA 90021\nCA Lic C17-621340";
      resend.emails
        .send({ from: FROM, to: [email], subject: "We got your message — AR Contract Glazing", text: ackBody })
        .catch((e) => console.error("Acknowledgment email failed (non-blocking):", e));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
