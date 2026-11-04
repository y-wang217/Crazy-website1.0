import { FEATURED_SUBJECTS, OTHER_SUBJECTS, type Subject } from "@/content/site";
import { CalculusDoodle, FunctionsDoodle, PhysicsDoodle, Squiggle } from "./Doodles";

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;

const DOODLES = { functions: FunctionsDoodle, calculus: CalculusDoodle, physics: PhysicsDoodle };

function SubjectCard({ subject, index }: { subject: Subject; index: number }) {
  const Doodle = DOODLES[subject.doodle];
  const flagship = subject.flagship;
  const skin = flagship
    ? "bg-blue text-white lg:col-span-7 lg:row-span-2 [--hover-rot:-0.6deg]"
    : index === 1
      ? "bg-sky-100 text-ink lg:col-span-5 [--hover-rot:0.8deg]"
      : "bg-white text-ink border border-line lg:col-span-5 [--hover-rot:-0.8deg]";

  return (
    <article
      data-reveal
      style={d(index * 110)}
      className={`subject-card lift relative flex min-h-[300px] flex-col overflow-hidden rounded-[32px] p-7 sm:p-9 ${skin}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded-full px-3.5 py-1 text-[12.5px] font-bold tracking-wide ${
            flagship ? "bg-white/15 text-white" : "bg-white text-blue"
          }`}
        >
          {subject.codes}
        </span>
        {flagship && (
          <span className="rotate-[4deg] rounded-full bg-white px-3.5 py-1 text-[12.5px] font-bold uppercase tracking-[0.1em] text-blue">
            ★ Flagship
          </span>
        )}
      </div>

      <h3
        className={`mt-6 font-display font-extrabold leading-[1.02] tracking-[-0.02em] ${
          flagship ? "text-[40px] sm:text-[54px]" : "text-[32px] sm:text-[36px]"
        }`}
      >
        {subject.name}
      </h3>
      <p className={`mt-3 max-w-[40ch] text-[16px] leading-relaxed ${flagship ? "text-white/85" : "text-ink-soft"}`}>
        {subject.blurb}
      </p>

      <ul className={`mt-6 flex flex-wrap gap-2 ${flagship ? "max-w-[30rem]" : "max-w-[22rem]"}`}>
        {subject.topics.map((t) => (
          <li
            key={t}
            className={`rounded-full px-3 py-1.5 text-[13px] font-semibold ${
              flagship ? "bg-white/12 text-white ring-1 ring-white/25" : "bg-white/80 text-ink-soft ring-1 ring-line"
            }`}
          >
            {t}
          </li>
        ))}
      </ul>

      <Doodle
        draw
        className={`pointer-events-none mt-auto self-end pt-6 ${
          flagship ? "w-[220px] text-white/80 sm:w-[300px]" : "w-[130px] text-blue/70"
        }`}
        style={d(300 + index * 120)}
      />
    </article>
  );
}

export default function Subjects() {
  return (
    <section id="subjects" className="relative mx-auto max-w-[1200px] px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p data-reveal className="font-hand text-[26px] text-blue">pick your subject</p>
          <h2
            data-reveal
            style={d(80)}
            className="mt-1 max-w-[20ch] font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[52px]"
          >
            The courses that count, taught one-on-one.
          </h2>
        </div>
        <p data-reveal style={d(160)} className="max-w-[38ch] text-[16.5px] leading-relaxed text-ink-soft">
          Built on the Ontario curriculum for grades 11 and 12, with extra focus on the math and physics competitive
          STEM programs look at.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
        {FEATURED_SUBJECTS.map((s, i) => (
          <SubjectCard key={s.codes} subject={s} index={i} />
        ))}
      </div>

      <div data-reveal className="relative mt-5 rounded-[32px] bg-paper-deep p-7 sm:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <div className="shrink-0">
            <h3 className="font-display text-[24px] font-bold">Also available</h3>
            <Squiggle className="mt-1 w-28 text-sky-300" />
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {OTHER_SUBJECTS.map((s) => (
              <li
                key={s}
                className="rounded-full bg-white px-4 py-2 text-[14.5px] font-semibold text-ink ring-1 ring-line transition-colors hover:ring-sky-300"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
