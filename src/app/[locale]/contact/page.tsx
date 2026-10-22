import Link from 'next/link';
import type { Locale } from '@/types/furniture';
import { getDictionary } from '@/lib/i18n';
import { buildWhatsAppMessageUrl, getWhatsAppNumber } from '@/lib/whatsapp';
import contact from '@/data/contact.json';

const GENERIC_MESSAGE: Record<Locale, string> = {
  ar: 'مرحباً، أريد الاستفسار عن أعمالك.',
  en: 'Hello, I would like to ask about your work.',
};

const linkClass =
  'inline-block w-fit rounded-lg border border-border px-5 py-2.5 transition-colors duration-150 hover:border-accent';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const number = getWhatsAppNumber();
  const socials = [
    { label: dict['contact.instagram'], url: contact.instagram },
    { label: dict['contact.facebook'], url: contact.facebook },
  ].filter((s) => s.url);

  return (
    <section className="mx-auto flex max-w-[720px] flex-col gap-8 px-4 py-16">
      <h1 className="text-3xl">{dict['nav.contact']}</h1>

      {contact.email && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-muted">{dict['contact.email']}</span>
          <a href={`mailto:${contact.email}`} className="w-fit transition-colors duration-150 hover:text-accent">
            <span dir="ltr">{contact.email}</span>
          </a>
        </div>
      )}

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

      {socials.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-sm text-text-muted">{dict['contact.follow']}</span>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <Link key={s.label} href={s.url} target="_blank" rel="noopener" className={linkClass}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
