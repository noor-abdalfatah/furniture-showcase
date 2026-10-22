import type { Locale } from '@/types/furniture';
import { getAllProducts } from '@/lib/products';
import { getDictionary } from '@/lib/i18n';
import CatalogBrowser from '@/components/catalog/CatalogBrowser';

// Locale is read from params; block navigation until it resolves (static per locale).
export const instant = false;

export default async function CatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <CatalogBrowser products={getAllProducts()} locale={locale} dict={getDictionary(locale)} />
    </div>
  );
}
