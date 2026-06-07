import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cx px-8 py-12 max-w-3xl mx-auto flex flex-col justify-center">
      <p className="font-mono text-[11px] text-cx-faint tracking-[0.15em] uppercase mb-8">
        ~/codex/404
      </p>
      <h1 className="text-4xl font-light tracking-tight text-cx-heading mb-3">
        page not <span className="font-medium">found</span>
      </h1>
      <p className="font-mono text-[13px] text-cx-muted mb-12">
        {"//"} whatever you were looking for doesn&apos;t exist here
      </p>
      <Link
        href="/"
        className="font-mono text-[11px] text-cx-dim hover:text-cx-accent tracking-[0.15em] uppercase transition-colors w-fit"
      >
        ← back to notes
      </Link>
    </main>
  );
}
