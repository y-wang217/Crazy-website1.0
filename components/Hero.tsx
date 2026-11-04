import Image from "next/image";
import { PRICING } from "@/content/site";
import { PhotoPlaceholder } from "./Brand";
import { CurlyArrow, SineWave, Sparkle, StickerIcon, Underline } from "./Doodles";

const FACTS = [
  { value: "1-on-1", label: "Every lesson, live online" },
  { value: `$${PRICING.hourly}/hr`, label: "Pay as you go" },
  { value: "Free", label: "Your first lesson" },
  { value: "Gr. 11–12", label: "Ontario curriculum" },
];

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-20 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:px-8 lg:pb-24">
        {/* Copy */}
        <div className="relative z-10">
          <p
            data-reveal
            style={d(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-[13.5px] font-semibold text-ink-soft"
          >
            <span className="h-2 w-2 rounded-full bg-blue" aria-hidden="true" />
            Live online tutoring · Ontario Grade 11 & 12
          </p>

          <h1
            data-reveal
            style={d(90)}
            className="mt-6 font-display text-[44px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[58px] lg:text-[72px]"
          >
            Math & physics that finally{" "}
            <span className="relative inline-block text-blue">
              click
              <Underline draw className="absolute -bottom-2 left-0 h-4 w-full text-sky-300 sm:-bottom-3 sm:h-5" style={d(700)} />
            </span>
            .
          </h1>

          <p data-reveal style={d(180)} className="mt-7 max-w-[54ch] text-[17.5px] leading-relaxed text-ink-soft sm:text-[19px]">
            Personalized 1-on-1 lessons, live and online. Every lesson starts from where <em>you</em> are, whether
            you&apos;re catching up before a test or aiming for programs like Waterloo Engineering.
          </p>

          <div data-reveal style={d(260)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#book" className="btn btn-primary px-7 py-4 text-[16.5px]">
              Book a free trial lesson
              <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#book-consult" className="btn btn-ghost px-6 py-4 text-[15.5px]">
              Or talk to Mr. Charlie first
            </a>
          </div>

        </div>

        {/* Photo composition */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="blob absolute inset-[6%_2%_4%_8%] bg-sky-200" aria-hidden="true" />
          <SineWave draw className="absolute -left-6 top-4 w-36 text-blue sm:-left-12" style={d(500)} />
          <Sparkle className="float absolute right-2 top-0 w-8 text-blue" style={{ ["--rot" as string]: "12deg" }} />
          <StickerIcon name="calculator" className="absolute -right-2 top-[40%] z-10 sm:-right-6" style={{ ["--rot" as string]: "8deg", animationDelay: "-2s" }} />          <StickerIcon name="atom" className="absolute left-[4%] top-[30%] z-10 hidden lg:grid" style={{ ["--rot" as string]: "-4deg", animationDelay: "-1s" }} />

          <div data-reveal="scale" style={d(150)} className="relative ml-auto w-[80%]">
            <div className="lift relative aspect-[4/5] overflow-hidden rounded-[36px] border-[6px] border-white shadow-[0_30px_60px_-30px_rgba(19,32,61,0.45)] [--hover-rot:1deg] rotate-[2deg]">
              <Image
                src="/charlie.jpeg"
                alt="Mr. Charlie, founder of AP Academy, mid-explanation"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 80vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <div className="absolute -bottom-5 right-4 rotate-[-3deg] rounded-2xl bg-white px-4 py-3 shadow-[0_16px_30px_-18px_rgba(19,32,61,0.5)]">
              <p className="font-display text-[16px] font-bold leading-tight">Mr. Charlie</p>
              <p className="text-[13px] text-ink-soft">Founder & lead tutor</p>
            </div>
          </div>

          <div data-reveal="scale" style={d(380)} className="absolute -left-2 bottom-[14%] w-[40%] sm:-left-6">
            <PhotoPlaceholder
              label="Real student photo"
              className="aspect-square rotate-[-6deg] rounded-[28px] border-white shadow-[0_20px_40px_-24px_rgba(19,32,61,0.5)]"
            />
          </div>

          <div
            className="float absolute -top-4 left-[14%] grid h-[92px] w-[92px] place-items-center rounded-full bg-blue text-center text-white shadow-[0_14px_30px_-12px_rgba(36,83,214,0.7)] sm:h-[104px] sm:w-[104px]"
            style={{ ["--rot" as string]: "-10deg" }}
          >
            <span className="font-display text-[13px] font-bold uppercase leading-tight tracking-wide">
              First
              <br />
              lesson
              <br />
              <span className="text-[18px]">free</span>
            </span>
          </div>

          <div className="pointer-events-none absolute -bottom-14 left-[30%] hidden items-end gap-1 text-blue sm:flex">
            <CurlyArrow draw className="w-16 -scale-x-100 rotate-[200deg]" style={d(900)} />
            <span className="font-hand text-[24px] leading-none">your tutor</span>
          </div>
        </div>
      </div>

      {/* Facts band (BrightFuture-style). Plain facts only, no results claims. */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <dl data-reveal className="grid grid-cols-2 gap-y-7 rounded-[32px] bg-blue px-6 py-8 text-white sm:px-10 md:grid-cols-4 md:py-9">
          {FACTS.map((f) => (
            <div key={f.label} className="flex flex-col-reverse text-center">
              <dt className="mt-2 text-[14px] font-medium text-sky-100 sm:text-[15px]">{f.label}</dt>
              <dd className="font-display text-[30px] font-extrabold leading-none tracking-[-0.02em] sm:text-[38px]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
