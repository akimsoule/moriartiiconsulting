/**
 * Génère un jeton d'accès personnel (PAT) pour le connecteur MCP.
 *
 * À quoi ça sert : certains clients MCP acceptent un en-tête Bearer statique
 * (Claude Desktop en configuration fichier, Cursor, mcp-remote…). Le PAT
 * donne alors accès aux mêmes outils que le flux OAuth, sans expiration —
 * mais il est révocable à tout moment en mettant `revokedAt` sur sa ligne
 * dans la table McpToken.
 *
 * Usage :
 *   npx tsx scripts/mcp-pat.ts
 *
 * Prérequis :
 *   - DATABASE_URL défini (le PAT est inséré dans la base du site) ;
 *   - la migration MCP appliquée (table McpToken présente).
 *
 * ATTENTION : le jeton en clair n'est affiché qu'UNE SEULE FOIS, à la fin de
 * l'exécution. Seul son haché SHA-256 est stocké en base. Copiez-le
 * immédiatement dans un endroit sûr ; en cas de perte, révoquez l'ancien
 * (revokedAt) et régénérez-en un nouveau.
 */

import { PrismaClient } from "@prisma/client";
import { createHash, randomBytes } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const plain = "mcp_pat_" + randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(plain, "utf8").digest("hex");

  const row = await prisma.mcpToken.create({
    data: {
      tokenHash,
      type: "pat",
      clientId: null,
      scopes: "content:read content:write",
      expiresAt: null, // pas d'expiration ; révocable via revokedAt
    },
  });

  console.log("Jeton d'accès personnel (PAT) créé — ID interne :", row.id);
  console.log("Scopes : content:read content:write");
  console.log("");
  console.log("JETON (affiché une seule fois) :");
  console.log(plain);
}

main()
  .catch((e) => {
    console.error("Échec de la génération du PAT :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
