"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

const EXPERIENCE = ["0–2 years", "3–5 years", "6–10 years", "10+ years"];

const FIELD =
  "w-full border border-white/20 bg-transparent text-white placeholder-white/40 px-4 py-3.5 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy";
const LABEL = "block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2";

/**
 * Dark-surface job application form (lives inside the navy careers Section). A
 * lightweight companion to the mailto links — covers desktop browsers with no
 * mail client. No file upload / ATS: the reply asks for a resume if the role
 * needs one. Posts to the shared /api/contact route as type "application".
 */
export default function ApplyForm({ positions }: { positions: string[] }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      type: "application",
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      position: fd.get("position"),
      experience: fd.get("experience"),
      message: fd.get("message"),
      website: fd.get("website"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "That didn't send. Call or text (213) 293-7298 instead.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't send. Call or text (213) 293-7298 instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border border-white/20 p-10 text-center max-w-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <div className="w-16 h-px bg-accent mx-auto mb-6" />
        <h3 className="font-bebas text-h3 text-white mb-3">Got It</h3>
        <p className="text-white/70">We&apos;ll call you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl" aria-busy={submitting || undefined}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="apply-name" className={LABEL}>Name *</label>
          <input id="apply-name" name="name" type="text" required autoComplete="name" className={FIELD} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="apply-phone" className={LABEL}>Phone *</label>
          <input id="apply-phone" name="phone" type="tel" required autoComplete="tel" className={FIELD} placeholder="(555) 000-0000" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="apply-email" className={LABEL}>Email</label>
          <input id="apply-email" name="email" type="email" autoComplete="email" className={FIELD} placeholder="email@example.com" />
        </div>
        <div>
          <label htmlFor="apply-position" className={LABEL}>Position</label>
          <select id="apply-position" name="position" className={FIELD} defaultValue="">
            <option value="" className="text-navy">Select a role</option>
            {positions.map((p) => (
              <option key={p} value={p} className="text-navy">{p}</option>
            ))}
            <option value="Other" className="text-navy">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="apply-experience" className={LABEL}>Years of Experience</label>
        <select id="apply-experience" name="experience" className={FIELD} defaultValue="">
          <option value="" className="text-navy">Select</option>
          {EXPERIENCE.map((x) => (
            <option key={x} value={x} className="text-navy">{x}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="apply-message" className={LABEL}>Message</label>
        <textarea id="apply-message" name="message" rows={4} className={`${FIELD} resize-none`} placeholder="Anything we should know." />
      </div>

      <p role="alert" aria-live="polite" className="text-sm text-red-300 empty:hidden">{error}</p>

      <Button type="submit" variant="white" loading={submitting}>
        {submitting ? "Sending..." : "Send Application"}
      </Button>
    </form>
  );
}
