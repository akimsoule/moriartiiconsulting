import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// POST: Créer un nouvel article de blog lié à l'utilisateur connecté
export async function POST(req: NextRequest) {
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
  if (!data.title || !data.date || !data.content) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        excerpt: data.excerpt || null,
        date: new Date(data.date),
        content: data.content,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
        author: { connect: { id: userId } },
      },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// GET: Récupérer tous les articles de blog avec pagination
export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { date: "desc" },
        include: {
          author: { select: { id: true, name: true, email: true } },
          // Les champs SEO sont inclus par défaut car ils font partie du modèle
        },
      }),
      prisma.post.count(),
    ]);
    return NextResponse.json({ posts, total, page, limit });
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
