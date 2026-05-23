"use client";

import { useActionState } from "react";
import { loginAction, type ActionResult } from "@/app/admin/actions";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, {} as ActionResult);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="from" value={redirectTo} />
      <div>
        <label className="block text-sm font-medium text-zinc-700">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Password</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand-gold py-3 font-semibold text-brand-navy hover:bg-brand-gold-light disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
