import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

type Props = { searchParams: Promise<{ from?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy px-4">
      <div className="w-full max-w-md rounded-card border border-border bg-surface p-8 shadow-card">
        <div className="text-center">
          <Image
            src="/ag-traders-logo.png"
            alt="AG Traders"
            width={140}
            height={48}
            className="mx-auto h-12 w-auto object-contain"
          />
          <h1 className="mt-4 text-xl font-bold text-brand-navy">Admin login</h1>
          <p className="mt-1 text-sm text-muted">AG Traders store management</p>
        </div>
        <div className="mt-8">
          <LoginForm redirectTo={params.from ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}
