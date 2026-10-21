'use client';

import { useMemo, useState } from 'react';
import type { Category, Locale, Product } from '@/types/furniture';
import { filterProducts } from '@/lib/catalog-filter';
import SearchBox from './SearchBox';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';

const CATEGORIES: Category[] = ['seating', 'tables', 'storage', 'lighting', 'beds'];

export default function CatalogBrowser({
  products,
  locale,
  dict,
}: {
  products: Product[];
  locale: Locale;
  dict: Record<string, string>;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');

  const results = useMemo(
    () => filterProducts(products, query, category, locale),
    [products, query, category, locale],
  );

  const options = [
    { value: 'all', label: dict['catalog.allCategories'] },
    ...CATEGORIES.map((c) => ({ value: c, label: dict[`category.${c}`] })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <SearchBox value={query} onChange={setQuery} placeholder={dict['catalog.search']} />
      <CategoryFilter value={category} onChange={(v) => setCategory(v as Category | 'all')} options={options} />
      {results.length === 0 ? (
        <p className="py-16 text-center text-text-muted">{dict['catalog.empty']}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
