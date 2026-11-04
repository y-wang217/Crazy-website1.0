"use client";

import { useEffect, useId, useState } from "react";
import { BOOKING_ENDPOINT, CONTACT } from "@/content/site";
import { Sparkle, Squiggle } from "./Doodles";

type Kind = "trial" | "consult";
type Channel = "phone" | "sms" | "email";

const KINDS: { id: Kind; anchor: string; title: string; who: string; body: string }[] = [
  {
    id: "trial",
    anchor: "book-trial",
    title: "Free trial lesson",
    who: "For the student",
    body: "A real lesson with a tutor on what's coming up in class. We find the weak spots and teach one concept from the next test.",
  },
  {
    id: "consult",
    anchor: "book-consult",
    title: "Free consultation call",
    who: "For parents",
    body: "30 minutes with Mr. Charlie. Talk through marks, goals and whether AP Academy is a good fit. Your student doesn't need to be there.",
  },
];

const CHANNELS: { id: Channel; label: string }[] = [
  { id: "phone", label: "Phone call" },
  { id: "sms", label: "Text (SMS)" },
  { id: "email", label: "Email" },
];

const SUBJECTS = [
  "Advanced Functions (MHF4U)",
  "Calculus & Vectors (MCV4U)",
  "Physics (SPH3U / SPH4U)",
  "Functions (MCR3U)",
  "Chemistry (SCH3U / SCH4U)",
  "Biology (SBI3U / SBI4U)",
  "Other / not sure yet",
];

const field =
  "mt-1.5 w-full rounded-2xl border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-faint focus:border-blue focus:shadow-[0_0_0_4px_rgba(70,101,158,0.18)]";
const label = "text-[14px] font-semibold text-ink";

export default function Booking() {
  const [kind, setKind] = useState<Kind>("trial");
  const [channel, setChannel] = useState<Channel>("phone");
  const [status, setStatus] = useState<"idle" | "sending" | "sent-email" | "sent" | "error">("idle");
  const uid = useId();

  // "#book-consult" and "#book" / "#book-trial" links preselect the request type.
  useEffect(() => {
    const sync = () => {
      if (location.hash === "#book-consult") setKind("consult");
      else if (location.hash === "#book" || location.hash === "#book-trial") setKind("trial");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const needsPhone = channel !== "email";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const request = KINDS.find((k) => k.id === kind)!.title;
    const how = CHANNELS.find((c) => c.id === channel)!.label;
    const payload = { request, preferredContact: how, ...data };

    if (BOOKING_ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(BOOKING_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    const lines = [
      `Request: ${request}`,
      `Parent / guardian: ${data.parent || "-"}`,
      `Student: ${data.student || "-"}`,
      `Grade: ${data.grade || "-"}`,
      `Subject: ${data.subject || "-"}`,
      `Preferred contact: ${how}`,
      `Phone: ${data.phone || "-"}`,
      `Email: ${data.email || "-"}`,
      `Best times: ${data.times || "-"}`,
      "",
      data.notes || "",
    ];
    const subject = `${request}: ${data.student || data.parent || "new request"}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("sent-email");
  }

  return (
    <section id="book" className="px-2 pb-6 sm:px-4">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] bg-sky-100 px-4 py-14 sm:rounded-[56px] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="blob pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] bg-sky-200/70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Left: choose */}
          <div>
            <p data-reveal className="font-hand text-[26px] text-blue">let&apos;s get started</p>
            <h2
              data-reveal
              style={{ ["--delay" as string]: "80ms" } as React.CSSProperties}
              className="mt-1 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[52px]"
            >
              Try a lesson. It&apos;s on us.
            </h2>
            <p data-reveal className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">
              Pick what you&apos;d like to start with. Both are free, and there&apos;s nothing to commit to.
            </p>

            <fieldset data-reveal className="mt-8 space-y-4">
              <legend className="sr-only">What would you like to book?</legend>
              {KINDS.map((k) => {
                const on = kind === k.id;
                return (
                  <label
                    key={k.id}
                    id={k.anchor}
                    className={`block cursor-pointer rounded-[24px] border-2 p-5 transition-all duration-300 sm:rounded-[28px] sm:p-6 ${
                      on
                        ? "border-blue bg-white shadow-[0_20px_36px_-26px_rgba(52,80,127,0.55)]"
                        : "border-transparent bg-white/60 hover:bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${uid}-kind`}
                      value={k.id}
                      checked={on}
                      onChange={() => setKind(k.id)}
                      className="sr-only"
                    />
                    <span className="flex items-start gap-4">
                      <span
                        className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                          on ? "border-blue bg-blue" : "border-sky-300 bg-white"
                        }`}
                        aria-hidden="true"
                      >
                        <span className={`h-2 w-2 rounded-full bg-white transition-transform ${on ? "scale-100" : "scale-0"}`} />
                      </span>
                      <span>
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-display text-[22px] font-bold leading-tight">{k.title}</span>
                          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-[0.08em] text-blue">
                            {k.who}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[15px] leading-relaxed text-ink-soft">{k.body}</span>
                      </span>
                    </span>
                  </label>
                );
              })}
            </fieldset>

            <div data-reveal className="mt-8 rounded-[24px] bg-white/60 p-6 text-[15px] leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">Rather just reach out?</p>
              <p className="mt-1">
                Call or text <a href={CONTACT.phoneHref} className="font-semibold text-blue underline-offset-4 hover:underline">{CONTACT.phone}</a>
                {" "}or email{" "}
                <a href={`mailto:${CONTACT.email}`} className="font-semibold text-blue underline-offset-4 hover:underline">{CONTACT.email}</a>.
              </p>
            </div>
          </div>

          {/* Right: form (Viewed-style panel with doodles) */}
          <div className="relative">
          <Sparkle className="float absolute -left-5 -top-7 z-10 w-9 text-blue" style={{ ["--rot" as string]: "-12deg" }} />
          <Sparkle className="float absolute -right-3 top-1/3 z-10 hidden w-6 text-blue sm:block" style={{ animationDelay: "-3s" }} />
          <span className="absolute -right-2 -top-5 z-10 rotate-[5deg] rounded-full bg-blue px-4 py-2 text-[13px] font-bold text-white shadow-[0_12px_24px_-14px_rgba(52,80,127,0.7)]">
            Free · no commitment
          </span>
          <Squiggle className="absolute -bottom-6 left-10 z-10 w-28 rotate-[-6deg] text-blue" />
          <div data-reveal="scale" className="rounded-[36px] bg-white p-6 shadow-[0_30px_60px_-36px_rgba(30,42,68,0.45)] sm:p-9">
            {status === "sent" || status === "sent-email" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-sky-100 text-blue">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-[28px] font-extrabold">
                  {status === "sent" ? "Got it, thank you!" : "Almost there!"}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[16px] leading-relaxed text-ink-soft">
                  {status === "sent"
                    ? "We'll reach out the way you asked, usually within a day."
                    : "Your email app should have opened with your request filled in. Press send and we'll get back to you the way you asked."}
                </p>
                <p className="mt-4 text-[14.5px] text-ink-faint">
                  Nothing opened? Call or text {CONTACT.phone}.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-7 px-6 py-3 text-[15px]">
                  Back to the form
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-parent`} className={label}>Parent / guardian name</label>
                    <input id={`${uid}-parent`} name="parent" required autoComplete="name" className={field} />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-student`} className={label}>
                      Student name {kind === "consult" && <span className="font-normal text-ink-faint">(optional)</span>}
                    </label>
                    <input id={`${uid}-student`} name="student" required={kind === "trial"} className={field} />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-grade`} className={label}>Grade</label>
                    <select id={`${uid}-grade`} name="grade" required defaultValue="" className={field}>
                      <option value="" disabled>Choose…</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                      <option>Grade 10</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`${uid}-subject`} className={label}>Subject</label>
                    <select id={`${uid}-subject`} name="subject" required defaultValue="" className={field}>
                      <option value="" disabled>Choose…</option>
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <fieldset>
                  <legend className={label}>How should we reach you?</legend>
                  <div className="mt-2 grid grid-cols-3 gap-2 rounded-2xl bg-sky-50 p-1.5">
                    {CHANNELS.map((c) => {
                      const on = channel === c.id;
                      return (
                        <label
                          key={c.id}
                          className={`cursor-pointer rounded-xl px-2 py-2.5 text-center text-[14px] font-semibold transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blue ${
                            on ? "bg-white text-blue shadow-[0_6px_14px_-8px_rgba(30,42,68,0.4)]" : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value={c.id}
                            checked={on}
                            onChange={() => setChannel(c.id)}
                            className="sr-only"
                          />
                          {c.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-phone`} className={label}>
                      Phone {!needsPhone && <span className="font-normal text-ink-faint">(optional)</span>}
                    </label>
                    <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" required={needsPhone} className={field} />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-email`} className={label}>
                      Email {needsPhone && <span className="font-normal text-ink-faint">(optional)</span>}
                    </label>
                    <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required={!needsPhone} className={field} />
                  </div>
                </div>

                <div>
                  <label htmlFor={`${uid}-times`} className={label}>
                    Best days and times <span className="font-normal text-ink-faint">(optional)</span>
                  </label>
                  <input id={`${uid}-times`} name="times" placeholder="e.g. weekday evenings after 6" className={field} />
                </div>

                <div>
                  <label htmlFor={`${uid}-notes`} className={label}>
                    Anything we should know? <span className="font-normal text-ink-faint">(optional)</span>
                  </label>
                  <textarea
                    id={`${uid}-notes`}
                    name="notes"
                    rows={3}
                    placeholder="Next test date, current mark, goals…"
                    className={`${field} resize-y`}
                  />
                </div>

                <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full px-6 py-4 text-[16.5px] disabled:opacity-60">
                  {status === "sending"
                    ? "Sending…"
                    : kind === "trial"
                      ? "Request my free trial lesson"
                      : "Request a call with Mr. Charlie"}
                  <span className="arrow" aria-hidden="true">→</span>
                </button>

                {status === "error" && (
                  <p className="text-center text-[14px] font-semibold text-blue-deep" role="alert">
                    That didn&apos;t go through. Please call or text {CONTACT.phone}.
                  </p>
                )}

                {kind === "consult" && (
                  <p className="text-center text-[14.5px] text-ink-soft">
                    Prefer to pick a time yourself?{" "}
                    <a href={CONTACT.calendly} target="_blank" rel="noopener" className="font-semibold text-blue underline-offset-4 hover:underline">
                      Book directly on Calendly →
                    </a>
                  </p>
                )}
              </form>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
