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
};

export function getAllNotes(): Note[] {
  const contentDir = path.join(process.cwd(), "content");
  const notes: Note[] = [];

  const categories = fs.readdirSync(contentDir);

  for (const category of categories) {
    const categoryPath = path.join(contentDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(categoryPath, file), "utf-8");
      const { data } = matter(raw);
      const frontmatter = data as Frontmatter;

      notes.push({
        title: frontmatter.title,
        desc: frontmatter.desc,
        tag: frontmatter.tag,
        href: `/${category}/${slug}`,
      });
    }
  }

  return notes;
}
