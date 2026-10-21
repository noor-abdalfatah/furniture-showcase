import type { Locale } from '@/types/furniture';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/catalog/ProductCard';

export default function FeaturedGrid({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  const items = getFeaturedProducts(3);
  if (items.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16">
      <h2 className="mb-8 text-2xl">{dict['home.featured']}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
