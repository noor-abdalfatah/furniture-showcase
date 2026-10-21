import ar from '@/i18n/ar.json';
import en from '@/i18n/en.json';
import type { Locale, LocalizedText } from '@/types/furniture';

const DICTIONARIES: Record<Locale, Record<string, string>> = { ar, en };

export function getDictionary(locale: Locale): Record<string, string> {
  return DICTIONARIES[locale];
}

export function getDir(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function swapLocaleInPath(pathname: string, to: Locale): string {
  const parts = pathname.split('/');
  if (parts[1] === 'ar' || parts[1] === 'en') {
    parts[1] = to;
    return parts.join('/');
  }
  return `/${to}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

export function pickText(text: LocalizedText, locale: Locale): string {
  return text[locale];
}
