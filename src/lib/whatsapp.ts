import type { Locale } from '@/types/furniture';

const TEMPLATES: Record<Locale, (name: string) => string> = {
  ar: (name) => `مرحباً، أنا مهتم بالقطعة: ${name}`,
  en: (name) => `Hello, I'm interested in: ${name}`,
};

export function buildWhatsAppUrl(number: string, productName: string, locale: Locale): string {
  const text = encodeURIComponent(TEMPLATES[locale](productName));
  return `https://wa.me/${number}?text=${text}`;
}

export function getWhatsAppNumber(): string | undefined {
  const value = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  return value ? value : undefined;
}
