import Image from "next/image";
import { TUTORS, type Tutor } from "@/content/site";
import { PhotoPlaceholder } from "./Brand";
import { Sparkle } from "./Doodles";

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;

// What every tutor does. Source: content/methods.ts and content/offer.ts on the current site.
const PROMISES: { lead: string; strong: string; tail?: string }[] = [
  { lead: "Teaches ", strong: "one student at a time", tail: ", live online" },
  { lead: "Starts from ", strong: "your weak spots", tail: ", not a script" },
  { lead: "Practises from our ", strong: "mistakes blueprint", tail: " for each course" },
  { lead: "Logs ", strong: "every lesson within 24 hours", tail: " for parents" },
];

function TutorCard({ tutor, tilt, delay }: { tutor: Tutor; tilt: string; delay: number }) {
  return (
    <article data-reveal style={d(delay)} className="group">
      <div className={`lift relative aspect-[4/5] overflow-hidden rounded-[30px] ${tilt}`}>
        {tutor.photo ? (
          <Image
            src={tutor.photo}
            alt={`${tutor.name}, ${tutor.role.toLowerCase()}`}
            fill
            sizes="(min-width: 1024px) 280px, 46vw"
            className="object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <PhotoPlaceholder
            label={`Photo of ${tutor.name}`}
            initial={tutor.name.replace(/^M[rs]s?\.\s*/, "").charAt(0)}
            className="h-full w-full rounded-[30px]"
          />
        )}
      </div>

      {/* Name pill (FlyHigh-style) */}
      <p className="relative z-10 mx-auto -mt-5 flex w-[92%] items-center justify-between gap-2 rounded-full bg-sky-100 px-4 py-2.5 text-[13.5px] shadow-[0_10px_20px_-14px_rgba(19,32,61,0.5)] ring-4 ring-paper">
        <span>
          <span className="font-bold text-ink">{tutor.name}</span>
          <span className="text-ink-soft">, {tutor.headline}</span>
        </span>
      </p>

      <ul className="mt-4 space-y-1.5 px-2">
        {tutor.credentials.map((c) => (
          <li key={c} className="flex gap-2 text-[13.5px] leading-snug text-ink-soft">
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Tutors() {
  const [charlie, noah, kuby] = TUTORS;

  return (
    <section id="tutors" className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-12">
        {/* Heading (first on mobile, right column on desktop) */}
        <div className="lg:order-2">
          <p data-reveal className="font-hand text-[26px] text-blue">meet your tutors</p>
          <h2
            data-reveal
            style={d(80)}
            className="mt-1 font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[48px]"
          >
            Real people who love this stuff.
          </h2>
          <p data-reveal style={d(160)} className="mt-4 max-w-[40ch] text-[16.5px] leading-relaxed text-ink-soft">
            A small team of engineers who teach. Your free trial is how you find the one who clicks with you.
          </p>

          {/* Connected list (FlyHigh-style) */}
          <ol data-reveal style={d(220)} className="mt-9">
            {PROMISES.map((p, i) => (
              <li key={p.strong} className="relative pb-6 pl-9 last:pb-0">
                {i < PROMISES.length - 1 && (
                  <span className="absolute left-[11px] top-7 h-[calc(100%-20px)] w-px bg-sky-300" aria-hidden="true" />
                )}
                <span
                  className="absolute left-0 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-sky-100 text-[12px] font-bold text-blue"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-[16px] leading-snug text-ink-soft">
                  {p.lead}
                  <strong className="font-bold text-blue">{p.strong}</strong>
                  {p.tail}
                </span>
              </li>
            ))}
          </ol>

          <a data-reveal href="#book" className="btn btn-primary mt-9 px-7 py-4 text-[16px]">
            Book a trial with a tutor <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Staggered photo grid on soft blobs */}
        <div className="relative lg:order-1">
          <div className="blob absolute -left-6 top-0 h-[62%] w-[70%] bg-sky-100" aria-hidden="true" />
          <div
            className="blob absolute -right-4 bottom-0 h-[55%] w-[62%] bg-sky-50"
            style={{ animationDelay: "-7s" }}
            aria-hidden="true"
          />
          <Sparkle className="float absolute -top-6 right-[12%] w-8 text-blue" style={{ ["--rot" as string]: "-10deg" }} />

          <div className="relative grid grid-cols-2 gap-x-5 sm:gap-x-8">
            <div className="space-y-10">
              <TutorCard tutor={charlie} tilt="rotate-[-1.5deg] [--hover-rot:-0.5deg]" delay={0} />
            </div>
            <div className="mt-16 space-y-10 sm:mt-24">
              <TutorCard tutor={noah} tilt="rotate-[1.5deg] [--hover-rot:0.5deg]" delay={140} />
            </div>
            <div className="-mt-6 sm:-mt-14">
              <TutorCard tutor={kuby} tilt="rotate-[1deg] [--hover-rot:-0.5deg]" delay={220} />
            </div>
            <div data-reveal style={d(300)} className="mt-10 self-start">
              <a
                href="#book"
                className="lift block rotate-[-2deg] rounded-[28px] border-2 border-dashed border-sky-300 bg-white/70 p-6 text-center [--hover-rot:1deg]"
              >
                <span className="font-hand text-[26px] leading-tight text-blue">not sure who&apos;s right for you?</span>
                <span className="mt-2 block text-[14.5px] leading-snug text-ink-soft">
                  That&apos;s what the free trial lesson is for.
                </span>
                <span className="mt-3 inline-block text-[14.5px] font-bold text-blue">Book one →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
