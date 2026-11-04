// Hand-drawn academic doodles. Single-stroke SVGs in currentColor so they take
// the section's blue. Add `doodle-draw` to have them draw in on scroll.

type P = { className?: string; draw?: boolean; style?: React.CSSProperties };

const base = (draw?: boolean, className = "") => `doodle ${draw ? "doodle-draw" : ""} ${className}`;
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Squiggle({ className, draw, style }: P) {
  return (
    <svg viewBox="0 0 220 24" className={base(draw, className)} style={style} aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={5}
        style={{ ["--len" as string]: 260 }}
        d="M4 16c18-10 30-10 44-2s28 8 44-2 30-10 44-2 28 8 44-2 22-6 36-2"
      />
    </svg>
  );
}

export function CurlyArrow({ className, draw, style }: P) {
  return (
    <svg viewBox="0 0 120 90" className={base(draw, className)} style={style} aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={3}
        style={{ ["--len" as string]: 220 }}
        d="M6 12c30-6 58 4 62 26 3 16-14 22-20 12-6-11 10-20 26-14 18 7 28 24 32 44"
      />
      <path {...stroke} strokeWidth={3} style={{ ["--len" as string]: 40 }} d="M96 70l10 12 8-15" />
    </svg>
  );
}

export function Sparkle({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 40" className={`doodle ${className ?? ""}`} style={style} aria-hidden="true">
      <path {...stroke} strokeWidth={3} d="M20 3v12M20 25v12M3 20h12M25 20h12" />
    </svg>
  );
}

export function SineWave({ className, draw, style }: P) {
  return (
    <svg viewBox="0 0 200 70" className={base(draw, className)} style={style} aria-hidden="true">
      <path {...stroke} strokeWidth={2} opacity={0.5} style={{ ["--len" as string]: 200 }} d="M4 35h192" />
      <path
        {...stroke}
        strokeWidth={3.2}
        style={{ ["--len" as string]: 300 }}
        d="M6 35C22 4 38 4 54 35s32 31 48 0 32-31 48 0 32 31 46 4"
      />
    </svg>
  );
}

// Advanced Functions: unit circle with an angle, and a log curve.
export function FunctionsDoodle({ className, draw, style }: P) {
  return (
    <svg viewBox="0 0 220 180" className={base(draw, className)} style={style} aria-hidden="true">
      <circle {...stroke} strokeWidth={3} cx="78" cy="96" r="58" style={{ ["--len" as string]: 380 }} />
      <path {...stroke} strokeWidth={2} opacity={0.55} d="M8 96h146M78 26v140" style={{ ["--len" as string]: 300 }} />
      <path {...stroke} strokeWidth={3} d="M78 96l42-40" style={{ ["--len" as string]: 70 }} />
      <path {...stroke} strokeWidth={2.4} d="M100 96c0-8-3-14-8-19" style={{ ["--len" as string]: 30 }} />
      <path
        {...stroke}
        strokeWidth={3}
        d="M150 168c4-40 10-70 22-92s26-34 44-40"
        style={{ ["--len" as string]: 170 }}
      />
      <text x="104" y="88" className="font-hand" fontSize="20" fill="currentColor" stroke="none">
        θ
      </text>
      <text x="158" y="28" className="font-hand" fontSize="22" fill="currentColor" stroke="none">
        log x
      </text>
    </svg>
  );
}

// Calculus: a curve with its tangent line and dy/dx.
export function CalculusDoodle({ className, draw, style }: P) {
  return (
    <svg viewBox="0 0 220 170" className={base(draw, className)} style={style} aria-hidden="true">
      <path {...stroke} strokeWidth={2} opacity={0.55} d="M14 150h196M24 160V10" style={{ ["--len" as string]: 360 }} />
      <path
        {...stroke}
        strokeWidth={3.2}
        d="M28 140c30-6 48-30 66-62s40-50 78-56"
        style={{ ["--len" as string]: 240 }}
      />
      <path {...stroke} strokeWidth={2.6} d="M40 128L168 30" style={{ ["--len" as string]: 170 }} />
      <circle cx="104" cy="79" r="5" fill="currentColor" stroke="none" />
      <text x="140" y="104" className="font-hand" fontSize="26" fill="currentColor" stroke="none">
        dy/dx
      </text>
    </svg>
  );
}

// Physics: projectile path with velocity vectors.
export function PhysicsDoodle({ className, draw, style }: P) {
  return (
    <svg viewBox="0 0 220 170" className={base(draw, className)} style={style} aria-hidden="true">
      <path {...stroke} strokeWidth={2} opacity={0.55} d="M10 150h200" style={{ ["--len" as string]: 200 }} />
      <path
        {...stroke}
        strokeWidth={3}
        d="M20 148C60 20 150 20 196 148"
        style={{ strokeDasharray: "2 9", strokeDashoffset: 0 }}
      />
      <circle {...stroke} strokeWidth={3} cx="108" cy="52" r="10" style={{ ["--len" as string]: 70 }} />
      <path {...stroke} strokeWidth={3} d="M118 52h46m-10-8l10 8-10 8" style={{ ["--len" as string]: 90 }} />
      <path {...stroke} strokeWidth={3} d="M108 62v40m-8-10l8 10 8-10" style={{ ["--len" as string]: 80 }} />
      <text x="168" y="46" className="font-hand" fontSize="22" fill="currentColor" stroke="none">
        v
      </text>
      <text x="118" y="104" className="font-hand" fontSize="22" fill="currentColor" stroke="none">
        g
      </text>
    </svg>
  );
}

// Small line-art academic stickers for the hero (BrightFuture-style floating icons).
export function StickerIcon({
  name,
  className = "",
  style,
}: {
  name: "book" | "calculator" | "atom";
  className?: string;
  style?: React.CSSProperties;
}) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <span
      className={`float grid h-14 w-14 place-items-center rounded-2xl bg-white text-blue shadow-[0_14px_28px_-16px_rgba(30,42,68,0.45)] ring-1 ring-line ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7">
        {name === "book" && <path {...p} d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5m0-13c2-1.5 5-2 8-1.5v13c-3-.5-6 0-8 1.5m0-13v13" />}
        {name === "calculator" && (
          <>
            <rect {...p} x="5" y="3" width="14" height="18" rx="2.5" />
            <path {...p} d="M8 7h8M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15v2.5M8.5 18h.01M12 18h.01" />
          </>
        )}
        {name === "atom" && (
          <>
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
            <ellipse {...p} cx="12" cy="12" rx="9" ry="3.6" />
            <ellipse {...p} cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
            <ellipse {...p} cx="12" cy="12" rx="9" ry="3.6" transform="rotate(-60 12 12)" />
          </>
        )}
      </svg>
    </span>
  );
}

export function Underline({ className, draw, style }: P) {
  return (
    <svg viewBox="0 0 300 28" preserveAspectRatio="none" className={base(draw, className)} style={style} aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={7}
        style={{ ["--len" as string]: 330 }}
        d="M6 18c60-9 140-13 200-10 34 2 62 5 88 9"
      />
    </svg>
  );
}
