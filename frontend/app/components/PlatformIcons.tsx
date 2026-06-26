'use client';

export function ClutchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor">
      <circle cx="16" cy="16" r="16"/>
      <path fill="white" d="M21.06 22.48a8.1 8.1 0 01-4.19 1.16c-2.1 0-3.88-.7-5.33-2.08C10.1 20.2 9.37 18.43 9.37 16.3c0-2.15.73-3.93 2.17-5.3 1.45-1.38 3.23-2.08 5.33-2.08 1.55 0 2.95.39 4.19 1.16v3.87c-1.09-1.12-2.33-1.68-3.71-1.68-1.18 0-2.17.4-2.98 1.19-.81.79-1.22 1.78-1.22 2.96 0 1.18.4 2.17 1.22 2.96.81.8 1.8 1.19 2.98 1.19 1.39 0 2.63-.56 3.71-1.67v3.58z"/>
    </svg>
  );
}

export function GoodFirmsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="currentColor"/>
      <g fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9A6 6 0 1 0 16.5 15"/>
        <path d="M16.5 12H12"/>
      </g>
    </svg>
  );
}

export function UpworkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
    </svg>
  );
}

type Platform = 'Clutch' | 'GoodFirms' | 'Upwork';

export function PlatformBadge({ platform }: { platform: Platform }) {
  if (platform === 'Clutch') return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/12 border border-red-500/25 text-red-400 text-[10px] font-bold">
      <ClutchIcon className="w-3.5 h-3.5" />
      Clutch
    </span>
  );
  if (platform === 'GoodFirms') return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/12 border border-blue-500/25 text-blue-400 text-[10px] font-bold">
      <GoodFirmsIcon className="w-3.5 h-3.5" />
      GoodFirms
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/12 border border-green-500/25 text-green-400 text-[10px] font-bold">
      <UpworkIcon className="w-3.5 h-3.5" />
      Upwork
    </span>
  );
}
