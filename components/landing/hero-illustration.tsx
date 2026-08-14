export function HeroIllustration() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl" />
      <svg
        viewBox="0 0 400 400"
        className="relative mx-auto w-full max-w-md"
        role="img"
        aria-label="Ilustrasi simulasi psikotes"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="150" fill="none" stroke="url(#grad)" strokeWidth="2" opacity="0.3" />
        <circle cx="200" cy="200" r="115" fill="none" stroke="url(#grad)" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.4" />

        <rect x="90" y="90" width="90" height="90" rx="14" fill="white" stroke="url(#grad)" strokeWidth="3" />
        <circle cx="135" cy="125" r="22" fill="#2563eb" opacity="0.85" />
        <path d="M100 160 l20 -18 l15 12 l15 -22 l20 28" fill="none" stroke="#10b981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M115 155 h40 v10 h-40 z" fill="#f59e0b" opacity="0.9" />

        <rect x="220" y="90" width="90" height="90" rx="14" fill="white" stroke="url(#grad)" strokeWidth="3" />
        <path d="M230 160 l35 -45 l10 14 l10 -12 l15 18 l15 -25 v50 z" fill="#8b5cf6" opacity="0.9" />
        <path d="M250 145 l15 -18 l8 10" fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />

        <rect x="90" y="220" width="90" height="90" rx="14" fill="white" stroke="url(#grad)" strokeWidth="3" />
        <circle cx="135" cy="250" r="26" fill="#0ea5e9" opacity="0.2" stroke="#0ea5e9" strokeWidth="3" />
        <circle cx="135" cy="250" r="14" fill="#0ea5e9" />
        <rect x="108" y="288" width="54" height="8" rx="4" fill="#94a3b8" />
        <rect x="118" y="272" width="34" height="8" rx="4" fill="#94a3b8" />

        <rect x="220" y="220" width="90" height="90" rx="14" fill="white" stroke="url(#grad)" strokeWidth="3" />
        <polygon points="265,232 285,272 245,272" fill="#f43f5e" />
        <rect x="240" y="280" width="50" height="6" rx="3" fill="#94a3b8" />
        <circle cx="265" cy="296" r="4" fill="#2563eb" />
        <circle cx="283" cy="296" r="4" fill="#10b981" />

        <g opacity="0.9">
          <circle cx="72" cy="70" r="8" fill="#2563eb" />
          <circle cx="330" cy="60" r="6" fill="#10b981" />
          <circle cx="352" cy="200" r="7" fill="#f59e0b" />
          <circle cx="60" cy="240" r="5" fill="#8b5cf6" />
          <circle cx="330" cy="340" r="9" fill="#f43f5e" />
          <circle cx="90" cy="350" r="6" fill="#0ea5e9" />
        </g>

        <g fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.6">
          <circle cx="200" cy="200" r="180" />
          <path d="M20 200 h360" />
          <path d="M200 20 v360" />
        </g>
      </svg>
    </div>
  );
}