import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer un article de blog par ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const token = req.cookies.get("auth-token")?.value;
  if (!token) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT: Modifier un article de blog (seulement l'auteur)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const token = req.cookies.get("auth-token")?.value;
  if (!token) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  let userId = null;
  try {
    const payload = await verifyToken(token);
    userId = payload?.id;
  } catch {
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }
  const data = await req.json();
  // Vérifier que l'utilisateur est bien l'auteur
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== userId) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  try {
    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        excerpt: data.excerpt || null,
        date: new Date(data.date),
        content: data.content,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
      },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
