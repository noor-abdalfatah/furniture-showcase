import { SITE_NAME } from '@/lib/site';

// Simple mark: an accent square with a chair-leg line motif, plus the wordmark.
export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="#A68A64" />
        <path d="M8 9h12M9 9v10M19 9v10M11 14h6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <span className="font-semibold tracking-tight">{SITE_NAME}</span>
    </span>
  );
}
