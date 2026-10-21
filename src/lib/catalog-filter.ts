import type { Category, Locale, Product } from '@/types/furniture';
import { pickText } from './i18n';

export function filterProducts(
  products: Product[],
  query: string,
  category: Category | 'all',
  locale: Locale,
): Product[] {
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    if (category !== 'all' && p.category !== category) return false;
    if (!q) return true;
    return pickText(p.name, locale).toLowerCase().includes(q);
  });
}
