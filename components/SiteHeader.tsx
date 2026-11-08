import { PORTAL_LOGIN_URL } from "@/content/site";
import { Logo } from "./Brand";

const NAV = [
  { href: "#subjects", label: "Subjects" },
  { href: "#why", label: "Why AP Academy" },
  { href: "#progress", label: "Progress" },
  { href: "#tutors", label: "Tutors" },
  { href: "#pricing", label: "Pricing" },
];

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.9-3.6 3.7-5.6 7-5.6s6.1 2 7 5.6" />
    </svg>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="AP Academy home" className="shrink-0">
          <Logo priority className="h-[46px] sm:h-[52px]" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-ink-soft transition-colors hover:bg-sky-100 hover:text-ink xl:px-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {/* Existing students and linked parents only: goes to the portal's own sign-in. */}
          <a
            href={PORTAL_LOGIN_URL}
            aria-label="Student and parent log in"
            title="Student and parent log in"
            className="btn h-[42px] w-[42px] border-[1.5px] border-blue-deep/30 bg-white/70 text-[14.5px] text-blue-deep hover:border-blue-deep/60 hover:bg-white sm:w-auto sm:gap-2 sm:px-4"
          >
            <UserIcon />
            <span className="hidden sm:inline">Log in</span>
          </a>
          <a href="#book" className="btn btn-warm h-[42px] px-5 text-[14.5px] sm:px-6">
            Free trial
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
