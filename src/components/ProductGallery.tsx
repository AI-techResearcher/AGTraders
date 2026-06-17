"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const safeImages = images.length > 0 ? images : ["/placeholder.svg"];
  const [active, setActive] = useState(0);
  const current = safeImages[active] ?? safeImages[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-square overflow-hidden rounded-card border border-border bg-neutral-100 shadow-card">
        <Image
          src={current}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {safeImages.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {safeImages.map((src, i) => {
            const isActive = i === active;
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1} of ${safeImages.length}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-neutral-100 transition focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${
                  isActive
                    ? "ring-2 ring-brand-gold ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
