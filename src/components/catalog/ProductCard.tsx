import Link from 'next/link';
import Image from 'next/image';
import type { Locale, Product } from '@/types/furniture';
import { pickText } from '@/lib/i18n';

export default function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const name = pickText(product.name, locale);
  return (
    <Link
      href={`/${locale}/catalog/${product.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-150 hover:border-accent"
    >
      <div className="relative aspect-[4/3] bg-background">
        <Image
          src={product.images[0]}
          alt={name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base">{name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-text-muted">{pickText(product.shortDescription, locale)}</p>
      </div>
    </Link>
  );
}
