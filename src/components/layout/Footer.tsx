import Link from 'next/link';
import type { Locale } from '@/types/furniture';
import { SITE_NAME, SITE_YEAR } from '@/lib/site';

export default function Footer({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {SITE_YEAR} {SITE_NAME}
        </span>
        <Link href={`/${locale}/contact`} className="transition-colors duration-150 hover:text-accent">
          {dict['nav.contact']}
        </Link>
      </div>
    </footer>
  );
}
