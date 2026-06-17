"use client";

import type { ReactNode } from "react";

type ConfirmButtonProps = {
  /** Confirmation prompt shown before the form submits. */
  message: string;
  children: ReactNode;
  className?: string;
};

/**
 * Submit button that asks for confirmation before allowing its parent <form>
 * to submit. Drop-in replacement for a bare delete <button> — the surrounding
 * form and its server action are untouched.
 */
export function ConfirmButton({
  message,
  children,
  className = "btn-danger",
}: ConfirmButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
