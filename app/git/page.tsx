import { getAllNotes } from "@/lib/mdx";
import type { Note } from "@/lib/mdx";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Git",
  description: "git commands and workflows — the ones you actually use",
};

export default function GitPage() {
  const all = getAllNotes();
  const gitNotes = all.filter((n) => n.href.startsWith("/git"));

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#e8e8e8] px-8 py-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <p className="font-mono text-[11px] text-[#555] tracking-[0.15em] uppercase mb-6">
          ~/codex/git
        </p>
        <h1 className="text-4xl font-light tracking-tight text-[#e8e8e8] mb-2">
          git <span className="font-medium text-white">commands</span>
        </h1>
        <p className="font-mono text-[13px] text-[#555]">
          {"//"} commands and workflows you&apos;ll use every day
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a] rounded-lg overflow-hidden">
        {gitNotes.map((note: Note) => (
          <Link
            key={note.href}
            href={note.href}
            className="group bg-[#0d0d0d] hover:bg-[#111] p-5 transition-colors duration-150"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-[#444] bg-[#141414] border border-[#1e1e1e] px-2 py-0.5 rounded-sm">
                {note.tag}
              </span>
              <span className="text-[#333] group-hover:text-[#666] text-xs transition-colors duration-150">
                ↗
              </span>
            </div>
            <p className="text-sm font-medium text-[#ccc] group-hover:text-[#e8e8e8] mb-1 transition-colors duration-150">
              {note.title}
            </p>
            <p className="font-mono text-[12px] text-[#444]">{note.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
