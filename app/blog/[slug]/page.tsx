import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, blogPosts } from "@/lib/data";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Basic HTML content cleaning and formatting
  const formattedContent = post.html
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .replace(/\n\n/g, "</p><p>") // Convert double line breaks to paragraphs
    .replace(/\n/g, "<br>"); // Convert single line breaks to <br>

  // Create sections from paragraphs
  const sections = formattedContent.split("</p><p>");

  return (
    <>
      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-moriartii-secondary hover:text-moriartii-primary transition-colors duration-300 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux articles
            </Link>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center text-moriartii-secondary mb-6">
              <div className="flex items-center mr-6 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{post.date}</span>
              </div>

              {post.author && (
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              {sections.map((section, index) => (
                <p
                  key={index}
                  className="mb-4 text-moriartii-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: section,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="bg-moriartii-light py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-moriartii-primary mb-4">
              Vous avez aimé cet article ?
            </h2>
            <p className="text-moriartii-secondary mb-6">
              Découvrez nos autres articles sur la fiscalité, le droit des affaires et les stratégies d'entreprise.
            </p>
            <Link
              href="/blog"
              className="btn btn-primary px-6 py-3 rounded-md inline-flex items-center"
            >
              Explorer nos articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}