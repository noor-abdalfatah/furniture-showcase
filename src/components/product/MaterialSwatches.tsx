'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Locale, Material } from '@/types/furniture';
import { pickText } from '@/lib/i18n';

export default function MaterialSwatches({ materials, locale }: { materials: Material[]; locale: Locale }) {
  const [selectedId, setSelectedId] = useState(materials[0].id);
  const selected = materials.find((m) => m.id === selectedId) ?? materials[0];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-3">
        {materials.map((m) => {
          const active = m.id === selected.id;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={active}
              aria-label={pickText(m.name, locale)}
              onClick={() => setSelectedId(m.id)}
              className={`relative h-12 w-12 overflow-hidden rounded-lg border-2 transition-colors duration-150 ${
                active ? 'border-accent' : 'border-border'
              }`}
            >
              <Image src={m.swatchImage} alt="" fill sizes="48px" className="object-cover" />
            </button>
          );
        })}
      </div>
      <p className="text-sm text-text-muted">{pickText(selected.name, locale)}</p>
    </div>
  );
}
