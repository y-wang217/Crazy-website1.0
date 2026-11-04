import { REASONS } from "@/content/site";
import { PhotoPlaceholder } from "./Brand";
import { CurlyArrow } from "./Doodles";

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;

function Icon({ name }: { name: (typeof REASONS)[number]["icon"] }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
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

export default function WhyUs() {
  return (
    <section id="why" className="px-2 sm:px-4">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[40px] bg-sky-50 px-4 py-20 sm:rounded-[56px] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: statement + photo */}
          <div className="relative">
            <p data-reveal className="font-hand text-[26px] text-blue">why AP Academy</p>
            <h2
              data-reveal
              style={d(80)}
              className="mt-1 font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[52px]"
            >
              Built around one student.{" "}
              <span className="relative whitespace-nowrap text-blue">
                Yours.              </span>
            </h2>
            <p data-reveal style={d(160)} className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-ink-soft">
              No group pace to keep up with and no script to follow. Your tutor learns how you think, then teaches
              to that.
            </p>

            <div data-reveal="scale" style={d(240)} className="relative mt-10 max-w-[400px]">
              <PhotoPlaceholder
                label="Real photo of a student in a live online lesson"
                className="aspect-[5/4] rotate-[-2deg] rounded-[32px]"
              />
              <div className="pointer-events-none absolute -right-4 -top-10 hidden items-center gap-1 text-blue sm:flex">
                <span className="font-hand text-[22px]">live, not recorded</span>
                <CurlyArrow draw className="w-14 rotate-[70deg]" style={d(600)} />
              </div>
            </div>
          </div>

          {/* Right: four reasons, staggered */}
          <div className="grid gap-5 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <article
                key={r.title}
                data-reveal
                style={d(i * 100)}
                className={`lift rounded-[28px] bg-white p-7 ring-1 ring-line ${i % 2 === 1 ? "sm:translate-y-12" : ""} ${
                  i === 0 ? "[--hover-rot:-0.6deg]" : "[--hover-rot:0.6deg]"
                }`}
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-100 text-blue">
                  <Icon name={r.icon} />
                </span>
                <h3 className="mt-5 font-display text-[23px] font-bold leading-tight tracking-[-0.01em]">{r.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-soft">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
