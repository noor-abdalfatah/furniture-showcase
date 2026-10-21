import { describe, it, expect, afterEach } from 'vitest';
import { buildWhatsAppUrl, getWhatsAppNumber } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  it('encodes the English message with the product name', () => {
    const url = buildWhatsAppUrl('970591234567', 'Nour Sofa', 'en');
    expect(url).toBe(
      "https://wa.me/970591234567?text=" + encodeURIComponent("Hello, I'm interested in: Nour Sofa")
    );
  });

  it('round-trips the Arabic message with an Arabic product name', () => {
    const url = buildWhatsAppUrl('970591234567', 'كنبة نور', 'ar');
    const text = new URL(url).searchParams.get('text');
    expect(text).toBe('مرحباً، أنا مهتم بالقطعة: كنبة نور');
  });
});

describe('getWhatsAppNumber', () => {
  const original = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  afterEach(() => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = original;
  });

  it('returns undefined when the env var is empty', () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '';
    expect(getWhatsAppNumber()).toBeUndefined();
  });

  it('returns the number when set', () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '970591234567';
    expect(getWhatsAppNumber()).toBe('970591234567');
  });
});
