import Image from "next/image";

// The supplied AP Academy logo (Nov 2026), unaltered apart from its flat white
// background being made transparent. Two crops of the same artwork:
//   header: the AP mark and "AP Academy" (856 × 579)
//   full:   the same plus the "Helping ambitions find their path" tagline (936 × 635)
// Always size by height with width auto so the proportions never change.
const LOGOS = {
  header: { src: "/ap-academy-logo-header.png", width: 856, height: 579 },
  full: { src: "/ap-academy-logo.png", width: 936, height: 635 },
} as const;

export function Logo({
  variant = "header",
  className = "",
  priority = false,
}: {
  variant?: keyof typeof LOGOS;
  className?: string;
  priority?: boolean;
}) {
  const logo = LOGOS[variant];
  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={variant === "full" ? "AP Academy: Helping ambitions find their path" : "AP Academy"}
      priority={priority}
      sizes={variant === "full" ? "200px" : "80px"}
      className={`w-auto ${className}`}
    />
  );
}

// A photo slot that is unmistakably a placeholder. Never swap in stock images of
// people presented as AP Academy students or tutors.
export function PhotoPlaceholder({
  label,
  initial,
  className = "",
}: {
  label: string;
  initial?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`placeholder relative flex flex-col items-center justify-center gap-2 overflow-hidden p-4 text-center ${className}`}
    >
      {initial ? (
        <span className="grid h-20 w-20 place-items-center rounded-full bg-white/80 font-display text-[40px] font-bold leading-none text-blue">
          {initial}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue/60" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M4 8h3l2-3h6l2 3h3v11H4z" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      )}
      <span className="mt-1 rounded-full bg-white/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-blue">
        Photo coming soon
      </span>
      <span className="max-w-[20ch] text-[12px] leading-snug text-ink-soft">{label}</span>
    </div>
  );
}
