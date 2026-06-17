"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type ServiceSlide = {
  slug: string;
  name: string;
  tagline: string | null;
  image: string | null;
};

export function ServicesSlider({ services }: { services: ServiceSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = services.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  // Track prefers-reduced-motion so we can gate the auto-advance interval.
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (count <= 1 || paused || reduceMotion) return;
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % count),
      6000
    );
    return () => clearInterval(timer);
  }, [count, paused, reduceMotion]);

  if (count === 0) {
    return <p className="text-neutral-500">No services available yet.</p>;
  }

  return (
    <div
      className="group/slider relative overflow-hidden rounded-card border border-white/10 bg-brand-navy shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {services.map((service, i) => (
          <div key={service.slug} className="relative w-full shrink-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
              {service.image && (
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className={`object-cover opacity-60 transition-transform duration-[8000ms] ease-out motion-reduce:transform-none ${
                    i === index ? "scale-110" : "scale-100"
                  }`}
                  sizes="100vw"
                  priority={service.slug === services[0].slug}
                />
              )}
              {/* Stronger scrim for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-brand-navy/70 to-brand-navy/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                  {service.name}
                </h3>
                {service.tagline && (
                  <p className="mt-2 max-w-xl text-sm text-neutral-200 sm:text-base">
                    {service.tagline}
                  </p>
                )}
                <Link
                  href={`/services/${service.slug}`}
                  className="btn-primary mt-5 w-fit"
                >
                  Register for this service
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M4 10h12m0 0-4-4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous service"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand-navy shadow ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M12 4 6 10l6 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next service"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand-navy shadow ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M8 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {services.map((service, i) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to ${service.name}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-brand-gold" : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
