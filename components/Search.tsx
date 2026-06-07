"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Note } from "@/lib/mdx";

const SearchDialog = dynamic(() => import("@/components/SearchDialog"), {
  ssr: false,
});

export default function Search({ notes }: { notes: Note[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 font-mono text-[11px] text-cx-dim hover:text-cx-accent transition-colors border border-cx-border hover:border-cx-faint px-3 py-1.5 rounded-sm"
      >
        <span>search notes</span>
        <span className="text-cx-faint border border-cx-border-strong px-1.5 py-0.5">
          ⌘K
        </span>
      </button>

      <SearchDialog open={open} onOpenChange={setOpen} notes={notes} />
    </>
  );
}
