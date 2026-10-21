import type { Locale } from '@/types/furniture';
import { buildWhatsAppUrl, getWhatsAppNumber } from '@/lib/whatsapp';

export default function WhatsAppButton({
  productName,
  locale,
  label,
}: {
  productName: string;
  locale: Locale;
  label: string;
}) {
  const number = getWhatsAppNumber();
  if (!number) return null;
  return (
    <a
      href={buildWhatsAppUrl(number, productName, locale)}
      target="_blank"
      rel="noopener"
      className="inline-block rounded-lg bg-accent px-6 py-3 text-white transition-colors duration-150 hover:bg-accent-hover"
    >
      {label}
    </a>
  );
}
