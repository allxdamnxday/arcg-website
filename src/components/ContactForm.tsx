"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import Button from "@/components/Button";
import { services } from "@/lib/services";

const DELIVERY = ["Bid-build", "Design-assist", "Design-build", "Budget / ROM pricing"];

const PREFILL_MESSAGES: Record<string, string> = {
  prequal: "Please send your prequalification package.",
  references: "Please send project references and site photos.",
};

const FIELD =
  "w-full border border-glass px-4 py-3.5 text-base bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:border-accent-ink";
const LABEL = "block text-xs font-semibold uppercase tracking-wider text-silver-dark mb-2";

export default function ContactForm() {
  const params = useSearchParams();

  const [mode, setMode] = useState<"bid" | "general">(
    params.get("type") === "bid" ? "bid" : "general"
  );
  const [scope, setScope] = useState<string[]>(() => {
    const s = params.get("scope");
    return s && services.some((x) => x.slug === s) ? [s] : [];
  });
  const [message, setMessage] = useState(() => PREFILL_MESSAGES[params.get("prefill") ?? ""] ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const toggleScope = (slug: string) =>
    setScope((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      type: mode,
      name: fd.get("name"),
      company: fd.get("company"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      projectName: fd.get("projectName"),
      scope,
      delivery: fd.get("delivery"),
      bidDate: fd.get("bidDate"),
      plansUrl: fd.get("plansUrl"),
      message,
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
        throw new Error(
          data.error ||
            "Your message didn't send. Try again, or email info@arcontractglazing.com, or call (213) 293-7298."
        );
      }
      track("lead_submit", { type: mode, scope: scope.join(",") || "none" });
      setSubmitted(true);
    } catch (err) {
      track("lead_error");
      setError(
        err instanceof Error
          ? err.message
          : "Your message didn't send. Try again, or email info@arcontractglazing.com, or call (213) 293-7298."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="bg-warm border border-glass p-12 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink"
      >
        <div className="w-16 h-px bg-accent mx-auto mb-6" />
        <h3 className="font-bebas text-h3 text-navy mb-3">
          {mode === "bid" ? "Bid Request Received" : "Message Sent"}
        </h3>
        <p className="text-gray-600">
          {mode === "bid"
            ? "We'll confirm receipt within one business day. On a tight bid date? Call (213) 293-7298."
            : "We'll get back to you within one business day."}
        </p>
      </div>
    );
  }

  const isBid = mode === "bid";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={submitting || undefined}>
      {/* Honeypot — real users leave this blank */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* Mode toggle */}
      <div role="radiogroup" aria-label="What are you sending?" className="grid grid-cols-2 gap-3">
        {(["bid", "general"] as const).map((m) => {
          const selected = mode === m;
          return (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setMode(m)}
              className={`min-h-[44px] px-4 text-sm font-semibold uppercase tracking-wider border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 ${
                selected ? "bg-navy text-white border-navy" : "border-glass text-navy hover:border-navy"
              }`}
            >
              {m === "bid" ? "Bid Request" : "General Inquiry"}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={LABEL}>Name *</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="company" className={LABEL}>Company {isBid && "*"}</label>
          <input id="company" name="company" type="text" required={isBid} autoComplete="organization" className={FIELD} placeholder="Company name" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={LABEL}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="email@company.com" />
        </div>
        <div>
          <label htmlFor="phone" className={LABEL}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={FIELD} placeholder="(555) 000-0000" />
        </div>
      </div>

      {isBid && (
        <>
          <div>
            <label htmlFor="projectName" className={LABEL}>Project Name &amp; Location *</label>
            <input id="projectName" name="projectName" type="text" required className={FIELD} placeholder="e.g. 12-story mixed-use, downtown LA" />
          </div>

          <fieldset>
            <legend className={LABEL}>Scope Needed</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <label key={s.slug} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scope.includes(s.slug)}
                    onChange={() => toggleScope(s.slug)}
                    className="w-5 h-5 accent-[var(--color-accent-ink)]"
                  />
                  {s.title}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="delivery" className={LABEL}>Delivery</label>
              <select id="delivery" name="delivery" className={`${FIELD} text-gray-700`} defaultValue="">
                <option value="">Select delivery method</option>
                {DELIVERY.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bidDate" className={LABEL}>Bid Due Date</label>
              <input id="bidDate" name="bidDate" type="date" className={`${FIELD} text-gray-700`} />
            </div>
          </div>

          <div>
            <label htmlFor="plansUrl" className={LABEL}>Link to Plans / ITB</label>
            <input id="plansUrl" name="plansUrl" type="url" className={FIELD} placeholder="https://" />
            <p className="text-xs text-silver-dark mt-2">
              BuildingConnected, Procore, Dropbox — any link works. No link yet? Email plans to{" "}
              <a href="mailto:info@arcontractglazing.com" className="text-accent-ink link-underline">info@arcontractglazing.com</a> and reference this form.
            </p>
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className={LABEL}>Message {!isBid && "*"}</label>
        <textarea
          id="message"
          name="message"
          required={!isBid}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${FIELD} resize-none`}
          placeholder={isBid ? "Systems spec'd, schedule, scope notes." : "Scope, location, timeline, or just a question."}
        />
      </div>

      {/* Persistent status region so screen readers hear async errors */}
      <p id="form-error" role="alert" aria-live="polite" className="text-sm text-red-600 empty:hidden">
        {error}
      </p>

      <Button type="submit" loading={submitting} aria-describedby={error ? "form-error" : undefined}>
        {submitting ? "Sending..." : isBid ? "Send Bid Request" : "Send Message"}
      </Button>
    </form>
  );
}
