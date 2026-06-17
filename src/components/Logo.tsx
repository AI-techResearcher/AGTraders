import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
  showText?: boolean;
  className?: string;
  size?: "md" | "lg";
};

const markClasses: Record<NonNullable<LogoProps["size"]>, string> = {
  md: "h-10 w-auto sm:h-12",
  lg: "h-12 w-auto sm:h-16",
};

export function Logo({
  variant = "dark",
  showText = true,
  className = "",
  size = "md",
}: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/ag-traders-logo.png"
        alt="AG Traders"
        width={showText ? 48 : 200}
        height={showText ? 48 : 64}
        className={
          showText
            ? "h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
            : `${markClasses[size]} shrink-0 object-contain`
        }
        priority
      />
      {showText && (
        <span
          className={`font-display text-lg font-bold tracking-wide sm:text-xl ${
            variant === "light" ? "text-brand-gold" : "text-brand-navy"
          }`}
        >
          AG Traders
        </span>
      )}
    </Link>
  );
}
