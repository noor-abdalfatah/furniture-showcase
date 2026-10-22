'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Locale } from '@/types/furniture';
import Logo from './Logo';
import LanguageSwitch from './LanguageSwitch';

export default function Navbar({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: `/${locale}`, label: dict['nav.home'] },
    { href: `/${locale}/catalog`, label: dict['nav.catalog'] },
    { href: `/${locale}/about`, label: dict['nav.about'] },
    { href: `/${locale}/contact`, label: dict['nav.contact'] },
  ];
  const linkClass = 'text-sm transition-colors duration-150 hover:text-accent';

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-4">
        <Link href={`/${locale}`} aria-label={`${dict['nav.home']}`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitch locale={locale} label={dict['lang.switch']} />
          <button
            type="button"
            className="p-1 md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
