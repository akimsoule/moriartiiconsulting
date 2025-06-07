"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
}

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 6;
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  async function fetchBlogs(page: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog?page=${page}&limit=${blogsPerPage}`, { credentials: "include" });
      if (!res.ok) throw new Error("Erreur lors du chargement des articles");
      const data = await res.json();
      const posts = Array.isArray(data) ? data : data.posts;
      setBlogs(
        posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          date: new Date(post.date).toLocaleDateString(),
          author: post.author?.name || "-",
        }))
      );
      setTotalPages(data.total ? Math.ceil(data.total / blogsPerPage) : 1);
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      toast({ title: "Article supprimé", variant: "default" });
      fetchBlogs(page);
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    }
  }

  return (
    <div className="max-w h-hull mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Gestion des articles de blog</h2>
      <p className="mb-6">Ici vous pourrez créer, éditer et supprimer des articles.</p>
      <div className="mb-4 flex justify-end">
        <a href="/dashboard/blog/new" className="btn btn-primary">Nouvel article</a>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Date</th>
              <th>Résumé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center">Chargement...</td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">Aucun article trouvé.</td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>{blog.date}</td>
                  <td>{blog.excerpt}</td>
                  <td>
                    <a href={`/dashboard/blog/edit/${blog.id}`} className="btn btn-sm btn-outline">Éditer</a>
                    <label htmlFor={`delete-modal-${blog.id}`} className="btn btn-sm btn-error ml-2">Supprimer</label>
                    {/* Modal DaisyUI */}
                    <input type="checkbox" id={`delete-modal-${blog.id}`} className="modal-toggle" />
                    <div className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirmer la suppression</h3>
                        <p>Voulez-vous vraiment supprimer cet article ?</p>
                        <div className="modal-action">
                          <label htmlFor={`delete-modal-${blog.id}`} className="btn">Annuler</label>
                          <button className="btn btn-error" onClick={() => { handleDelete(blog.id); document.getElementById(`delete-modal-${blog.id}`)?.click(); }}>Supprimer</button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination DaisyUI */}
      {totalPages > 1 && (
        <div className="join flex justify-center mt-8">
          <button
            className="join-item btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Précédent
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`join-item btn ${page === i + 1 ? "btn-active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="join-item btn"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
