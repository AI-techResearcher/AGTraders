"use client";

import { useActionState } from "react";
import { loginAction, type ActionResult } from "@/app/admin/actions";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, {} as ActionResult);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="from" value={redirectTo} />
      <div>
        <label className="block text-sm font-medium text-neutral-700">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="input mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">Password</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="input mt-1 w-full"
        />
      </div>
      {state?.error && (
        <p className="rounded-btn bg-danger-soft px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
