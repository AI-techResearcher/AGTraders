"use client";

import { useRouter, usePathname } from "next/navigation";
import { FormEvent } from "react";

export function AdminSearch({
  placeholder,
  paramName = "q",
  defaultValue = "",
}: {
  placeholder: string;
  paramName?: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get(paramName)?.toString().trim();
    const params = new URLSearchParams(window.location.search);
    if (q) params.set(paramName, q);
    else params.delete(paramName);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        name={paramName}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input min-w-0 flex-1 sm:max-w-xs"
      />
      <button type="submit" className="btn-secondary shrink-0">
        Search
      </button>
    </form>
  );
}
