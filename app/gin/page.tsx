import { getAllNotes } from "@/lib/mdx";
import type { Note } from "@/lib/mdx";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gin",
  description: "gin notes — boilerplate, middleware, routing, request binding",
};

export default function GinPage() {
  const all = getAllNotes();
  const ginNotes = all.filter((n) => n.href.startsWith("/gin"));

  const grouped = ginNotes.reduce<Record<string, Note[]>>((acc, note) => {
    const key = note.subsection ?? "general";
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#e8e8e8] px-8 py-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <p className="font-mono text-[11px] text-[#555] tracking-[0.15em] uppercase mb-6">
          ~/codex/gin
        </p>
        <h1 className="text-4xl font-light tracking-tight text-[#e8e8e8] mb-2">
          gin <span className="font-medium text-white">notes</span>
        </h1>
        <p className="font-mono text-[13px] text-[#555]">
          {"//"} boilerplate, middleware, routing, request binding
        </p>
      </div>

      <div className="space-y-10">
        {Object.entries(grouped).map(([subsection, notes]) => (
          <div key={subsection}>
            <p className="font-mono text-[10px] text-[#444] tracking-[0.2em] uppercase mb-3 pb-2 border-b border-[#1a1a1a]">
              {subsection.replace(/-/g, " ")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a] rounded-lg overflow-hidden">
              {notes.map((note) => (
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
                  <p className="font-mono text-[12px] text-[#444]">
                    {note.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="font-mono text-[11px] text-[#444] hover:text-[#aaa] tracking-[0.15em] uppercase transition-colors mt-12 block"
      >
        ← back to notes
      </Link>
    </main>
  );
}
