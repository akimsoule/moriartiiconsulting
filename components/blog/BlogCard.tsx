import { CalendarDays, User } from "lucide-react";
import { BlogPost } from "@/lib/data";
import CustomLink from "../CustomLink";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-2 lg:items-center" : ""
      }`}
    >
      <div
        className={`${
          featured ? "h-64 lg:h-full" : "h-48"
        } relative bg-gray-200`}
      >
        <img
          src={`https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-4">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>{post.date}</span>
          </div>
          {post.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{post.author}</span>
            </div>
          )}
        </div>

        <h3
          className={`font-serif font-bold text-moriartii-primary ${
            featured ? "text-2xl mb-3" : "text-xl mb-2"
          }`}
        >
          <CustomLink
            href={`/blog/${post.slug}`}
            className="hover:text-moriartii-secondary transition-colors duration-300"
          >
            {post.title}
          </CustomLink>
        </h3>

        <p className="text-moriartii-secondary mb-4">
          {post.excerpt.length > (featured ? 200 : 120)
            ? `${post.excerpt.substring(0, featured ? 200 : 120)}...`
            : post.excerpt}
        </p>

        <CustomLink
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-moriartii-primary font-medium hover:text-moriartii-secondary transition-colors duration-300"
        >
          Lire la suite
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </CustomLink>
      </div>
    </article>
  );
}
