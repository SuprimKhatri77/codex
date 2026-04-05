"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Note } from "@/lib/mdx";

export default function SearchDialog({
  open,
  onOpenChange,
  notes,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notes: Note[];
}) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-lg md:max-w-2xl bg-[#0d0d0d] border border-[#2a2a2a]"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full" shouldFilter={true}>
          <div className="flex items-center border-b border-[#1a1a1a] px-4">
            <span className="font-mono text-[11px] text-[#333] mr-3">~/</span>
            <Command.Input
              autoFocus
              placeholder="search notes..."
              className="w-full bg-transparent py-3 font-mono text-[13px] text-[#ccc] placeholder:text-[#333] outline-none"
            />
            <kbd className="font-mono text-[10px] text-[#333] border border-[#2a2a2a] px-1.5 py-0.5 ml-2">
              esc
            </kbd>
          </div>
          <Command.List className="max-h-64 overflow-y-auto py-2">
            <Command.Empty className="py-6 text-center font-mono text-[12px] text-[#444]">
              {"//"} no notes found
            </Command.Empty>
            <Command.Group>
              {notes.map((note) => (
                <Command.Item
                  key={note.href}
                  value={note.title}
                  onSelect={() => handleSelect(note.href)}
                  className="flex items-center justify-between gap-4 px-4 py-2.5 cursor-pointer font-mono text-[12px] text-[#555] hover:text-[#ccc] hover:bg-[#111] aria-selected:bg-[#111] aria-selected:text-[#ccc] transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px]">{note.title}</span>
                    <span className="text-[11px] text-[#333]">{note.desc}</span>
                  </div>
                  <span className="text-[10px] text-[#444] border border-[#1e1e1e] bg-[#141414] px-2 py-0.5 shrink-0">
                    {note.tag}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          <div className="border-t border-[#1a1a1a] px-4 py-2 flex gap-4">
            <span className="font-mono text-[10px] text-[#333]">
              ↑↓ navigate
            </span>
            <span className="font-mono text-[10px] text-[#333]">↵ open</span>
            <span className="font-mono text-[10px] text-[#333]">esc close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
