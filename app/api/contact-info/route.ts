import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const contactInfo = await prisma.contactInfo.findFirst({
      orderBy: { id: 'desc' }
    });
    
    if (!contactInfo) {
      return NextResponse.json({ error: "Aucune information de contact trouvée" }, { status: 404 });
    }
    
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Erreur lors de la récupération des infos de contact:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // Vérification de l'authentification
  const { authenticated, user } = await isAuthenticated(req);
  
  if (!authenticated) {
    return NextResponse.json({ error: "Authentification requise" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { phone, email, facebookUrl, linkedinUrl, twitterUrl, address } = body;

    // Validation basique
    if (!phone || !email) {
      return NextResponse.json({ error: "Téléphone et email sont requis" }, { status: 400 });
    }

    const contactInfo = await prisma.contactInfo.findFirst({
      orderBy: { id: 'desc' }
    });

    let updatedContactInfo;
    if (contactInfo) {
      updatedContactInfo = await prisma.contactInfo.update({
        where: { id: contactInfo.id },
        data: { phone, email, facebookUrl, linkedinUrl, twitterUrl, address }
      });
    } else {
      updatedContactInfo = await prisma.contactInfo.create({
        data: { phone, email, facebookUrl, linkedinUrl, twitterUrl, address }
      });
    }

    return NextResponse.json(updatedContactInfo);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des infos de contact:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
