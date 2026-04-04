import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] px-8 py-12 max-w-3xl mx-auto">
      <Link
        href="/"
        className="font-mono text-[11px] text-[#444] hover:text-[#666] tracking-[0.15em] uppercase mb-12 block transition-colors"
      >
        ← ~/codex
      </Link>
      <div>{children}</div>
    </div>
  );
}
