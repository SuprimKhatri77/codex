import type { MDXComponents } from "mdx/types";
import CopyButton from "./components/CopyButton";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      console.log("h1 rendered");

      return (
        <h1 className="text-3xl font-light tracking-tight text-white mb-2">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => (
      <h2 className="font-mono text-[10px] text-[#444] tracking-[0.2em] uppercase mt-12 mb-4 pb-2 border-b border-[#1a1a1a]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-medium text-[#ccc] mt-6 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-sm text-[#666] leading-relaxed mb-4 font-mono">
        {children}
      </p>
    ),
    code: ({ children }) => (
      <code className="font-mono text-[12px] text-[#aaa] bg-[#141414] border border-[#1e1e1e] px-1.5 py-0.5 rounded-sm">
        {children}
      </code>
    ),
    pre: (props) => <CopyButton {...props} />,
    ul: ({ children }) => <ul className="space-y-2 mb-6 ml-4">{children}</ul>,
    li: ({ children }) => (
      <li className="font-mono text-[12px] text-[#666] flex gap-2 before:content-['→'] before:text-[#333]">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="text-[#ccc] font-medium">{children}</strong>
    ),
    figure: ({ children, ...props }) => {
      console.log("figure rendered");
      return <figure {...props}>{children}</figure>;
    },
    ...components,
  };
}
