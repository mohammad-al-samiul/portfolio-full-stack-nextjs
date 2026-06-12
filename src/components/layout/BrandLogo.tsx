export function BrandLogo({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-lg shadow-slate-900/5 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-950/70 dark:shadow-none">
        <svg
          viewBox="0 0 120 120"
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`:root { --bg:#ffffff; --surface:#eef2ff; --stroke:#4338ca; --accent:#1d9e75; --dot:#0f172a; } @media (prefers-color-scheme: dark) { :root { --bg:#0f172a; --surface:rgba(15,23,42,0.82); --stroke:#c7d2fe; --accent:#5eead4; --dot:#f8fafc; } }`}</style>
          <rect width="120" height="120" rx="28" fill="var(--bg)" />
          <rect
            x="12"
            y="12"
            width="96"
            height="96"
            rx="24"
            fill="var(--surface)"
          />
          <path
            d="M 36 34 L 24 60 L 36 86"
            fill="none"
            stroke="var(--stroke)"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M 84 34 L 96 60 L 84 86"
            fill="none"
            stroke="var(--accent)"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M 44 48 L 58 82 L 72 54 L 86 86"
            fill="none"
            stroke="var(--stroke)"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="60" cy="60" r="4" fill="var(--dot)" />
        </svg>
      </div>
      {!compact ? (
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-base text-foreground dark:text-white">
            Al Samiul
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Software Engineer
          </span>
        </div>
      ) : null}
    </div>
  );
}
