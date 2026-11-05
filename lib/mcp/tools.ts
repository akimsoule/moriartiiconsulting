// Outils MCP du connecteur (spec §6) : lecture et écriture des contenus du
// site — articles, FAQ, services, équipe, témoignages, infos de contact.
// Aucun outil sur les utilisateurs, les mots de passe ou les messages de
// contact (hors périmètre v1).
//
// Les lectures exigent le scope content:read, les écritures content:write :
// l'enregistrement est filtré selon les scopes du jeton présenté. Toute
// suppression exige confirm: true. Chaque écriture réussie est journalisée
// (outil + identifiant de l'objet, jamais le contenu).

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { prisma } from "@/lib/prisma";
import { getMcpConfig } from "./config";
import { writeAuditLog } from "./tokens";

export interface McpToolContext {
  tokenId: string;
  scopes: string[];
}

// Adresse de l'administrateur du site (même valeur que ADMIN_USERS dans
// lib/auth.ts) : repli pour l'attribution des articles si MCP_AUTHOR_ID
// n'est pas défini.
const ADMIN_EMAIL_FALLBACK = "soule_akim@yahoo.fr";

function ok(value: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

function fail(message: string): CallToolResult {
  return { content: [{ type: "text", text: message }], isError: true };
}

async function run(fn: () => Promise<CallToolResult>): Promise<CallToolResult> {
  try {
    return await fn();
  } catch {
    return fail("Erreur interne du connecteur. Réessayez ou contactez l'administrateur du site.");
  }
}

function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

const paginationShape = {
  page: z.number().int().min(1).optional().describe("Numéro de page (défaut : 1)"),
  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .describe("Nombre d'éléments par page (défaut : 20, max : 100)"),
};

function pageArgs(args: { page?: number; limit?: number }): { skip: number; take: number; page: number; limit: number } {
  const page = args.page ?? 1;
  const limit = args.limit ?? 20;
  return { skip: (page - 1) * limit, take: limit, page, limit };
}

/** Résout le User auquel attribuer les articles créés via MCP. */
async function resolveAuthorId(): Promise<string> {
  const { authorId } = getMcpConfig();
  if (authorId) {
    const user = await prisma.user.findUnique({ where: { id: authorId } });
    if (!user) {
      throw new Error("MCP_AUTHOR_ID_CONFIG");
    }
    return user.id;
  }
  const admin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL_FALLBACK },
  });
  if (admin) return admin.id;
  throw new Error("NO_AUTHOR");
}

export function registerTools(server: McpServer, ctx: McpToolContext): void {
  const canRead = ctx.scopes.includes("content:read");
  const canWrite = ctx.scopes.includes("content:write");

  // -------------------------------------------------------------------------
  // Articles (Post)
  // -------------------------------------------------------------------------
  if (canRead) {
    server.registerTool(
      "posts_list",
      {
        description:
          "Liste les articles du blog du site, du plus récent au plus ancien. Réponse paginée : id, titre, date et extrait de chaque article, plus le total.",
        inputSchema: {
          ...paginationShape,
          search: z
            .string()
            .max(200)
            .optional()
            .describe("Filtre optionnel : texte recherché dans le titre"),
        },
      },
      async (args) =>
        run(async () => {
          const { skip, take, page, limit } = pageArgs(args);
          const where = args.search
            ? { title: { contains: args.search, mode: "insensitive" as const } }
            : {};
          const [posts, total] = await Promise.all([
            prisma.post.findMany({
              where,
              skip,
              take,
              orderBy: { date: "desc" },
              select: { id: true, title: true, date: true, excerpt: true },
            }),
            prisma.post.count({ where }),
          ]);
          return ok({ posts, total, page, limit });
        })
    );

    server.registerTool(
      "posts_get",
      {
        description:
          "Récupère un article complet du blog par son identifiant, champs SEO inclus.",
        inputSchema: {
          id: z.string().min(1).describe("Identifiant de l'article"),
        },
      },
      async (args) =>
        run(async () => {
          const post = await prisma.post.findUnique({ where: { id: args.id } });
          if (!post) return fail("Article introuvable : aucun article avec cet identifiant.");
          return ok(post);
        })
    );
  }

  if (canWrite) {
    server.registerTool(
      "posts_create",
      {
        description:
          "Crée un nouvel article de blog sur le site. Attention : le site n'a pas de système de brouillon — l'article créé est immédiatement en ligne. L'auteur attribué est le compte configuré par l'administrateur.",
        inputSchema: {
          title: z.string().min(1).max(300).describe("Titre de l'article"),
          content: z.string().min(1).max(200000).describe("Contenu de l'article (HTML ou texte)"),
          excerpt: z.string().max(1000).optional().describe("Extrait / résumé court"),
          date: z
            .string()
            .optional()
            .describe("Date de publication au format ISO 8601 (défaut : maintenant)"),
          seoTitle: z.string().max(300).optional().describe("Titre SEO (optionnel)"),
          seoDescription: z.string().max(500).optional().describe("Description SEO (optionnel)"),
          seoKeywords: z.string().max(500).optional().describe("Mots-clés SEO, séparés par des virgules (optionnel)"),
        },
      },
      async (args) =>
        run(async () => {
          let authorId: string;
          try {
            authorId = await resolveAuthorId();
          } catch (e) {
            if (e instanceof Error && e.message === "MCP_AUTHOR_ID_CONFIG") {
              return fail(
                "Configuration incomplète : MCP_AUTHOR_ID ne correspond à aucun utilisateur du site. Contactez l'administrateur."
              );
            }
            return fail(
              "Aucun auteur disponible pour attribuer l'article : définissez MCP_AUTHOR_ID ou créez le compte administrateur. Contactez l'administrateur du site."
            );
          }
          const date = args.date ? parseDate(args.date) : new Date();
          if (!date) return fail("Date invalide : utilisez le format ISO 8601 (ex. 2026-11-05T10:00:00Z).");
          const post = await prisma.post.create({
            data: {
              title: args.title,
              content: args.content,
              excerpt: args.excerpt ?? null,
              date,
              seoTitle: args.seoTitle ?? null,
              seoDescription: args.seoDescription ?? null,
              seoKeywords: args.seoKeywords ?? null,
              author: { connect: { id: authorId } },
            },
          });
          await writeAuditLog(ctx.tokenId, "posts_create", "Post", post.id);
          return ok(post);
        })
    );

    server.registerTool(
      "posts_update",
      {
        description:
          "Modifie un article existant du blog. Seuls les champs fournis sont mis à jour.",
        inputSchema: {
          id: z.string().min(1).describe("Identifiant de l'article"),
          title: z.string().min(1).max(300).optional(),
          content: z.string().min(1).max(200000).optional(),
          excerpt: z.string().max(1000).nullable().optional(),
          date: z.string().optional().describe("Nouvelle date, format ISO 8601"),
          seoTitle: z.string().max(300).nullable().optional(),
          seoDescription: z.string().max(500).nullable().optional(),
          seoKeywords: z.string().max(500).nullable().optional(),
        },
      },
      async (args) =>
        run(async () => {
          const existing = await prisma.post.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Article introuvable : aucun article avec cet identifiant.");
          const data: Record<string, unknown> = {};
          if (args.title !== undefined) data.title = args.title;
          if (args.content !== undefined) data.content = args.content;
          if (args.excerpt !== undefined) data.excerpt = args.excerpt;
          if (args.seoTitle !== undefined) data.seoTitle = args.seoTitle;
          if (args.seoDescription !== undefined) data.seoDescription = args.seoDescription;
          if (args.seoKeywords !== undefined) data.seoKeywords = args.seoKeywords;
          if (args.date !== undefined) {
            const d = parseDate(args.date);
            if (!d) return fail("Date invalide : utilisez le format ISO 8601.");
            data.date = d;
          }
          if (Object.keys(data).length === 0) {
            return fail("Aucun champ à mettre à jour : fournissez au moins un champ à modifier.");
          }
          const post = await prisma.post.update({ where: { id: args.id }, data });
          await writeAuditLog(ctx.tokenId, "posts_update", "Post", post.id);
          return ok(post);
        })
    );

    server.registerTool(
      "posts_delete",
      {
        description:
          "Supprime définitivement un article du blog. Irréversible : exige confirm: true.",
        inputSchema: {
          id: z.string().min(1).describe("Identifiant de l'article"),
          confirm: z.boolean().describe("Doit valoir true pour confirmer la suppression"),
        },
      },
      async (args) =>
        run(async () => {
          if (!args.confirm) {
            return fail("Suppression refusée : relancez avec confirm: true pour confirmer la suppression définitive.");
          }
          const existing = await prisma.post.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Article introuvable : aucun article avec cet identifiant.");
          await prisma.post.delete({ where: { id: args.id } });
          await writeAuditLog(ctx.tokenId, "posts_delete", "Post", args.id);
          return ok({ deleted: true, id: args.id });
        })
    );
  }

  // -------------------------------------------------------------------------
  // FAQ
  // -------------------------------------------------------------------------
  if (canRead) {
    server.registerTool(
      "faq_list",
      {
        description: "Liste les questions-réponses de la FAQ du site. Réponse paginée.",
        inputSchema: { ...paginationShape },
      },
      async (args) =>
        run(async () => {
          const { skip, take, page, limit } = pageArgs(args);
          const [faqs, total] = await Promise.all([
            prisma.fAQ.findMany({ skip, take, orderBy: { createdAt: "asc" } }),
            prisma.fAQ.count(),
          ]);
          return ok({ faqs, total, page, limit });
        })
    );
  }

  if (canWrite) {
    server.registerTool(
      "faq_create",
      {
        description: "Ajoute une question-réponse à la FAQ du site.",
        inputSchema: {
          question: z.string().min(1).max(1000).describe("La question"),
          answer: z.string().min(1).max(200000).describe("La réponse"),
        },
      },
      async (args) =>
        run(async () => {
          const faq = await prisma.fAQ.create({
            data: { question: args.question, answer: args.answer },
          });
          await writeAuditLog(ctx.tokenId, "faq_create", "FAQ", faq.id);
          return ok(faq);
        })
    );

    server.registerTool(
      "faq_update",
      {
        description: "Modifie une question-réponse de la FAQ. Seuls les champs fournis sont mis à jour.",
        inputSchema: {
          id: z.string().min(1),
          question: z.string().min(1).max(1000).optional(),
          answer: z.string().min(1).max(200000).optional(),
        },
      },
      async (args) =>
        run(async () => {
          const existing = await prisma.fAQ.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Question introuvable : aucun élément de FAQ avec cet identifiant.");
          const data: Record<string, unknown> = {};
          if (args.question !== undefined) data.question = args.question;
          if (args.answer !== undefined) data.answer = args.answer;
          if (Object.keys(data).length === 0) {
            return fail("Aucun champ à mettre à jour : fournissez question et/ou answer.");
          }
          const faq = await prisma.fAQ.update({ where: { id: args.id }, data });
          await writeAuditLog(ctx.tokenId, "faq_update", "FAQ", faq.id);
          return ok(faq);
        })
    );

    server.registerTool(
      "faq_delete",
      {
        description: "Supprime définitivement un élément de la FAQ. Irréversible : exige confirm: true.",
        inputSchema: {
          id: z.string().min(1),
          confirm: z.boolean().describe("Doit valoir true pour confirmer la suppression"),
        },
      },
      async (args) =>
        run(async () => {
          if (!args.confirm) {
            return fail("Suppression refusée : relancez avec confirm: true pour confirmer la suppression définitive.");
          }
          const existing = await prisma.fAQ.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Question introuvable : aucun élément de FAQ avec cet identifiant.");
          await prisma.fAQ.delete({ where: { id: args.id } });
          await writeAuditLog(ctx.tokenId, "faq_delete", "FAQ", args.id);
          return ok({ deleted: true, id: args.id });
        })
    );
  }

  // -------------------------------------------------------------------------
  // Services
  // -------------------------------------------------------------------------
  if (canRead) {
    server.registerTool(
      "services_list",
      {
        description: "Liste les services présentés sur le site. Réponse paginée.",
        inputSchema: { ...paginationShape },
      },
      async (args) =>
        run(async () => {
          const { skip, take, page, limit } = pageArgs(args);
          const [services, total] = await Promise.all([
            prisma.service.findMany({ skip, take, orderBy: { createdAt: "asc" } }),
            prisma.service.count(),
          ]);
          return ok({ services, total, page, limit });
        })
    );

    server.registerTool(
      "services_get",
      {
        description: "Récupère un service du site par son identifiant.",
        inputSchema: { id: z.string().min(1).describe("Identifiant du service") },
      },
      async (args) =>
        run(async () => {
          const service = await prisma.service.findUnique({ where: { id: args.id } });
          if (!service) return fail("Service introuvable : aucun service avec cet identifiant.");
          return ok(service);
        })
    );
  }

  if (canWrite) {
    server.registerTool(
      "services_create",
      {
        description: "Ajoute un service à la page Services du site.",
        inputSchema: {
          title: z.string().min(1).max(300).describe("Nom du service"),
          description: z.string().min(1).max(200000).describe("Description du service"),
          price: z.string().max(200).optional().describe("Prix affiché (texte libre, optionnel)"),
          period: z.string().max(200).optional().describe("Période / durée (texte libre, optionnel)"),
          features: z
            .array(z.string().min(1).max(500))
            .max(30)
            .optional()
            .describe("Liste des prestations incluses (optionnel)"),
        },
      },
      async (args) =>
        run(async () => {
          const service = await prisma.service.create({
            data: {
              title: args.title,
              description: args.description,
              price: args.price ?? null,
              period: args.period ?? null,
              features: args.features ?? [],
            },
          });
          await writeAuditLog(ctx.tokenId, "services_create", "Service", service.id);
          return ok(service);
        })
    );

    server.registerTool(
      "services_update",
      {
        description: "Modifie un service existant. Seuls les champs fournis sont mis à jour.",
        inputSchema: {
          id: z.string().min(1),
          title: z.string().min(1).max(300).optional(),
          description: z.string().min(1).max(200000).optional(),
          price: z.string().max(200).nullable().optional(),
          period: z.string().max(200).nullable().optional(),
          features: z.array(z.string().min(1).max(500)).max(30).optional(),
        },
      },
      async (args) =>
        run(async () => {
          const existing = await prisma.service.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Service introuvable : aucun service avec cet identifiant.");
          const data: Record<string, unknown> = {};
          if (args.title !== undefined) data.title = args.title;
          if (args.description !== undefined) data.description = args.description;
          if (args.price !== undefined) data.price = args.price;
          if (args.period !== undefined) data.period = args.period;
          if (args.features !== undefined) data.features = args.features;
          if (Object.keys(data).length === 0) {
            return fail("Aucun champ à mettre à jour : fournissez au moins un champ à modifier.");
          }
          const service = await prisma.service.update({ where: { id: args.id }, data });
          await writeAuditLog(ctx.tokenId, "services_update", "Service", service.id);
          return ok(service);
        })
    );

    server.registerTool(
      "services_delete",
      {
        description: "Supprime définitivement un service du site. Irréversible : exige confirm: true.",
        inputSchema: {
          id: z.string().min(1),
          confirm: z.boolean().describe("Doit valoir true pour confirmer la suppression"),
        },
      },
      async (args) =>
        run(async () => {
          if (!args.confirm) {
            return fail("Suppression refusée : relancez avec confirm: true pour confirmer la suppression définitive.");
          }
          const existing = await prisma.service.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Service introuvable : aucun service avec cet identifiant.");
          await prisma.service.delete({ where: { id: args.id } });
          await writeAuditLog(ctx.tokenId, "services_delete", "Service", args.id);
          return ok({ deleted: true, id: args.id });
        })
    );
  }

  // -------------------------------------------------------------------------
  // Équipe (TeamMember)
  // -------------------------------------------------------------------------
  if (canRead) {
    server.registerTool(
      "team_list",
      {
        description: "Liste les membres de l'équipe présentés sur le site. Réponse paginée.",
        inputSchema: { ...paginationShape },
      },
      async (args) =>
        run(async () => {
          const { skip, take, page, limit } = pageArgs(args);
          const [members, total] = await Promise.all([
            prisma.teamMember.findMany({ skip, take, orderBy: { createdAt: "asc" } }),
            prisma.teamMember.count(),
          ]);
          return ok({ members, total, page, limit });
        })
    );
  }

  if (canWrite) {
    server.registerTool(
      "team_create",
      {
        description: "Ajoute un membre à la page Équipe du site.",
        inputSchema: {
          name: z.string().min(1).max(200).describe("Nom complet"),
          role: z.string().min(1).max(200).describe("Fonction / rôle"),
          bio: z.string().min(1).max(200000).describe("Biographie courte"),
          image: z.string().max(1000).optional().describe("URL de la photo (optionnel — pas d'envoi de fichier via le connecteur)"),
          linkedin: z.string().max(1000).optional().describe("URL du profil LinkedIn (optionnel)"),
        },
      },
      async (args) =>
        run(async () => {
          const member = await prisma.teamMember.create({
            data: {
              name: args.name,
              role: args.role,
              bio: args.bio,
              image: args.image ?? null,
              linkedin: args.linkedin ?? null,
            },
          });
          await writeAuditLog(ctx.tokenId, "team_create", "TeamMember", member.id);
          return ok(member);
        })
    );

    server.registerTool(
      "team_update",
      {
        description: "Modifie la fiche d'un membre de l'équipe. Seuls les champs fournis sont mis à jour.",
        inputSchema: {
          id: z.string().min(1),
          name: z.string().min(1).max(200).optional(),
          role: z.string().min(1).max(200).optional(),
          bio: z.string().min(1).max(200000).optional(),
          image: z.string().max(1000).nullable().optional(),
          linkedin: z.string().max(1000).nullable().optional(),
        },
      },
      async (args) =>
        run(async () => {
          const existing = await prisma.teamMember.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Membre introuvable : aucun membre de l'équipe avec cet identifiant.");
          const data: Record<string, unknown> = {};
          if (args.name !== undefined) data.name = args.name;
          if (args.role !== undefined) data.role = args.role;
          if (args.bio !== undefined) data.bio = args.bio;
          if (args.image !== undefined) data.image = args.image;
          if (args.linkedin !== undefined) data.linkedin = args.linkedin;
          if (Object.keys(data).length === 0) {
            return fail("Aucun champ à mettre à jour : fournissez au moins un champ à modifier.");
          }
          const member = await prisma.teamMember.update({ where: { id: args.id }, data });
          await writeAuditLog(ctx.tokenId, "team_update", "TeamMember", member.id);
          return ok(member);
        })
    );

    server.registerTool(
      "team_delete",
      {
        description: "Supprime définitivement un membre de la page Équipe. Irréversible : exige confirm: true.",
        inputSchema: {
          id: z.string().min(1),
          confirm: z.boolean().describe("Doit valoir true pour confirmer la suppression"),
        },
      },
      async (args) =>
        run(async () => {
          if (!args.confirm) {
            return fail("Suppression refusée : relancez avec confirm: true pour confirmer la suppression définitive.");
          }
          const existing = await prisma.teamMember.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Membre introuvable : aucun membre de l'équipe avec cet identifiant.");
          await prisma.teamMember.delete({ where: { id: args.id } });
          await writeAuditLog(ctx.tokenId, "team_delete", "TeamMember", args.id);
          return ok({ deleted: true, id: args.id });
        })
    );
  }

  // -------------------------------------------------------------------------
  // Témoignages (Testimonial)
  // -------------------------------------------------------------------------
  if (canRead) {
    server.registerTool(
      "testimonials_list",
      {
        description: "Liste les témoignages clients affichés sur le site. Réponse paginée.",
        inputSchema: { ...paginationShape },
      },
      async (args) =>
        run(async () => {
          const { skip, take, page, limit } = pageArgs(args);
          const [testimonials, total] = await Promise.all([
            prisma.testimonial.findMany({ skip, take, orderBy: { createdAt: "asc" } }),
            prisma.testimonial.count(),
          ]);
          return ok({ testimonials, total, page, limit });
        })
    );
  }

  if (canWrite) {
    server.registerTool(
      "testimonials_create",
      {
        description: "Ajoute un témoignage client sur le site.",
        inputSchema: {
          name: z.string().min(1).max(200).describe("Nom de l'auteur du témoignage"),
          text: z.string().min(1).max(200000).describe("Texte du témoignage"),
          company: z.string().max(200).optional().describe("Entreprise de l'auteur (optionnel)"),
        },
      },
      async (args) =>
        run(async () => {
          const testimonial = await prisma.testimonial.create({
            data: { name: args.name, text: args.text, company: args.company ?? null },
          });
          await writeAuditLog(ctx.tokenId, "testimonials_create", "Testimonial", testimonial.id);
          return ok(testimonial);
        })
    );

    server.registerTool(
      "testimonials_update",
      {
        description: "Modifie un témoignage existant. Seuls les champs fournis sont mis à jour.",
        inputSchema: {
          id: z.string().min(1),
          name: z.string().min(1).max(200).optional(),
          text: z.string().min(1).max(200000).optional(),
          company: z.string().max(200).nullable().optional(),
        },
      },
      async (args) =>
        run(async () => {
          const existing = await prisma.testimonial.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Témoignage introuvable : aucun témoignage avec cet identifiant.");
          const data: Record<string, unknown> = {};
          if (args.name !== undefined) data.name = args.name;
          if (args.text !== undefined) data.text = args.text;
          if (args.company !== undefined) data.company = args.company;
          if (Object.keys(data).length === 0) {
            return fail("Aucun champ à mettre à jour : fournissez au moins un champ à modifier.");
          }
          const testimonial = await prisma.testimonial.update({ where: { id: args.id }, data });
          await writeAuditLog(ctx.tokenId, "testimonials_update", "Testimonial", testimonial.id);
          return ok(testimonial);
        })
    );

    server.registerTool(
      "testimonials_delete",
      {
        description: "Supprime définitivement un témoignage. Irréversible : exige confirm: true.",
        inputSchema: {
          id: z.string().min(1),
          confirm: z.boolean().describe("Doit valoir true pour confirmer la suppression"),
        },
      },
      async (args) =>
        run(async () => {
          if (!args.confirm) {
            return fail("Suppression refusée : relancez avec confirm: true pour confirmer la suppression définitive.");
          }
          const existing = await prisma.testimonial.findUnique({ where: { id: args.id } });
          if (!existing) return fail("Témoignage introuvable : aucun témoignage avec cet identifiant.");
          await prisma.testimonial.delete({ where: { id: args.id } });
          await writeAuditLog(ctx.tokenId, "testimonials_delete", "Testimonial", args.id);
          return ok({ deleted: true, id: args.id });
        })
    );
  }

  // -------------------------------------------------------------------------
  // Infos de contact (ContactInfo — ligne unique)
  // -------------------------------------------------------------------------
  if (canRead) {
    server.registerTool(
      "contact_info_get",
      {
        description:
          "Récupère les coordonnées officielles affichées sur le site (téléphone, e-mail, adresse, réseaux sociaux).",
        inputSchema: {},
      },
      async () =>
        run(async () => {
          const info = await prisma.contactInfo.findFirst({ orderBy: { id: "asc" } });
          if (!info) return fail("Aucune information de contact enregistrée sur le site pour le moment.");
          return ok(info);
        })
    );
  }

  if (canWrite) {
    server.registerTool(
      "contact_info_update",
      {
        description:
          "Met à jour les coordonnées affichées sur le site (téléphone, e-mail, adresse, réseaux sociaux). Seuls les champs fournis sont modifiés.",
        inputSchema: {
          phone: z.string().min(1).max(100).optional(),
          email: z.string().email("Adresse e-mail invalide").max(200).optional(),
          address: z.string().max(500).nullable().optional(),
          facebookUrl: z.string().max(1000).nullable().optional(),
          linkedinUrl: z.string().max(1000).nullable().optional(),
          twitterUrl: z.string().max(1000).nullable().optional(),
        },
      },
      async (args) =>
        run(async () => {
          const data: Record<string, unknown> = {};
          if (args.phone !== undefined) data.phone = args.phone;
          if (args.email !== undefined) data.email = args.email;
          if (args.address !== undefined) data.address = args.address;
          if (args.facebookUrl !== undefined) data.facebookUrl = args.facebookUrl;
          if (args.linkedinUrl !== undefined) data.linkedinUrl = args.linkedinUrl;
          if (args.twitterUrl !== undefined) data.twitterUrl = args.twitterUrl;
          if (Object.keys(data).length === 0) {
            return fail("Aucun champ à mettre à jour : fournissez au moins une coordonnée à modifier.");
          }
          const existing = await prisma.contactInfo.findFirst({ orderBy: { id: "asc" } });
          if (!existing) {
            if (!args.phone || !args.email) {
              return fail(
                "Aucune coordonnée enregistrée : pour la première création, fournissez au minimum phone et email."
              );
            }
            const created = await prisma.contactInfo.create({
              data: {
                phone: args.phone,
                email: args.email,
                address: args.address ?? null,
                facebookUrl: args.facebookUrl ?? null,
                linkedinUrl: args.linkedinUrl ?? null,
                twitterUrl: args.twitterUrl ?? null,
              },
            });
            await writeAuditLog(ctx.tokenId, "contact_info_update", "ContactInfo", String(created.id));
            return ok(created);
          }
          const updated = await prisma.contactInfo.update({
            where: { id: existing.id },
            data,
          });
          await writeAuditLog(ctx.tokenId, "contact_info_update", "ContactInfo", String(updated.id));
          return ok(updated);
        })
    );
  }
}
