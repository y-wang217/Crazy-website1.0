import { Logo } from "./Brand";
import LoginDialog from "./LoginDialog";

const NAV = [
  { href: "#subjects", label: "Subjects" },
  { href: "#why", label: "Why AP Academy" },
  { href: "#progress", label: "Progress" },
  { href: "#tutors", label: "Tutors" },
  { href: "#pricing", label: "Pricing" },
];

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
          {/* Existing students and linked parents: opens the login popup (lib/auth.ts is the integration point). */}
          <LoginDialog />
          <a href="#book" className="btn btn-warm h-[42px] px-5 text-[14.5px] sm:px-6">
            Free trial
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
