"use client";

import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
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
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    // TODO: Remplacer les requêtes Supabase par Prisma
    setLoading(false);
  }

  async function handleDelete(id: string) {
    // TODO: Remplacer les requêtes Supabase par Prisma
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestion des articles de blog</h2>
      <p className="mb-6">Ici vous pourrez créer, éditer et supprimer des articles.</p>
      <div className="mb-4 flex justify-end">
        <Button asChild>
          <a href="/dashboard/blog/new">Nouvel article</a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Résumé</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>Chargement...</TableCell>
            </TableRow>
          ) : blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>Aucun article trouvé.</TableCell>
            </TableRow>
          ) : (
            blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.date}</TableCell>
                <TableCell>{blog.excerpt}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/dashboard/blog/edit/${blog.id}`}>Éditer</a>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="ml-2">Supprimer</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>Confirmer la suppression</AlertDialogHeader>
                      <p>Voulez-vous vraiment supprimer cet article ?</p>
                      <AlertDialogFooter>
                        <Button variant="outline">Annuler</Button>
                        <Button variant="destructive" onClick={() => handleDelete(blog.id)}>Supprimer</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
