"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll("h2, h3");
    const parsed: Heading[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setTimeout(() => {
      setHeadings(parsed);
    }, 0);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    document.querySelectorAll("h2, h3").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;

    const activeLink = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!activeLink) return;

    const listRect = list.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    if (linkRect.top < listRect.top || linkRect.bottom > listRect.bottom) {
      activeLink.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [active]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed top-20 right-6 w-64 z-30">
      <div className="flex flex-col max-h-[calc(100vh-6rem)]">
        <p className="font-mono text-[10px] text-cx-faint tracking-[0.2em] uppercase mb-3 shrink-0">
          on this page
        </p>
        <ul
          ref={listRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-3 -mr-1 space-y-0.5"
        >
          {headings.map((h, idx) => {
            const isH2 = h.level === 2;
            const isActive = active === h.id;
            const isNewSection = isH2 && idx > 0;

            return (
              <li
                key={`${h.id}-${idx}`}
                className={isNewSection ? "mt-4 pt-3 border-t border-cx-border/60" : ""}
              >
                <Link
                  href={`#${h.id}`}
                  data-id={h.id}
                  className={[
                    "block rounded-sm transition-colors duration-150 hover:text-cx-accent",
                    isH2
                      ? "font-mono text-[12px] leading-snug py-1.5"
                      : "font-mono text-[11px] leading-snug py-1 pl-3 border-l border-cx-border/40 ml-1",
                    isActive
                      ? "text-cx-accent border-l-cx-accent"
                      : isH2
                        ? "text-cx-dim"
                        : "text-cx-faint",
                  ].join(" ")}
                >
                  {h.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
