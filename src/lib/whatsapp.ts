import type { Locale } from '@/types/furniture';

const TEMPLATES: Record<Locale, (name: string) => string> = {
  ar: (name) => `مرحباً، أنا مهتم بالقطعة: ${name}`,
  en: (name) => `Hello, I'm interested in: ${name}`,
};

export function buildWhatsAppMessageUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppUrl(number: string, productName: string, locale: Locale): string {
  return buildWhatsAppMessageUrl(number, TEMPLATES[locale](productName));
}

export function getWhatsAppNumber(): string | undefined {
  const value = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  return value ? value : undefined;
}
