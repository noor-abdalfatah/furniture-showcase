import Link from 'next/link';
import type { Locale } from '@/types/furniture';
import { SITE_NAME, SITE_YEAR } from '@/lib/site';
import contact from '@/data/contact.json';

export default function Footer({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  const socials = [
    { label: dict['contact.instagram'], url: contact.instagram },
    { label: dict['contact.facebook'], url: contact.facebook },
  ].filter((s) => s.url);

  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {SITE_YEAR} {SITE_NAME}
        </span>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <Link key={s.label} href={s.url} target="_blank" rel="noopener" className="transition-colors duration-150 hover:text-accent">
              {s.label}
            </Link>
          ))}
          <Link href={`/${locale}/contact`} className="transition-colors duration-150 hover:text-accent">
            {dict['nav.contact']}
          </Link>
        </div>
      </div>
    </footer>
  );
}
