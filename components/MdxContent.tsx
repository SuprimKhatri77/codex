import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import MdxLayout from "@/app/mdx-layout";
import type { MDXComponents } from "mdx/types";
import CopyButton from "./CopyButton";
import rehypeSlug from "rehype-slug";
import TableOfContents from "./TableOfContents";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-light tracking-tight text-cx-heading mb-2">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="font-mono text-[10px] text-cx-dim tracking-[0.2em] uppercase mt-12 mb-4 pb-2 border-b border-cx-border"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-sm font-medium text-cx-title mt-6 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-cx-body leading-relaxed mb-4 font-mono">
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="space-y-2 mb-6 ml-4">{children}</ul>,
  li: ({ children }) => (
    <li className="font-mono text-[12px] text-cx-body flex gap-2 before:content-['→'] before:text-cx-faint before:shrink-0">
      <span className="min-w-0">{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="text-cx-title font-medium">{children}</strong>
  ),
  pre: ({ children, ...props }) => (
    <div className="relative group mb-6">
      <CopyButton />
      <pre
        {...props}
        className="overflow-x-auto p-4 rounded-lg bg-cx-subtle border border-cx-border text-[12px] leading-relaxed font-mono"
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
      <h1 className="text-3xl font-light tracking-tight text-cx-heading/70 mb-1">
        {frontmatter.title}
      </h1>
      <p className="font-mono text-[13px] text-cx-muted mb-12">
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
                {
                  theme: "dracula",
                  keepBackground: true,
                },
              ],
            ],
          },
        }}
      />
    </MdxLayout>
  );
}
