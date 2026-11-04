import { Wordmark } from "./Brand";

const NAV = [
  { href: "#subjects", label: "Subjects" },
  { href: "#why", label: "Why AP Academy" },
  { href: "#tutors", label: "Tutors" },
  { href: "#pricing", label: "Pricing" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="AP Academy home">
          <Wordmark />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[15px] font-semibold text-ink-soft transition-colors hover:bg-sky-100 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#book" className="btn btn-primary px-5 py-2.5 text-[14.5px] sm:px-6">
          Free trial
          <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
