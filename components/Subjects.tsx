import { FEATURED_SUBJECTS, OTHER_SUBJECTS, type Subject } from "@/content/site";
import { CalculusDoodle, FunctionsDoodle, PhysicsDoodle, Squiggle } from "./Doodles";

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;

const DOODLES = { functions: FunctionsDoodle, calculus: CalculusDoodle, physics: PhysicsDoodle };

function SubjectCard({ subject, index }: { subject: Subject; index: number }) {
  const Doodle = DOODLES[subject.doodle];
  const flagship = subject.flagship;
  const skin = flagship
    ? "bg-sky-100 lg:col-span-7 lg:row-span-2 [--hover-rot:-0.6deg]"
    : index === 1
      ? "bg-white ring-1 ring-line lg:col-span-5 [--hover-rot:0.8deg]"
      : "bg-paper-deep lg:col-span-5 [--hover-rot:-0.8deg]";

  return (
    <article
      data-reveal
      style={d(index * 110)}
      className={`subject-card lift relative flex w-[84%] shrink-0 flex-col overflow-hidden rounded-[30px] p-6 text-ink sm:w-[60%] sm:p-9 lg:w-auto ${skin}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-white px-3.5 py-1 text-[12.5px] font-bold tracking-wide text-blue ring-1 ring-line">
          {subject.codes}
        </span>
        {flagship && (
          <span className="rotate-[4deg] rounded-full bg-butter px-3.5 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-ink">
            ★ Flagship
          </span>
        )}
      </div>

      <h3
        className={`mt-5 font-display font-extrabold leading-[1.02] tracking-[-0.02em] sm:mt-6 ${
          flagship ? "text-[32px] sm:text-[52px]" : "text-[28px] sm:text-[34px]"
        }`}
      >
        {subject.name}
      </h3>
      <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft sm:text-[16px]">{subject.blurb}</p>

      <ul className={`mt-5 flex flex-wrap gap-2 ${flagship ? "max-w-[30rem]" : "max-w-[22rem] lg:max-w-[17rem]"}`}>
        {subject.topics.map((t) => (
          <li key={t} className="rounded-full bg-white/85 px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft ring-1 ring-line sm:text-[13px]">
            {t}
          </li>
        ))}
      </ul>

      <Doodle
        draw
        className={`pointer-events-none mt-auto self-end pt-5 text-dusty ${
          flagship ? "w-[150px] sm:w-[240px]" : "w-[110px] sm:w-[130px] lg:absolute lg:bottom-6 lg:right-6 lg:w-[110px] lg:pt-0"
        }`}
        style={d(300 + index * 120)}
      />
    </article>
  );
}

export default function Subjects() {
  return (
    <section id="subjects" className="relative mx-auto max-w-[1200px] px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-6">
        <div>
          <p data-reveal className="font-hand text-[24px] text-blue sm:text-[26px]">pick your subject</p>
          <h2
            data-reveal
            style={d(80)}
            className="mt-1 max-w-[20ch] font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[52px]"
          >
            The courses that count, taught one-on-one.
          </h2>
        </div>
        <p data-reveal style={d(160)} className="max-w-[38ch] text-[16px] leading-relaxed text-ink-soft sm:text-[16.5px]">
          Built on the Ontario curriculum for grades 11 and 12, with extra focus on the math and physics competitive
          STEM programs look at.
        </p>
      </div>

      {/* Swipe row on phones and tablets, bento grid on desktop. */}
      <div
        className="swipe -mx-4 mt-8 flex gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
        aria-label="Featured subjects"
      >
        {FEATURED_SUBJECTS.map((s, i) => (
          <SubjectCard key={s.codes} subject={s} index={i} />
        ))}
      </div>
      <p className="mt-2 flex items-center gap-1.5 font-hand text-[20px] text-ink-faint lg:hidden" aria-hidden="true">
        swipe for more <span className="text-dusty">→</span>
      </p>

      <div data-reveal className="mt-6 flex flex-col gap-4 lg:mt-10 lg:flex-row lg:items-center lg:gap-10">
        <div className="shrink-0">
          <h3 className="font-display text-[22px] font-bold sm:text-[24px]">Also available</h3>
          <Squiggle className="mt-1 w-24 text-sky-300" />
        </div>
        <ul className="flex flex-wrap gap-2">
          {OTHER_SUBJECTS.map((s) => (
            <li
              key={s}
              className="rounded-full bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-ink ring-1 ring-line transition-colors hover:ring-sky-300 sm:px-4 sm:py-2 sm:text-[14.5px]"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
