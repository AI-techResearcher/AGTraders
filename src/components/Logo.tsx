import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
  showText?: boolean;
  className?: string;
};

export function Logo({ variant = "dark", showText = true, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/ag-traders-logo.png"
        alt="AG Traders"
        width={showText ? 48 : 140}
        height={showText ? 48 : 48}
        className={
          showText
            ? "h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
            : "h-10 w-auto shrink-0 object-contain sm:h-12"
        }
        priority
      />
      {showText && (
        <span
          className={`text-lg font-bold tracking-wide sm:text-xl ${
            variant === "light" ? "text-brand-gold" : "text-brand-navy"
          }`}
        >
          AG Traders
        </span>
      )}
    </Link>
  );
}
