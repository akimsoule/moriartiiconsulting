import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CalendarDays, User } from "lucide-react";
import CustomLink from "@/components/other/CustomLink";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: {
      seoTitle: true,
      seoDescription: true,
      seoKeywords: true,
      title: true,
      excerpt: true,
    },
  });
  if (!post) {
    return {
      title: "Article introuvable | Moriartii Consulting",
      description: "Cet article n'existe pas ou a été supprimé.",
    };
  }
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    keywords: post.seoKeywords || undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      type: "article",
      siteName: "Moriartii Consulting",
    },
  };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: { select: { name: true, email: true } } },
  });

  if (!post) return notFound();

  return (
    <>
      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <CustomLink
              href="/blog"
              className="inline-flex items-center text-moriartii-secondary hover:text-moriartii-primary transition-colors duration-300 mb-6"
            >
              <span className="mr-2">←</span> Retour aux articles
            </CustomLink>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-moriartii-secondary mb-6">
              <div className="flex items-center mr-6 mb-2">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>{new Date(post.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              {(post.author?.name || post.author?.email) && (
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author.name || post.author.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <article className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </article>
    </>
  );
}
