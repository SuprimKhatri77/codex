"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

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

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed top-24 right-8 w-48">
      <p className="font-mono text-[10px] text-[#333] tracking-[0.2em] uppercase mb-4">
        on this page
      </p>
      <ul className="space-y-2">
        {headings.map((h, idx) => (
          <li
            key={`${h.id}-${idx}`}
            style={{ paddingLeft: h.level === 3 ? "0.75rem" : "0" }}
          >
            <Link
              href={`#${h.id}`}
              className={`font-mono text-[11px] transition-colors duration-150 hover:text-[#aaa] block leading-relaxed ${
                active === h.id ? "text-[#aaa]" : "text-[#333]"
              }`}
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
