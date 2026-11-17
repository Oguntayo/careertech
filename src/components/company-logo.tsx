import Image from "next/image";

export function CompanyLogo({ name, url, size = 44 }: { name: string; url: string | null; size?: number }) {
  if (url) {
    return (
      <Image
        src={url}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="shrink-0 rounded-xl border border-line bg-white object-contain"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-xl bg-brand-soft font-display text-lg font-semibold text-brand"
      style={{ width: size, height: size }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
