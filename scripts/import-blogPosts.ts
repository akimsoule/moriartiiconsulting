import { PrismaClient } from '@prisma/client';
import { blogPosts } from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  for (const post of blogPosts) {
    // Vérifie si l'article existe déjà (par id ou slug)
    const exists = await prisma.post.findFirst({
      where: { OR: [{ id: post.id }, { title: post.title }] },
    });
    const user = await prisma.user.findFirst({
      where: { email: "soule_akim@yahoo.fr" },
    });
    if (!exists && user) {
      await prisma.post.create({
        data: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.html,
          date: new Date(post.date),
          author: {
            connect: { id: user.id }
          },
          // slug, url ne sont pas dans le modèle Prisma par défaut
        },
      });
      console.log(`Ajouté : ${post.title}`);
    } else {
      console.log(`Déjà présent : ${post.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
