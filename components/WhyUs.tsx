import Image from "next/image";
import { REASONS } from "@/content/site";
import { CurlyArrow, Sparkle } from "./Doodles";

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;

function Icon({ name }: { name: (typeof REASONS)[number]["icon"] }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      {name === "one" && (
        <>
          <circle {...p} cx="12" cy="7.5" r="3.5" />
          <path {...p} d="M5 20c1-4 3.8-6 7-6s6 2 7 6" />
        </>
      )}
      {name === "calendar" && (
        <>
          <rect {...p} x="3.5" y="5" width="17" height="15" rx="3" />
          <path {...p} d="M8 3v4M16 3v4M3.5 10h17M9 14.5l2 2 4-4" />
        </>
      )}
      {name === "unlock" && (
        <>
          <rect {...p} x="4.5" y="10.5" width="15" height="10" rx="2.5" />
          <path {...p} d="M8 10.5V7.5a4 4 0 017.6-1.7" />
        </>
      )}
      {name === "target" && (
        <>
          <circle {...p} cx="12" cy="12" r="8.5" />
          <circle {...p} cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

// No card grid here: an organic photo collage on one side, an open, staggered
// list on the other, held together by whitespace.
export default function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        {/* Photo collage */}
        <div className="relative order-2 mx-auto w-full max-w-[540px] pb-14 lg:order-1">
          <div className="blob absolute -inset-x-[6%] -bottom-[2%] -top-[10%] bg-sky-100" aria-hidden="true" />
          <Sparkle className="float absolute -top-6 right-[6%] w-8 text-dusty" style={{ ["--rot" as string]: "14deg" }} />

          <div data-reveal="photo" className="relative">
            <div className="lift relative aspect-[16/10] overflow-hidden rounded-[90px_28px_90px_28px] border-[6px] border-white shadow-[0_24px_48px_-30px_rgba(30,42,68,0.5)] sm:rounded-[120px_36px_120px_36px]">
              <Image
                src="/lesson-online.jpg"
                alt="A live online AP Academy lesson: Mr. Charlie works through exponent equations on a shared whiteboard with a student"
                fill
                sizes="(min-width: 1024px) 540px, 92vw"
                className="object-cover object-[60%_50%]"
              />
            </div>
            <span className="absolute -top-4 left-6 rotate-[-3deg] rounded-xl bg-white px-3.5 py-2 text-[13px] font-bold text-ink shadow-[0_12px_24px_-16px_rgba(30,42,68,0.5)]">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-peach align-middle" aria-hidden="true" />
              Live lesson, shared whiteboard
            </span>
          </div>

          <div className="pointer-events-none absolute bottom-0 right-2 flex items-center gap-1">
            <CurlyArrow draw className="w-12 -scale-y-100 rotate-[150deg] text-peach" style={d(500)} />
            <span className="max-w-[18ch] font-hand text-[21px] leading-tight text-blue">the founder still teaches every week</span>
          </div>
        </div>

        {/* Statement + reasons */}
        <div className="order-1 lg:order-2">
          <p data-reveal className="font-hand text-[24px] text-blue sm:text-[26px]">why AP Academy</p>
          <h2
            data-reveal
            style={d(80)}
            className="mt-1 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[52px]"
          >
            Built around one student. <span className="text-blue">Yours.</span>
          </h2>
          <p data-reveal style={d(160)} className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">
            No group pace to keep up with and no script to follow. Your tutor learns how you think, then teaches to
            that.
          </p>

          <ul className="mt-8 grid gap-x-10 gap-y-7 sm:mt-10 sm:grid-cols-2 sm:gap-y-10">
            {REASONS.map((r, i) => (
              <li
                key={r.title}
                data-reveal
                style={d(i * 90)}
                className={`flex gap-4 sm:block ${i % 2 === 1 ? "sm:mt-10" : ""}`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px_22px_16px_22px] bg-sky-100 text-blue sm:h-14 sm:w-14">
                  <Icon name={r.icon} />
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.01em] sm:mt-4 sm:text-[22px]">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft sm:mt-2 sm:text-[15.5px]">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
