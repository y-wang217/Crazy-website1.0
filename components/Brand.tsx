// Wordmark built from the AP Academy logo: the deep blue square with the serif "AP".
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-[10px] bg-gradient-to-b from-[#5a78d8] to-blue-deep font-serif text-white ${className}`}
      aria-hidden="true"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      AP
    </span>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9 text-[17px] tracking-tight" />
      <span className="font-display text-[19px] font-bold tracking-tight text-ink">AP Academy</span>
    </span>
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
    <div className={`placeholder relative flex flex-col items-center justify-center gap-2 text-center ${className}`}>
      {initial ? (
        <span className="font-display text-[64px] font-bold leading-none text-sky-300">{initial}</span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-9 w-9 text-sky-300" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M4 8h3l2-3h6l2 3h3v11H4z" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      )}
      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-blue">
        Placeholder
      </span>
      <span className="max-w-[18ch] text-[12.5px] leading-snug text-ink-soft">{label}</span>
    </div>
  );
}
