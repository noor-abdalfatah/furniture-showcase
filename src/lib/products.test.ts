import { describe, it, expect } from 'vitest';
import { validateProducts, getProductBySlug, getFeaturedProducts } from './products';

const valid = {
  id: '1', slug: 'nour-sofa',
  name: { ar: 'كنبة نور', en: 'Nour Sofa' },
  category: 'seating',
  shortDescription: { ar: 'قصير', en: 'Short' },
  description: { ar: 'وصف', en: 'Description' },
  year: 2024, featured: true,
  dimensions: { widthCm: 200, heightCm: 80, depthCm: 90 },
  materials: [{ id: 'oak', name: { ar: 'بلوط', en: 'Oak' }, swatchImage: '/images/products/swatches/oak.webp' }],
  images: ['/images/products/nour-sofa-1.webp'],
};

describe('validateProducts', () => {
  it('returns the array when input is valid', () => {
    expect(validateProducts([valid])).toHaveLength(1);
  });

  it('throws with slug and field when name.ar is missing', () => {
    const bad = { ...valid, name: { en: 'Nour Sofa' } };
    expect(() => validateProducts([bad])).toThrow(/nour-sofa.*name\.ar/);
  });

  it('throws when images is empty', () => {
    expect(() => validateProducts([{ ...valid, images: [] }])).toThrow(/nour-sofa.*images/);
  });

  it('throws when images has more than 5 items', () => {
    const six = Array.from({ length: 6 }, (_, i) => `/i/${i}.webp`);
    expect(() => validateProducts([{ ...valid, images: six }])).toThrow(/nour-sofa.*images/);
  });

  it('throws when materials is empty or has more than 4 items', () => {
    expect(() => validateProducts([{ ...valid, materials: [] }])).toThrow(/nour-sofa.*materials/);
    const five = Array.from({ length: 5 }, (_, i) => ({ ...valid.materials[0], id: `m${i}` }));
    expect(() => validateProducts([{ ...valid, materials: five }])).toThrow(/nour-sofa.*materials/);
  });
});

describe('product getters', () => {
  it('getProductBySlug returns undefined for unknown slug', () => {
    expect(getProductBySlug('does-not-exist')).toBeUndefined();
  });

  it('getFeaturedProducts returns at most limit items, all featured', () => {
    const result = getFeaturedProducts(3);
    expect(result.length).toBeLessThanOrEqual(3);
    expect(result.every((p) => p.featured)).toBe(true);
  });
});
