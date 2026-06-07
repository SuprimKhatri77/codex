"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const backHref =
    segments.length > 1 ? "/" + segments.slice(0, 1).join("/") : "/";

  const label = segments[segments.length - 1].replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-cx px-8 py-12 max-w-3xl mx-auto">
      <Link
        href={backHref}
        className="font-mono text-[11px] text-cx-dim hover:text-cx-accent tracking-[0.15em] uppercase transition-colors mb-12 block"
      >
        ← {label}
      </Link>
      {children}
    </div>
  );
}
