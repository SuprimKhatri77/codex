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
