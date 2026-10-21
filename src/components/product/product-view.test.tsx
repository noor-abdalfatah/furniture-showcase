import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';
import MaterialSwatches from './MaterialSwatches';
import WhatsAppButton from './WhatsAppButton';

describe('Gallery', () => {
  it('renders a single image with no thumbnail row (nothing to switch between)', () => {
    render(<Gallery images={['/images/products/a.webp']} alt="Nour Sofa" />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByAltText('Nour Sofa')).toBeTruthy();
  });
});

describe('MaterialSwatches', () => {
  it('renders one swatch for a single material', () => {
    render(
      <MaterialSwatches
        locale="en"
        materials={[{ id: 'oak', name: { ar: 'بلوط', en: 'Oak' }, swatchImage: '/s/oak.webp' }]}
      />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
  });
});

describe('WhatsAppButton', () => {
  const original = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  afterEach(() => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = original;
  });

  it('renders nothing when the number is unset', () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '';
    const { container } = render(<WhatsAppButton productName="Nour Sofa" locale="en" label="Contact" />);
    expect(container.innerHTML).toBe('');
  });

  it('renders a wa.me link when the number is set', () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '970591234567';
    render(<WhatsAppButton productName="Nour Sofa" locale="en" label="Contact" />);
    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link.getAttribute('href')).toContain('https://wa.me/970591234567?text=');
  });
});
