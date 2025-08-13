import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CalendarDays, User } from "lucide-react";
import CustomLink from "@/components/other/CustomLink";
import { Metadata } from "next";
import { createMetadata, breadcrumbStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: {
      seoTitle: true,
      seoDescription: true,
      seoKeywords: true,
      title: true,
      excerpt: true,
      date: true,
      updatedAt: true,
      author: { select: { name: true } },
    },
  });
  
  if (!post) {
    return createMetadata({
      title: "Article introuvable",
      description: "Cet article n'existe pas ou a été supprimé.",
      noIndex: true
    });
  }

  return createMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    keywords: post.seoKeywords ? post.seoKeywords.split(',').map(k => k.trim()) : [],
    type: "article",
    publishedTime: post.date.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    authors: post.author.name ? [post.author.name] : undefined,
    section: "Legal & Tax Consulting"
  });
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: { select: { name: true, email: true } } },
  });

  if (!post) return notFound();

  const breadcrumbData = breadcrumbStructuredData([
    { name: "Accueil", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.id}` }
  ]);

  const articleStructuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author.name || "Moriartii Consulting"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moriartii Consulting",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://moriartiiconsulting.com"}/legal.png`
      }
    },
    "datePublished": post.date.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://moriartiiconsulting.com"}/blog/${post.id}`
    }
  });

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <StructuredData data={articleStructuredData} />
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
