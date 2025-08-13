import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedContactInfo() {
  try {
    // Vérifier si des données existent déjà
    const existingContact = await prisma.contactInfo.findFirst();
    
    if (!existingContact) {
      // Insérer les données initiales
      const contactInfo = await prisma.contactInfo.create({
        data: {
          phone: '+33 7 59 01 35 65',
          email: 'moriartiiconsulting@proton.me',
          facebookUrl: 'https://www.facebook.com/share/19qLijeXh1/?mibextid=wwXIfr',
          linkedinUrl: null,
          twitterUrl: null,
          address: null
        }
      });
      
      console.log('✅ Données de contact insérées avec succès:', contactInfo);
    } else {
      console.log('ℹ️ Les données de contact existent déjà');
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des données de contact:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedContactInfo();
