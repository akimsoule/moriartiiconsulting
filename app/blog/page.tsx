export const dynamic = "force-dynamic";

import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import CustomLink from "@/components/other/CustomLink";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

interface BlogPageProps {
  searchParams: { page?: string };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Articles & Actualités | Moriartii Consulting",
    description:
      "Découvrez nos derniers articles, analyses et conseils sur la fiscalité internationale, le droit des affaires et les stratégies d'entreprise.",
    openGraph: {
      title: "Articles & Actualités | Moriartii Consulting",
      description:
        "Découvrez nos derniers articles, analyses et conseils sur la fiscalité internationale, le droit des affaires et les stratégies d'entreprise.",
      type: "website",
      siteName: "Moriartii Consulting",
      url: "https://moriartii.com/blog",
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const postsPerPage = 6;
  const skip = (currentPage - 1) * postsPerPage;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: postsPerPage,
      orderBy: { date: "desc" },
      include: { author: { select: { name: true, email: true } } },
    }),
    prisma.post.count(),
  ]);
  const totalPages = Math.ceil(total / postsPerPage);

  return (
    <>
      <section className="bg-moriartii-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-moriartii-primary mb-4">
              Articles et Actualités
            </h1>
            <p className="text-moriartii-secondary text-lg">
              Découvrez nos derniers articles, analyses et conseils sur la
              fiscalité internationale, le droit des affaires et les stratégies
              d'entreprise.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post: any) => (
                <BlogCard
                  key={post.id}
                  post={{
                    ...post,
                    author: post.author?.name || post.author?.email || ""
                  }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-moriartii-secondary text-lg">
                  Aucun article trouvé. Veuillez réessayer ultérieurement.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <CustomLink
                href={`/blog?page=${Math.max(1, currentPage - 1)}`}
                className={`p-2 rounded-md flex items-center ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-moriartii-primary hover:bg-moriartii-light"
                }`}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : undefined}
              >
                <ChevronLeft className="h-5 w-5" />
              </CustomLink>

              {[...Array(totalPages)].map((_, i) => (
                <CustomLink
                  key={i}
                  href={`/blog?page=${i + 1}`}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === i + 1
                      ? "bg-moriartii-primary text-white"
                      : "text-moriartii-primary hover:bg-moriartii-light"
                  }`}
                >
                  {i + 1}
                </CustomLink>
              ))}

              <CustomLink
                href={`/blog?page=${Math.min(totalPages, currentPage + 1)}`}
                className={`p-2 rounded-md flex items-center ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-moriartii-primary hover:bg-moriartii-light"
                }`}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
              >
                <ChevronRight className="h-5 w-5" />
              </CustomLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
