import rawProducts from '@/data/products.json';
import type { Product, LocalizedText } from '@/types/furniture';

const CATEGORIES = ['seating', 'tables', 'storage', 'lighting', 'beds'];

function fail(slug: string, field: string): never {
  throw new Error(`Invalid product "${slug}": ${field}`);
}

function checkText(t: unknown, slug: string, field: string): void {
  const v = t as Partial<LocalizedText> | undefined;
  if (!v || typeof v.ar !== 'string' || !v.ar.trim()) fail(slug, `${field}.ar`);
  if (typeof v.en !== 'string' || !v.en.trim()) fail(slug, `${field}.en`);
}

export function validateProducts(input: unknown): Product[] {
  if (!Array.isArray(input)) throw new Error('products must be an array');
  for (const p of input as Array<Record<string, unknown>>) {
    const slug = String(p.slug ?? '(no slug)');
    if (typeof p.slug !== 'string' || !p.slug) fail(slug, 'slug');
    checkText(p.name, slug, 'name');
    checkText(p.shortDescription, slug, 'shortDescription');
    checkText(p.description, slug, 'description');
    if (!CATEGORIES.includes(p.category as string)) fail(slug, 'category');
    if (!Array.isArray(p.images) || p.images.length < 1 || p.images.length > 5) fail(slug, 'images');
    if (!Array.isArray(p.materials) || p.materials.length < 1 || p.materials.length > 4) fail(slug, 'materials');
  }
  return input as Product[];
}

const ALL = validateProducts(rawProducts);

export function getAllProducts(): Product[] {
  return ALL;
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit: number): Product[] {
  return ALL.filter((p) => p.featured).slice(0, limit);
}
