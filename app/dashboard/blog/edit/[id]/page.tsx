"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface BlogEditPageProps {
  params: { id: string };
}

export default function BlogEditPage({ params }: BlogEditPageProps) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      const res = await fetch(`/api/blog/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setBlog(data);
        setTitle(data.title);
        setExcerpt(data.excerpt || "");
        setDate(data.date?.slice(0, 10) || "");
        setContent(data.content || "");
        setSeoTitle(data.seoTitle || "");
        setSeoDescription(data.seoDescription || "");
        setSeoKeywords(data.seoKeywords || "");
      } else {
        setBlog(null);
      }
      setLoading(false);
    }
    fetchBlog();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/blog/${params.id}`, {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, date, content, seoTitle, seoDescription, seoKeywords }),
    });
    if (res.ok) {
      router.push("/dashboard/blog");
    }
  }

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (!blog) return <div className="text-center mt-10">Article introuvable</div>;

  return (
    <div className="max-w mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Modifier l'article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Titre</label>
          <input name="title" value={title} onChange={e => setTitle(e.target.value)} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Auteur</label>
          <input name="author" value={blog.author?.name || blog.author?.email || ""} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input type="date" name="date" value={date} onChange={e => setDate(e.target.value)} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Résumé (optionnel)</label>
          <textarea
            name="excerpt"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Résumé de l'article (optionnel)"
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Titre SEO (optionnel)</label>
          <input name="seoTitle" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder="Titre optimisé pour le référencement (SEO)" className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description SEO (optionnel)</label>
          <input name="seoDescription" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} placeholder="Description optimisée pour le référencement (SEO)" className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mots-clés SEO (optionnel)</label>
          <input name="seoKeywords" value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)} placeholder="Mots-clés séparés par des virgules" className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contenu</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} style={{ minHeight: 180 }} />
        </div>
        <div className="flex gap-2 justify-end">
          <button type="button" className="btn btn-outline" onClick={() => router.push("/dashboard/blog")}>Annuler</button>
          <button type="submit" className="btn btn-primary">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}
