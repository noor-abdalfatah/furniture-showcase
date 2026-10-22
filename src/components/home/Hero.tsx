import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/types/furniture';

export default function Hero({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />
      <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-12">
        <h1 className="max-w-xl text-3xl font-bold text-white md:text-5xl">{dict['home.hero.title']}</h1>
        <Link
          href={`/${locale}/catalog`}
          className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-white transition-colors duration-150 hover:bg-accent-hover"
        >
          {dict['home.hero.cta']}
        </Link>
      </div>
    </section>
  );
}
