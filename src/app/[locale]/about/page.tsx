import type { Locale } from '@/types/furniture';
import { pickText } from '@/lib/i18n';
import aboutData from '@/data/about.json';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const about = aboutData as {
    title: { ar: string; en: string };
    story: { ar: string; en: string };
    process: { ar: string; en: string };
  };
  return (
    <article className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="mb-8 text-3xl">{pickText(about.title, locale)}</h1>
      <p className="mb-6 leading-relaxed">{pickText(about.story, locale)}</p>
      <p className="leading-relaxed text-text-muted">{pickText(about.process, locale)}</p>
    </article>
  );
}
