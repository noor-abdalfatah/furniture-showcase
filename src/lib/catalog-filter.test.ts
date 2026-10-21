import { describe, it, expect } from 'vitest';
import { filterProducts } from './catalog-filter';
import type { Product } from '@/types/furniture';

const make = (slug: string, ar: string, en: string, category: Product['category']): Product => ({
  id: slug, slug, name: { ar, en }, category,
  shortDescription: { ar: '', en: '' }, description: { ar: '', en: '' },
  year: 2025, featured: false,
  dimensions: { widthCm: 1, heightCm: 1, depthCm: 1 },
  materials: [{ id: 'm', name: { ar: '', en: '' }, swatchImage: '/x.webp' }],
  images: ['/x.webp'],
});

const products = [
  make('nour-sofa', 'كنبة نور', 'Nour Sofa', 'seating'),
  make('olive-table', 'طاولة الزيتون', 'Olive Dining Table', 'tables'),
  make('corner-desk', 'مكتب زاوية', 'Corner Desk', 'tables'),
];

describe('filterProducts', () => {
  it('returns all products for a blank query and all categories', () => {
    expect(filterProducts(products, '   ', 'all', 'en')).toHaveLength(3);
  });

  it('matches case-insensitively in English', () => {
    const res = filterProducts(products, 'SOFA', 'all', 'en');
    expect(res.map((p) => p.slug)).toEqual(['nour-sofa']);
  });

  it('matches only the current locale name', () => {
    expect(filterProducts(products, 'كنبة', 'all', 'en')).toHaveLength(0);
    expect(filterProducts(products, 'كنبة', 'all', 'ar')).toHaveLength(1);
  });

  it('filters by category', () => {
    expect(filterProducts(products, '', 'tables', 'en')).toHaveLength(2);
  });

  it('combines query and category with AND', () => {
    expect(filterProducts(products, 'desk', 'seating', 'en')).toHaveLength(0);
    expect(filterProducts(products, 'desk', 'tables', 'en')).toHaveLength(1);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterProducts(products, 'zzz', 'all', 'en')).toEqual([]);
  });
});
