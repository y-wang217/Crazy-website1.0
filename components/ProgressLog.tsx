"use client";

import { useRef, useState } from "react";
import {
  PREVIEW_STUDENT,
  PUBLIC_LESSON_LIMIT,
  SUBJECT_TABS,
  improvement,
  type SubjectKey,
} from "@/content/progress-public";
import { OPEN_LOGIN_EVENT } from "./LoginDialog";


const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;
const shortDate = (date: string) => date.replace(/, \d{4}$/, "");

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M8 3v4M16 3v4M3.5 10h17M8 14h2M8 17h2" />
    </svg>
  );
}

export default function ProgressLog() {
  const student = PREVIEW_STUDENT;
  const [active, setActive] = useState<SubjectKey>(student.records[0].subject);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const record = student.records.find((r) => r.subject === active)!;
  const entries = record.entries.slice(0, PUBLIC_LESSON_LIMIT);
  const change = improvement(record);
  const onlyScore = !change ? record.entries.find((e) => e.score !== null) : null;

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  return (
    <section id="progress" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Heading */}
      <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
        <div>
          <p data-reveal className="text-[13px] font-bold uppercase tracking-[0.16em] text-blue">Our learning system</p>
          <h2
            data-reveal
            style={d(80)}
            className="mt-2 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[52px]"
          >
            A clear record of{" "}
            <span className="relative inline-block">
              progress
              <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-peach sm:-bottom-1.5 sm:h-[6px]" aria-hidden="true" />
            </span>
            .
          </h2>
        </div>
        <p
          data-reveal
          style={d(160)}
          className="max-w-[44ch] text-[16px] leading-relaxed text-ink-soft sm:text-[17px] lg:border-l lg:border-line lg:pl-10"
        >
          Every lesson is logged by the tutor within 24 hours. Here&apos;s a public preview of one student&apos;s record,
          shown by initials only.
        </p>
      </div>

      {/* Record card */}
      <div
        data-reveal="scale"
        className="mt-8 rounded-[28px] bg-white p-5 shadow-[0_30px_60px_-44px_rgba(30,42,68,0.45)] ring-1 ring-line sm:mt-12 sm:rounded-[32px] sm:p-9"
      >
        {/* Student header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-sky-100 font-display text-[22px] font-extrabold text-blue-deep sm:h-[76px] sm:w-[76px] sm:text-[26px]">
              {student.initials}
            </span>
            <span className="h-12 w-px bg-line" aria-hidden="true" />
            <div>
              <h3 className="font-display text-[22px] font-bold leading-tight sm:text-[28px]">{record.title}</h3>
              <p className="mt-0.5 text-[14.5px] text-ink-soft sm:text-[16px]">
                Student progress log · {record.courseCode}
              </p>
            </div>
          </div>

          {change ? (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4" aria-label={`From ${change.first.score}% to ${change.latest.score}%, up ${change.points} points`}>
              <div className="text-center">
                <p className="rounded-2xl bg-sky-50 px-4 py-2.5 font-display text-[28px] font-extrabold leading-none text-ink sm:px-5 sm:py-3 sm:text-[36px]">
                  {change.first.score}%
                </p>
                <p className="mt-1.5 text-[12px] text-ink-faint">First test · {shortDate(change.first.date)}</p>
              </div>
              <svg viewBox="0 0 24 24" className="mb-5 h-6 w-6 text-peach" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
              <div className="text-center">
                <p className="rounded-2xl bg-peach-50 px-4 py-2.5 font-display text-[28px] font-extrabold leading-none text-peach-ink ring-1 ring-peach/40 sm:px-5 sm:py-3 sm:text-[36px]">
                  {change.latest.score}%
                </p>
                <p className="mt-1.5 text-[12px] text-ink-faint">Latest · {shortDate(change.latest.date)}</p>
              </div>
              {change.points > 0 && (
                <p className="mb-5 rounded-xl bg-butter px-3.5 py-2 text-[14px] font-bold text-ink sm:text-[15px]">
                  +{change.points} points
                </p>
              )}
            </div>
          ) : onlyScore ? (
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="rounded-2xl bg-sky-50 px-5 py-3 font-display text-[28px] font-extrabold leading-none sm:text-[36px]">
                  {onlyScore.score}%
                </p>
                <p className="mt-1.5 text-[12px] text-ink-faint">Logged test · {shortDate(onlyScore.date)}</p>
              </div>
              <p className="mb-5 max-w-[22ch] text-[13.5px] leading-snug text-ink-soft">
                One logged score so far, so no before-and-after yet.
              </p>
            </div>
          ) : null}
        </div>

        {/* Subject tabs */}
        <div role="tablist" aria-label="Subjects" className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4 sm:gap-3">
          {SUBJECT_TABS.map((tab) => {
            const has = student.records.some((r) => r.subject === tab.key);
            const on = tab.key === active;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="progress-log"
                disabled={!has}
                title={has ? undefined : "No records in this subject"}
                onClick={() => setActive(tab.key)}
                className={`rounded-2xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 sm:text-[16px] ${
                  on
                    ? "bg-blue-deep text-white shadow-[0_10px_20px_-14px_rgba(52,80,127,0.8)]"
                    : has
                      ? "bg-white text-ink ring-1 ring-line hover:bg-sky-50 hover:ring-sky-300"
                      : "cursor-not-allowed bg-paper text-ink-faint ring-1 ring-line/60"
                }`}
              >
                {tab.label}
                {!has && <span className="sr-only"> (no records)</span>}
              </button>
            );
          })}
        </div>

        {/* Recent lesson log */}
        <div id="progress-log" role="tabpanel" className="mt-6 rounded-[22px] ring-1 ring-line sm:mt-7">
          <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <CalendarIcon />
              <h4 className="whitespace-nowrap font-display text-[17px] font-bold sm:text-[22px]">Recent lesson log</h4>
            </div>
            <button
              type="button"
              onClick={openDialog}
              className="group flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-[14px] font-bold text-blue-deep transition-colors hover:bg-sky-50 sm:text-[15px]"
            >
              <span className="sm:hidden">View all</span>
              <span className="hidden sm:inline">View all lessons</span>
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </button>
          </div>

          <div className="hidden grid-cols-[140px_100px_100px_1fr] gap-4 bg-sky-50 px-6 py-3 text-[13.5px] font-semibold text-ink-soft md:grid">
            <span>Date</span>
            <span>Course</span>
            <span>Test score</span>
            <span>Approved summary</span>
          </div>

          <ul key={active}>
            {entries.map((e, i) => (
              <li
                key={e.date}
                className="row-in grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-line px-4 py-4 transition-colors hover:bg-sky-50/50 first:border-t-0 sm:px-6 md:grid-cols-[140px_100px_100px_1fr] md:items-center md:first:border-t"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-[14.5px] text-ink-soft md:text-[15px]">{e.date}</span>
                <span className="hidden text-[15px] font-semibold text-ink md:block">{e.course}</span>
                <span
                  className={`text-right font-display text-[18px] font-bold md:text-left ${
                    i === 0 ? "text-peach-ink" : "text-ink"
                  }`}
                >
                  {e.score !== null ? `${e.score}%` : "–"}
                </span>
                <span className="col-span-2 md:col-span-1">
                  {e.summary ? (
                    <span className="flex items-start gap-2.5 rounded-xl bg-peach-50 px-3.5 py-2.5 text-[14.5px] leading-snug text-ink">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-peach-ink" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M4 5h16v11H9l-5 4z" strokeLinejoin="round" />
                      </svg>
                      {e.summary}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-xl border border-dashed border-sky-300 px-3 py-1.5 text-[12.5px] text-ink-faint">
                      <span className="font-bold uppercase tracking-[0.08em] text-blue">Placeholder</span>
                      approved summary needed
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {student.latestNote && (
            <div className="border-t border-line px-4 py-4 sm:px-6 sm:py-5">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-ink-faint">
                Latest public note from the tutor · {student.latestNote.date}
              </p>
              <p className="mt-1.5 max-w-[80ch] text-[15px] leading-relaxed text-ink-soft">{student.latestNote.text}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 border-t border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <p className="flex items-center gap-2.5 text-[15px] sm:text-[17px]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4l9 4.5-9 4.5-9-4.5zM3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
              </svg>
              <span className="font-display font-bold">{student.lessonsLogged} lessons logged</span>
              <span className="text-ink-soft">· since {student.since}</span>
            </p>
            <p className="text-[13px] text-ink-faint">Scores read straight from the lesson log.</p>
          </div>
        </div>
      </div>

      {/* Enrolled-only message. Nothing private is loaded here or anywhere on this site. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="journey-title"
        onClick={(e) => e.target === dialogRef.current && closeDialog()}
        className="m-auto w-[min(92vw,520px)] rounded-[28px] bg-white p-0 text-ink shadow-[0_40px_80px_-30px_rgba(30,42,68,0.5)] backdrop:bg-ink/30 backdrop:backdrop-blur-sm"
      >
        <div className="p-7 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-blue" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
                <path d="M8 10.5V8a4 4 0 018 0v2.5" />
              </svg>
            </span>
            <button
              type="button"
              onClick={closeDialog}
              className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sky-50"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <h3 id="journey-title" className="mt-5 font-display text-[26px] font-extrabold leading-tight sm:text-[30px]">
            Want to see your full learning journey?
          </h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            Full lesson records are private. AP Academy students and their linked parents sign in to a private
            dashboard with grades, recent marks and the lesson schedule. Join AP Academy to unlock yours.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#book" onClick={closeDialog} className="btn btn-warm px-6 py-3.5 text-[15.5px]">
              Book a free trial <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#book-consult" onClick={closeDialog} className="btn btn-ghost px-6 py-3.5 text-[15.5px]">
              Join AP Academy
            </a>
          </div>
          <p className="mt-6 border-t border-line pt-5 text-[14px] text-ink-soft">
            Already a student or a linked parent?{" "}
            <button
              type="button"
              onClick={() => {
                closeDialog();
                window.dispatchEvent(new Event(OPEN_LOGIN_EVENT));
              }}
              className="font-semibold text-blue-deep underline-offset-4 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </dialog>
    </section>
  );
}
