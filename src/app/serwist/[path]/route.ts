import { createSerwistRoute } from '@serwist/turbopack';
import { getAllProducts } from '@/lib/products';

const LOCALES = ['ar', 'en'] as const;
const PAGES = ['', '/catalog', '/about', '/contact', '/offline'];

// Every page a visitor can open. The offline catalog depends on these being precached.
const pageUrls = LOCALES.flatMap((l) => [
  ...PAGES.map((p) => `/${l}${p}`),
  ...getAllProducts().map((p) => `/${l}/catalog/${p.slug}`),
]);

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
  swSrc: 'src/app/sw.ts',
  useNativeEsbuild: true,
  globDirectory: '.',
  // App shell JS/CSS/fonts from the build output, plus public images and manifest.
  globPatterns: ['public/**/*.{png,webp,json}', '.next/static/**/*.{js,css,woff2}'],
  additionalPrecacheEntries: pageUrls.map((url) => ({ url, revision: null })),
});
