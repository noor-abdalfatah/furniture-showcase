import Link from 'next/link';
import type { Locale } from '@/types/furniture';
import { getDictionary } from '@/lib/i18n';

export default async function OfflinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return (
    <section className="mx-auto flex max-w-[720px] flex-col gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl">{dict['offline.title']}</h1>
      <p className="text-text-muted">{dict['offline.body']}</p>
      <Link href={`/${locale}/catalog`} className="mx-auto mt-4 rounded-lg bg-accent px-6 py-3 text-white transition-colors duration-150 hover:bg-accent-hover">
        {dict['nav.catalog']}
      </Link>
    </section>
  );
}
