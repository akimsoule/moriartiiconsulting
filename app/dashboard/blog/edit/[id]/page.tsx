"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [excerpt, setExcerpt] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      const res = await fetch(`/api/blog/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setBlog(data);
        setTitle(data.title);
        setDate(data.date?.slice(0, 10) || "");
        setExcerpt(data.excerpt || "");
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, excerpt }),
    });
    if (res.ok) {
      router.push("/dashboard/blog");
    }
  }

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (!blog) return <div className="text-center mt-10">Article introuvable</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Modifier l'article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Titre</label>
          <Input name="title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Auteur</label>
          <Input name="author" value={blog.author?.name || blog.author?.email || ""} readOnly />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <Input type="date" name="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Résumé</label>
          <ReactQuill theme="snow" value={excerpt} onChange={setExcerpt} style={{ minHeight: 180 }} />
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/blog")}>Annuler</Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </div>
  );
}
