import localFont from 'next/font/local';

// Self-hosted (via @fontsource) so fonts work offline and are precached by the service worker.
export const fontArabic = localFont({
  variable: '--font-arabic',
  display: 'swap',
  src: [
    { path: '../fonts/tajawal-arabic-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/tajawal-arabic-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/tajawal-arabic-700-normal.woff2', weight: '700', style: 'normal' },
  ],
});

export const fontLatin = localFont({
  variable: '--font-latin',
  display: 'swap',
  src: [
    { path: '../fonts/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/inter-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
});
