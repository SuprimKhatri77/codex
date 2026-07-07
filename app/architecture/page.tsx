import { getAllNotes } from "@/lib/mdx";
import type { Note } from "@/lib/mdx";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "architecture notes — core architecture patterns, design principles, best practices",
};

export default function ArchitecturePage() {
  const all = getAllNotes();
  const architectureNotes = all.filter((n) =>
    n.href.startsWith("/architecture"),
  );

  const grouped = architectureNotes.reduce<Record<string, Note[]>>(
    (acc, note) => {
      const key = note.subsection ?? "general";
      if (!acc[key]) acc[key] = [];
      acc[key].push(note);
      return acc;
    },
    {},
  );

  return (
    <main className="min-h-screen bg-cx text-cx-fg px-8 py-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <p className="font-mono text-[11px] text-cx-muted tracking-[0.15em] uppercase mb-6">
          ~/codex/architecture
        </p>
        <h1 className="text-4xl font-light tracking-tight text-cx-fg mb-2">
          architecture{" "}
          <span className="font-medium text-cx-heading">notes</span>
        </h1>
        <p className="font-mono text-[13px] text-cx-muted">
          {"//"} core architecture patterns, design principles, best practices
        </p>
      </div>

      <div className="space-y-10">
        {Object.entries(grouped).map(([subsection, notes]) => (
          <div key={subsection}>
            <p className="font-mono text-[10px] text-cx-dim tracking-[0.2em] uppercase mb-3 pb-2 border-b border-cx-border">
              {subsection.replace(/-/g, " ")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-cx-border border border-cx-border rounded-lg overflow-hidden">
              {notes.map((note) => (
                <Link
                  key={note.href}
                  href={note.href}
                  className="group bg-cx hover:bg-cx-hover p-5 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-cx-dim bg-cx-tag border border-cx-border-subtle px-2 py-0.5 rounded-sm">
                      {note.tag}
                    </span>
                    <span className="text-cx-faint group-hover:text-cx-body text-xs transition-colors duration-150">
                      ↗
                    </span>
                  </div>
                  <p className="text-sm font-medium text-cx-title group-hover:text-cx-fg mb-1 transition-colors duration-150">
                    {note.title}
                  </p>
                  <p className="font-mono text-[12px] text-cx-dim">
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
        className="font-mono text-[11px] text-cx-dim hover:text-cx-accent tracking-[0.15em] uppercase transition-colors mt-12 block"
      >
        ← back to notes
      </Link>
    </main>
  );
}
