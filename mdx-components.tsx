import type { MDXComponents } from "mdx/types";
import CopyButton from "./components/CopyButton";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      return (
        <h1 className="text-3xl font-light tracking-tight text-cx-heading mb-2">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => (
      <h2 className="font-mono text-[10px] text-cx-dim tracking-[0.2em] uppercase mt-12 mb-4 pb-2 border-b border-cx-border">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-medium text-cx-title mt-6 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-sm text-cx-body leading-relaxed mb-4 font-mono">
        {children}
      </p>
    ),
    pre: (props) => <CopyButton {...props} />,
    ul: ({ children }) => <ul className="space-y-2 mb-6 ml-4">{children}</ul>,
    li: ({ children }) => (
      <li className="font-mono text-[12px] text-cx-body flex gap-2 before:content-['→'] before:text-cx-faint before:shrink-0">
        <span className="min-w-0">{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="text-cx-title font-medium">{children}</strong>
    ),
    figure: ({ children, ...props }) => {
      return <figure {...props}>{children}</figure>;
    },
    ...components,
  };
}
