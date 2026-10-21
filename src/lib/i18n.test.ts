import { describe, it, expect } from 'vitest';
import ar from '@/i18n/ar.json';
import en from '@/i18n/en.json';
import { getDictionary, getDir, swapLocaleInPath, pickText } from './i18n';

describe('i18n', () => {
  it('ar and en dictionaries have identical keys', () => {
    expect(Object.keys(ar).sort()).toEqual(Object.keys(en).sort());
  });

  it('getDictionary returns the matching dictionary', () => {
    expect(getDictionary('en')).toEqual(en);
    expect(getDictionary('ar')).toEqual(ar);
  });

  it('getDir maps locale to direction', () => {
    expect(getDir('ar')).toBe('rtl');
    expect(getDir('en')).toBe('ltr');
  });

  it('swapLocaleInPath keeps the rest of the path', () => {
    expect(swapLocaleInPath('/ar/catalog/nour-sofa', 'en')).toBe('/en/catalog/nour-sofa');
  });

  it('swapLocaleInPath prefixes the locale when missing', () => {
    expect(swapLocaleInPath('/catalog', 'ar')).toBe('/ar/catalog');
  });

  it('pickText returns the text for the locale', () => {
    expect(pickText({ ar: 'مرحبا', en: 'Hi' }, 'en')).toBe('Hi');
    expect(pickText({ ar: 'مرحبا', en: 'Hi' }, 'ar')).toBe('مرحبا');
  });
});
