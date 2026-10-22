import { notFound } from 'next/navigation';
import type { Locale } from '@/types/furniture';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import { getDictionary, pickText } from '@/lib/i18n';
import Gallery from '@/components/product/Gallery';
import MaterialSwatches from '@/components/product/MaterialSwatches';
import DimensionsTable from '@/components/product/DimensionsTable';
import WhatsAppButton from '@/components/product/WhatsAppButton';

// Locale is read from params; block navigation until it resolves (static per locale).
export const instant = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const dict = getDictionary(locale);
  const name = pickText(product.name, locale);

  return (
    <article className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 md:grid-cols-2">
      <Gallery images={product.images} alt={name} />
      <div className="flex flex-col gap-6">
        <header>
          <p className="text-sm text-text-muted">
            {dict[`category.${product.category}`]} · {product.year}
          </p>
          <h1 className="mt-1 text-3xl">{name}</h1>
        </header>
        <p className="leading-relaxed">{pickText(product.description, locale)}</p>
        <section className="flex flex-col gap-3">
          <h2 className="text-lg">{dict['product.materials']}</h2>
          <MaterialSwatches materials={product.materials} locale={locale} />
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="text-lg">{dict['product.dimensions']}</h2>
          <DimensionsTable dimensions={product.dimensions} dict={dict} />
        </section>
        <div>
          <WhatsAppButton productName={name} locale={locale} label={dict['product.whatsapp']} />
        </div>
      </div>
    </article>
  );
}
