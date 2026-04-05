import { getMdxContent, getAllNotes } from "@/lib/mdx";
import MdxContent from "@/components/MdxContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { frontmatter } = getMdxContent(slug);
    return {
      title: frontmatter.title,
      description: frontmatter.desc,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.desc,
        type: "article",
      },
      twitter: {
        card: "summary",
        title: frontmatter.title,
        description: frontmatter.desc,
      },
    };
  } catch {
    return {
      title: "note not found",
    };
  }
}
export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.href.replace("/", "").split("/"),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  let content: string;
  let frontmatter: { title: string; desc: string };

  try {
    const result = getMdxContent(slug);
    content = result.content;
    frontmatter = result.frontmatter;
  } catch {
    notFound();
  }

  return <MdxContent frontmatter={frontmatter} content={content!} />;
}
