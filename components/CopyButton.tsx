"use client";

import { useState } from "react";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pre = e.currentTarget.closest(".group")?.querySelector("pre");
    const text = pre?.textContent ?? "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute right-3 top-3 z-10 group/btn">
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-all duration-150 text-[#444] hover:text-[#aaa] p-1.5 rounded-sm bg-[#0a0a0a] border border-[#1a1a1a]"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
      </button>
      <span className="pointer-events-none absolute right-0 top-8 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-150 font-mono text-[10px] text-[#aaa] bg-[#111] border border-[#1a1a1a] px-2 py-1 rounded-sm whitespace-nowrap">
        {!copied && "copy"}
      </span>
    </div>
  );
}
