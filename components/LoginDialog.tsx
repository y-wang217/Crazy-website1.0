"use client";

import { useEffect, useRef, useState } from "react";
import { requestLoginLink, type LoginRequestResult } from "@/lib/auth";
import { CONTACT } from "@/content/site";

// Anything on the page can open the popup with: window.dispatchEvent(new Event(OPEN_LOGIN_EVENT))
export const OPEN_LOGIN_EVENT = "ap:open-login";

type Status = "idle" | "sending" | LoginRequestResult["status"];

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.9-3.6 3.7-5.6 7-5.6s6.1 2 7 5.6" />
    </svg>
  );
}

/** Header "Log in" button plus the login popup it opens (bottom sheet on phones). */
export default function LoginDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const open = () => {
    setStatus("idle");
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    window.addEventListener(OPEN_LOGIN_EVENT, open);
    return () => window.removeEventListener(OPEN_LOGIN_EVENT, open);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setStatus("sending");
    try {
      const result = await requestLoginLink(email);
      setStatus(result.status);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label="Student and parent log in"
        title="Student and parent log in"
        className="btn h-[42px] w-[42px] border-[1.5px] border-blue-deep/30 bg-white/70 text-[14.5px] text-blue-deep hover:border-blue-deep/60 hover:bg-white sm:w-auto sm:gap-2 sm:px-4"
      >
        <UserIcon />
        <span className="hidden sm:inline">Log in</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="login-title"
        onClick={(e) => e.target === dialogRef.current && close()}
        // Nothing typed is kept: the form is cleared every time the popup closes.
        onClose={() => formRef.current?.reset()}
        className="login-dialog fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none rounded-t-[28px] bg-white p-0 text-ink shadow-[0_-20px_60px_-30px_rgba(30,42,68,0.45)] backdrop:bg-ink/25 backdrop:backdrop-blur-[2px] sm:inset-x-auto sm:bottom-auto sm:right-[max(24px,calc((100vw-1200px)/2+32px))] sm:top-[80px] sm:w-[380px] sm:rounded-[24px] sm:shadow-[0_30px_70px_-30px_rgba(30,42,68,0.5)]"
      >
        <div className="px-6 pb-8 pt-3 sm:p-7">
          {/* Grab handle on the phone bottom sheet */}
          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-sky-200 sm:hidden" aria-hidden="true" />

          <div className="flex items-start justify-between gap-4">
            <h2 id="login-title" className="font-display text-[26px] font-extrabold leading-tight">
              Welcome back!
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mr-2 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sky-50 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            Enter your email to access your AP Academy learning dashboard.
          </p>

          <form ref={formRef} onSubmit={onSubmit} className="mt-6">
            <label htmlFor="login-email" className="text-[14px] font-semibold text-ink">
              Email address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              autoFocus
              disabled={status === "sending"}
              className="mt-1.5 w-full rounded-2xl border border-line bg-paper/60 px-4 py-3 text-[16px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-faint focus:border-blue focus:bg-white focus:shadow-[0_0_0_4px_rgba(70,101,158,0.18)]"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-warm mt-4 w-full px-6 py-3.5 text-[16px] disabled:opacity-60"
            >
              {status === "sending" ? "Checking…" : "Continue with Email"}
            </button>
          </form>

          <div aria-live="polite">
            {status === "not_connected" && (
              <div className="mt-4 rounded-2xl bg-butter-50 px-4 py-3.5 text-[14.5px] leading-snug text-ink ring-1 ring-butter/60">
                <p className="font-semibold">Student portal login is being updated. Please check back soon.</p>
                <p className="mt-1 text-ink-soft">
                  Need something now? Call or text{" "}
                  <a href={CONTACT.phoneHref} className="whitespace-nowrap font-semibold text-blue-deep underline-offset-4 hover:underline">
                    {CONTACT.phone}
                  </a>
                  .
                </p>
              </div>
            )}
            {status === "sent" && (
              <p className="mt-4 rounded-2xl bg-sky-50 px-4 py-3.5 text-[14.5px] leading-snug text-ink ring-1 ring-sky-200">
                Check your inbox. If this email belongs to an enrolled student or parent, a secure sign-in link is on
                its way.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 rounded-2xl bg-peach-50 px-4 py-3.5 text-[14.5px] leading-snug text-ink ring-1 ring-peach/50">
                Something went wrong. Please try again in a moment.
              </p>
            )}
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-[13px] text-ink-faint">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
              <path d="M8 10.5V8a4 4 0 018 0v2.5" />
            </svg>
            For enrolled students and parents
          </p>
        </div>
      </dialog>
    </>
  );
}
