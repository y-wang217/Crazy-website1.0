import Image from "next/image";
import { TUTORS, type Tutor } from "@/content/site";
import { PhotoPlaceholder } from "./Brand";
import { Sparkle, Squiggle } from "./Doodles";

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;

// What every tutor does. Source: content/methods.ts and content/offer.ts on the current site.
const PROMISES: { lead: string; strong: string; tail?: string }[] = [
  { lead: "Teaches ", strong: "one student at a time", tail: ", live online" },
  { lead: "Starts from ", strong: "your weak spots", tail: ", not a script" },
  { lead: "Practises from our ", strong: "mistakes blueprint" },
  { lead: "Logs ", strong: "every lesson within 24 hours" },
];

const TILTS = ["rotate-[-2deg]", "rotate-[2deg]", "rotate-[1.5deg]"];

function TutorCard({ tutor, index }: { tutor: Tutor; index: number }) {
  const first = tutor.name.replace(/^M[rs]s?\.\s*/, "");
  return (
    <article
      data-reveal
      style={d(index * 130)}
      className={`group w-[68%] shrink-0 sm:w-[44%] lg:w-auto ${index % 2 === 1 ? "lg:translate-y-24" : ""}`}
    >
      <div className={`lift relative aspect-[5/6] overflow-hidden rounded-[30px] ${TILTS[index % TILTS.length]} [--hover-rot:0deg]`}>
        {tutor.photo ? (
          <Image
            src={tutor.photo}
            alt={`${tutor.name}, ${tutor.role.toLowerCase()}`}
            fill
            sizes="(min-width: 1024px) 300px, 68vw"
            className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <PhotoPlaceholder label={`Portrait of ${tutor.name}`} initial={first.charAt(0)} className="h-full w-full" />
        )}
      </div>

      {/* Small name label (FlyHigh-style pill) */}
      <a
        href="#book"
        className="relative z-10 mx-auto -mt-6 flex w-[88%] items-center justify-between gap-2 rounded-[18px] bg-sky-100 py-2 pl-4 pr-3.5 ring-4 ring-paper transition-colors hover:bg-sky-200"
      >
        <span className="leading-tight">
          <span className="block text-[14px] font-bold text-ink">{tutor.name}</span>
          <span className="block text-[12.5px] text-ink-soft">{tutor.headline}</span>
        </span>
        <span className="text-blue transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
      </a>

      <p className="mt-3 px-2 text-[14px] leading-snug text-ink-soft">{tutor.intro}</p>
    </article>
  );
}

export default function Tutors() {
  return (
    <section id="tutors" className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[640px] lg:mx-auto lg:text-center">
          <p data-reveal className="font-hand text-[24px] text-blue sm:text-[26px]">meet your tutors</p>
          <h2
            data-reveal
            style={d(80)}
            className="mt-1 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[52px]"
          >
            Real people who love this stuff.
          </h2>
          <p data-reveal style={d(160)} className="mt-3 text-[16px] leading-relaxed text-ink-soft sm:text-[17px] lg:mx-auto lg:max-w-[46ch]">
            A small team of engineers who teach. Your free trial is how you find the one who clicks with you.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-14">
          {/* Photos on soft organic shapes. min-w-0 keeps the swipe row from widening the grid. */}
          <div className="relative min-w-0">
            <div className="blob absolute -left-10 top-[-4%] hidden h-[62%] w-[66%] bg-sky-100 lg:block" aria-hidden="true" />
            <div
              className="blob absolute -right-6 bottom-[-10%] hidden h-[58%] w-[60%] bg-sky-50 lg:block"
              style={{ animationDelay: "-7s" }}
              aria-hidden="true"
            />
            <Sparkle className="float absolute -top-4 right-[18%] hidden w-7 text-dusty lg:block" style={{ ["--rot" as string]: "-10deg" }} />

            <div
              className="swipe relative -mx-4 flex gap-5 overflow-x-auto px-4 pb-3 pt-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-24"
              aria-label="Tutors"
            >
              {TUTORS.map((t, i) => (
                <TutorCard key={t.id} tutor={t} index={i} />
              ))}
            </div>
            <p className="mt-1 flex items-center gap-1.5 font-hand text-[20px] text-ink-faint lg:hidden" aria-hidden="true">
              swipe to meet everyone <span className="text-dusty">→</span>
            </p>
          </div>

          {/* Connected list + CTA (FlyHigh-style) */}
          <div data-reveal style={d(200)} className="min-w-0 lg:pb-16">
            <ol className="relative">
              {PROMISES.map((p, i) => (
                <li key={p.strong} className="relative pb-5 pl-9 last:pb-0 lg:pb-7">
                  {i < PROMISES.length - 1 && (
                    <span className="absolute left-[11px] top-7 h-[calc(100%-22px)] w-px bg-sky-300" aria-hidden="true" />
                  )}
                  <span
                    className="absolute left-0 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-sky-100 text-[12px] font-bold text-blue"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-[15.5px] leading-snug text-ink-soft sm:text-[16px]">
                    {p.lead}
                    <strong className="font-bold text-blue">{p.strong}</strong>
                    {p.tail}
                  </span>
                </li>
              ))}
            </ol>

            <a href="#book" className="btn btn-warm mt-8 w-full px-7 py-4 text-[16px] sm:w-auto">
              Book a trial with a tutor <span className="arrow" aria-hidden="true">→</span>
            </a>
            <div className="mt-5 flex items-center gap-2">
              <Squiggle className="w-12 shrink-0 text-sky-300" />
              <p className="font-hand text-[20px] leading-tight text-ink-soft">not sure who&apos;s right? that&apos;s what the trial is for</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
