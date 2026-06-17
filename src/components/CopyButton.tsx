"use client";

import { useState } from "react";

type Props = {
  value: string;
  label?: string;
};

export function CopyButton({ value, label }: Props) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label ? `Copy ${label}` : "Copy to clipboard"}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-btn border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-gold hover:bg-brand-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-1"
    >
      {copied ? (
        <>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 text-success"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.33a1 1 0 0 1-1.424 0l-3.75-3.79a1 1 0 1 1 1.418-1.41l3.038 3.07 6.538-6.61a1 1 0 0 1 1.414-.005Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-success">Copied</span>
        </>
      ) : (
        <>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-3.5 w-3.5"
          >
            <rect x="7" y="7" width="9" height="9" rx="1.5" />
            <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
