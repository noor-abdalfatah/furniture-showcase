import type { Locale } from '@/types/furniture';
import { getDictionary } from '@/lib/i18n';
import { buildWhatsAppMessageUrl, getWhatsAppNumber } from '@/lib/whatsapp';

const GENERIC_MESSAGE: Record<Locale, string> = {
  ar: 'مرحباً، أريد الاستفسار عن أعمالك.',
  en: 'Hello, I would like to ask about your work.',
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const number = getWhatsAppNumber();
  return (
    <section className="mx-auto flex max-w-[720px] flex-col gap-6 px-4 py-16">
      <h1 className="text-3xl">{dict['nav.contact']}</h1>
      <p className="text-text-muted">placeholder@example.com</p>
      {number && (
        <a
          href={buildWhatsAppMessageUrl(number, GENERIC_MESSAGE[locale])}
          target="_blank"
          rel="noopener"
          className="inline-block w-fit rounded-lg bg-accent px-6 py-3 text-white transition-colors duration-150 hover:bg-accent-hover"
        >
          {dict['product.whatsapp']}
        </a>
      )}
    </section>
  );
}
