import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import MdxLayout from "@/app/mdx-layout";
import type { MDXComponents } from "mdx/types";
import CopyButton from "./CopyButton";
import rehypeSlug from "rehype-slug";
import TableOfContents from "./TableOfContents";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-light tracking-tight text-white mb-2">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="font-mono text-[10px] text-[#444] tracking-[0.2em] uppercase mt-12 mb-4 pb-2 border-b border-[#1a1a1a]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-sm font-medium text-[#ccc] mt-6 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-[#666] leading-relaxed mb-4 font-mono">
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="space-y-2 mb-6 ml-4">{children}</ul>,
  li: ({ children }) => (
    <li className="font-mono text-[12px] text-[#666] flex gap-2 before:content-['→'] before:text-[#333]">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="text-[#ccc] font-medium">{children}</strong>
  ),
  pre: ({ children, ...props }) => (
    <div className="relative group mb-6">
      <CopyButton />
      <pre
        {...props}
        className="overflow-x-auto p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-[12px] leading-relaxed font-mono"
      >
        {children}
      </pre>
    </div>
  ),
};

export default function MdxContent({
  content,
  frontmatter,
}: {
  content: string;
  frontmatter: { title: string; desc: string };
}) {
  return (
    <MdxLayout>
      <TableOfContents content={content} />
      <h1 className="text-3xl font-light tracking-tight text-slate-50/70 mb-1">
        {frontmatter.title}
      </h1>
      <p className="font-mono text-[13px] text-[#555] mb-12">
        {frontmatter.desc}
      </p>
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                { theme: "github-dark-dimmed", keepBackground: false },
              ],
            ],
          },
        }}
      />
    </MdxLayout>
  );
}
