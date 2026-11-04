import { PRICING } from "@/content/site";
import { Sparkle } from "./Doodles";

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;

function Check({ light }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`mt-0.5 h-5 w-5 shrink-0 ${light ? "text-sky-200" : "text-blue"}`} fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Source: content/offer.ts on the current site.
// The summer intensive's "95+" promise is intentionally left out until its exact
// terms are confirmed. Add it here only with the confirmed wording.
export default function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-[1200px] px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28">
      <div className="text-center">
        <p data-reveal className="font-hand text-[26px] text-blue">simple pricing</p>
        <h2
          data-reveal
          style={d(80)}
          className="mx-auto mt-1 max-w-[18ch] font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[52px]"
        >
          Two ways to learn with us.
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1000px] gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        {/* Tutoring */}
        <article data-reveal className="lift relative rounded-[36px] bg-blue p-8 text-white sm:p-10 [--hover-rot:-0.5deg]">
          <Sparkle className="float absolute right-8 top-8 w-8 text-sky-200" style={{ ["--rot" as string]: "8deg" }} />
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-sky-200">During the school year</p>
          <h3 className="mt-3 font-display text-[32px] font-extrabold leading-tight">1-on-1 tutoring</h3>
          <p className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-[64px] font-extrabold leading-none tracking-[-0.03em]">${PRICING.hourly}</span>
            <span className="text-[17px] font-semibold text-white/80">/ hour</span>
          </p>
          <p className="mt-2 inline-block rounded-full bg-white/15 px-3.5 py-1 text-[14px] font-bold">
            Your first lesson is free
          </p>
          <ul className="mt-7 space-y-3 text-[15.5px] leading-snug text-white/90">
            <li className="flex gap-3"><Check light />Grade 11 & 12 math, physics, chemistry and biology</li>
            <li className="flex gap-3"><Check light />Weekly, twice weekly, or ahead of a test</li>
            <li className="flex gap-3"><Check light />Every lesson logged within 24 hours</li>
            <li className="flex gap-3"><Check light />Stop any time, no packages</li>
          </ul>
          <a href="#book" className="btn mt-9 w-full bg-white px-6 py-4 text-[16px] text-blue hover:-translate-y-0.5 hover:bg-sky-50 sm:w-auto">
            Book a free trial lesson <span className="arrow" aria-hidden="true">→</span>
          </a>
        </article>

        {/* Summer intensive */}
        <article data-reveal style={d(120)} className="lift relative rounded-[36px] bg-white p-8 ring-1 ring-line sm:p-10 md:mt-10 [--hover-rot:0.6deg]">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-blue">Before the school year</p>
          <h3 className="mt-3 font-display text-[28px] font-extrabold leading-tight">Summer course intensive</h3>
          <p className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-[52px] font-extrabold leading-none tracking-[-0.03em]">${PRICING.intensive}</span>
            <span className="text-[16px] font-semibold text-ink-soft">/ subject</span>
          </p>
          <p className="mt-2 text-[14.5px] font-semibold text-ink-soft">
            Or start with lesson 1 for ${PRICING.intensiveLesson1}.
          </p>
          <p className="mt-6 text-[15.5px] leading-relaxed text-ink-soft">
            One grade 12 course, front to back, the summer before you take it for marks. The school year becomes your
            second pass, not your first.
          </p>
          <ul className="mt-6 space-y-3 text-[15px] leading-snug text-ink-soft">
            <li className="flex gap-3"><Check />{PRICING.intensiveLessons} one-hour lessons, Monday to Friday over two weeks</li>
            <li className="flex gap-3"><Check />Advanced Functions, Calculus, Physics, Chemistry</li>
          </ul>
          <a href="#book-consult" className="btn btn-ghost mt-8 px-6 py-3.5 text-[15px]">
            Ask about summer dates <span className="arrow" aria-hidden="true">→</span>
          </a>
        </article>
      </div>
    </section>
  );
}
