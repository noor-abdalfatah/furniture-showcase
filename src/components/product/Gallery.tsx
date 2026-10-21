'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface">
        <Image src={images[index]} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-pressed={i === index}
              aria-label={`${alt} ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border transition-colors duration-150 ${
                i === index ? 'border-accent' : 'border-border'
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
