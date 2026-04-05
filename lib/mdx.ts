import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Frontmatter = {
  title: string;
  desc: string;
  tag: string;
};

export function getMdxContent(slug: string[]) {
  const filePath = path.join(process.cwd(), "content", ...slug) + ".mdx";
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as Frontmatter, content };
}

export type Note = {
  title: string;
  desc: string;
  tag: string;
  href: string;
  subsection?: string;
};

export function getAllNotes(): Note[] {
  const contentDir = path.join(process.cwd(), "content");
  const notes: Note[] = [];

  function walk(dir: string, segments: string[]) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath, [...segments, entry]);
      } else if (entry.endsWith(".mdx")) {
        const slug = entry.replace(".mdx", "");
        const raw = fs.readFileSync(fullPath, "utf-8");
        const { data } = matter(raw);
        const frontmatter = data as Frontmatter;
        notes.push({
          title: frontmatter.title,
          desc: frontmatter.desc,
          tag: frontmatter.tag,
          href: "/" + [...segments, slug].join("/"),
          subsection: segments[1] ?? undefined,
        });
      }
    }
  }

  walk(contentDir, []);
  return notes;
}
