import { prisma } from "@/lib/prisma";

export async function getContactInfo() {
  try {
    const contactInfo = await prisma.contactInfo.findFirst({
      orderBy: { id: 'desc' }
    });
    
    // Valeurs par défaut si aucune donnée en base
    return contactInfo || {
      phone: "+33 7 59 01 35 65",
      email: "moriartiiconsulting@proton.me",
      facebookUrl: "https://www.facebook.com/share/19qLijeXh1/?mibextid=wwXIfr",
      linkedinUrl: null,
      twitterUrl: null,
      address: null
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des infos de contact:", error);
    // Retour des valeurs par défaut en cas d'erreur
    return {
      phone: "+33 7 59 01 35 65",
      email: "moriartiiconsulting@proton.me",
      facebookUrl: "https://www.facebook.com/share/19qLijeXh1/?mibextid=wwXIfr",
      linkedinUrl: null,
      twitterUrl: null,
      address: null
    };
  }
}

export type ContactInfo = {
  id?: number;
  phone: string;
  email: string;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  address?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
