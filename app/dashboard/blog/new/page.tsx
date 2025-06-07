"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "./quill-custom.css";

export default function BlogCreatePage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, date, content, seoTitle, seoDescription, seoKeywords }),
      });
      if (!res.ok) {
        const error = await res.json();
        toast({
          title: "Erreur",
          description: error.error || "Erreur inconnue",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Article créé",
          description: "L'article a bien été ajouté.",
        });
        router.push("/dashboard/blog");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Créer un nouvel article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Titre</label>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Résumé (optionnel)</label>
          <Input
            name="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Résumé de l'article (optionnel)"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <Input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            defaultValue={new Date().toISOString().slice(0, 10)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contenu</label>
          <div className="mb-2">
            <Button
              type="button"
              variant={preview ? "outline" : "default"}
              size="sm"
              onClick={() => setPreview(false)}
            >
              Édition
            </Button>
            <Button
              type="button"
              variant={preview ? "default" : "outline"}
              size="sm"
              className="ml-2"
              onClick={() => setPreview(true)}
            >
              Aperçu
            </Button>
          </div>
          {!preview ? (
            <ReactQuill
              key="edition"
              theme="snow"
              value={content}
              onChange={setContent}
            />
          ) : (
            <div className="border rounded p-3 min-h-[120px] bg-gray-50 ql-editor">
              {content &&
              content.replace(/<(.|\n)*?>/g, "").trim() !== "" &&
              content !== "<p><br></p>" ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <span className="text-gray-400 italic">
                  Aucun contenu saisi
                </span>
              )}
            </div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Titre SEO (optionnel)</label>
          <Input
            name="seoTitle"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Titre optimisé pour le référencement (SEO)"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description SEO (optionnel)</label>
          <Input
            name="seoDescription"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Description optimisée pour le référencement (SEO)"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mots-clés SEO (optionnel)</label>
          <Input
            name="seoKeywords"
            value={seoKeywords}
            onChange={(e) => setSeoKeywords(e.target.value)}
            placeholder="Mots-clés séparés par des virgules"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/blog")}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Création..." : "Créer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
