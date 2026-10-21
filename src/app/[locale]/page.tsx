import type { Locale } from '@/types/furniture';
import { getDictionary } from '@/lib/i18n';
import Hero from '@/components/home/Hero';
import FeaturedGrid from '@/components/home/FeaturedGrid';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return (
    <>
      <Hero locale={locale} dict={dict} />
      <FeaturedGrid locale={locale} dict={dict} />
    </>
  );
}
