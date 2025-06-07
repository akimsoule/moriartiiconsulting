import { CalendarDays, User } from "lucide-react";
import { BlogPost } from "@/lib/data";
import CustomLink from "../other/CustomLink";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-48 relative bg-gray-200">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-4">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>
              {post.date
                ? new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
          </div>
          {post.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{post.author}</span>
            </div>
          )}
        </div>

        <h3 className="font-serif font-bold text-moriartii-primary text-xl mb-2">
          <CustomLink
            href={`/blog/${post.id}`}
            className="hover:text-moriartii-secondary transition-colors duration-300"
          >
            {post.title}
          </CustomLink>
        </h3>

        <p className="text-moriartii-secondary mb-4">
          {post.excerpt.length > 120
            ? `${post.excerpt.substring(0, 120)}...`
            : post.excerpt}
        </p>

        <CustomLink
          href={`/blog/${post.id}`}
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
