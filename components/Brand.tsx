// Wordmark built from the AP Academy logo: the blue square with the serif "AP".
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-[10px] bg-gradient-to-b from-[#8aa4cf] to-blue-deep text-white ${className}`}
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
