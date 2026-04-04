import { getMdxContent } from "@/lib/mdx";
import MdxContent from "@/components/MdxContent";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  let content: string;

  try {
    const result = getMdxContent([category, slug]);
    content = result.content;
  } catch {
    notFound();
  }

  return <MdxContent content={content!} />;
}
