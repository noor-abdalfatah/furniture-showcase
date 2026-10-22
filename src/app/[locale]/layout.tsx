import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import type { Locale } from '@/types/furniture';
import { getDictionary, getDir } from '@/lib/i18n';
import { fontArabic, fontLatin } from '@/lib/fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: SITE_NAME,
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F4EF',
};

const LOCALES: Locale[] = ['ar', 'en'];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (raw !== 'ar' && raw !== 'en') notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} dir={getDir(locale)} className={`${fontArabic.variable} ${fontLatin.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Navbar locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <ServiceWorkerRegister />
        <InstallPrompt dict={dict} />
      </body>
    </html>
  );
}
