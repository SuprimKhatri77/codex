"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
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

  const handleSelect = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="search notes..." />
      <CommandList>
        <CommandEmpty>
          <span className="font-mono text-[12px] text-[#444]">
            {"//"} no notes found
          </span>
        </CommandEmpty>
        <CommandGroup heading="notes">
          {notes.map((note) => (
            <CommandItem
              key={note.href}
              value={note.title}
              onSelect={() => handleSelect(note.href)}
              className="flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[13px] text-[#ccc]">
                  {note.title}
                </span>
                <span className="font-mono text-[11px] text-[#444]">
                  {note.desc}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#444] border border-[#1e1e1e] bg-[#141414] px-2 py-0.5 shrink-0">
                {note.tag}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
