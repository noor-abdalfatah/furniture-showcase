'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/types/furniture';
import { swapLocaleInPath } from '@/lib/i18n';

export default function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const target: Locale = locale === 'ar' ? 'en' : 'ar';
  return (
    <Link
      href={swapLocaleInPath(pathname, target)}
      className="text-sm text-text-muted transition-colors duration-150 hover:text-accent"
      hrefLang={target}
    >
      {label}
    </Link>
  );
}
