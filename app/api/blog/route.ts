import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// POST: Créer un nouvel article de blog lié à l'utilisateur connecté
export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  let userId = null;
  try {
    const payload = await verifyToken(token);
    userId = payload?.id;
  } catch {
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }
  const data = await req.json();
  if (!data.title || !data.date || !data.excerpt) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        date: new Date(data.date),
        excerpt: data.excerpt,
        content: data.content || "",
        author: { connect: { id: userId } },
      },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
