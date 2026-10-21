export type Locale = 'ar' | 'en';

export type Category = 'seating' | 'tables' | 'storage' | 'lighting' | 'beds';

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Material {
  id: string;
  name: LocalizedText;
  swatchImage: string;
}

export interface Dimensions {
  widthCm: number;
  heightCm: number;
  depthCm: number;
  weightKg?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  category: Category;
  shortDescription: LocalizedText;
  description: LocalizedText;
  year: number;
  featured: boolean;
  dimensions: Dimensions;
  materials: Material[];
  images: string[];
}
