"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#0d0d0d] px-8 py-12 max-w-3xl mx-auto flex flex-col justify-center">
      <p className="font-mono text-[11px] text-[#333] tracking-[0.15em] uppercase mb-8">
        ~/codex/error
      </p>
      <h1 className="text-4xl font-light tracking-tight text-white mb-3">
        something went <span className="font-medium">wrong</span>
      </h1>
      <p className="font-mono text-[13px] text-[#555] mb-2">
        {"//"} {error.message}
      </p>
      <p className="font-mono text-[11px] text-[#333] mb-12">
        {"//"} unexpected error while loading this note
      </p>
      <div className="flex gap-6">
        <button
          onClick={reset}
          className="font-mono text-[11px] text-[#444] hover:text-[#aaa] tracking-[0.15em] uppercase transition-colors"
        >
          ↺ try again
        </button>
        <Link
          href="/"
          className="font-mono text-[11px] text-[#444] hover:text-[#aaa] tracking-[0.15em] uppercase transition-colors"
        >
          ← back to notes
        </Link>
      </div>
    </main>
  );
}
