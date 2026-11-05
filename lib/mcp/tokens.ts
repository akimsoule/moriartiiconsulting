// Gestion des secrets du connecteur MCP : clients OAuth, codes d'autorisation,
// jetons d'accès / de rafraîchissement / personnels (PAT), journal d'audit et
// limitation de débit en mémoire.
//
// Règle absolue : aucun code ni jeton n'est stocké en clair. Seul le SHA-256
// (hex) est conservé en base ; la valeur en clair n'existe qu'au moment de
// l'émission, dans la réponse faite au client.

import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";

export const ACCESS_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 h
export const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 j
export const AUTH_CODE_TTL_MS = 10 * 60 * 1000; // 10 min

// ---------------------------------------------------------------------------
// Hachage et comparaison en temps constant
// ---------------------------------------------------------------------------

export function hashSecret(plain: string): string {
  return createHash("sha256").update(plain, "utf8").digest("hex");
}

export function secretHashMatches(plain: string, expectedHashHex: string): boolean {
  const a = Buffer.from(hashSecret(plain), "hex");
  const b = Buffer.from(expectedHashHex, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function generatePrefixedSecret(prefix: string): string {
  // 32 octets d'aléa, encodés base64url.
  return prefix + randomBytes(32).toString("base64url");
}

// Vérification PKCE S256 : base64url(SHA-256(verifier)) doit égaler le challenge.
export function verifyPkceS256(verifier: string, challenge: string): boolean {
  const computed = createHash("sha256").update(verifier, "utf8").digest("base64url");
  const a = Buffer.from(computed, "utf8");
  const b = Buffer.from(challenge, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// ---------------------------------------------------------------------------
// Clients OAuth (Dynamic Client Registration)
// ---------------------------------------------------------------------------

export interface RegisteredClient {
  clientId: string;
  clientSecret: string;
}

export async function registerMcpClient(input: {
  name?: string | null;
  redirectUris: string[];
}): Promise<RegisteredClient> {
  const clientId = "mcp_client_" + randomBytes(16).toString("base64url");
  const clientSecret = randomBytes(32).toString("base64url");
  await prisma.mcpClient.create({
    data: {
      clientId,
      clientSecretHash: hashSecret(clientSecret),
      name: input.name ?? null,
      redirectUris: input.redirectUris,
    },
  });
  return { clientId, clientSecret };
}

export async function findMcpClient(clientId: string) {
  return prisma.mcpClient.findUnique({ where: { clientId } });
}

export function verifyClientSecret(
  client: { clientSecretHash: string | null },
  secret: string | null | undefined
): boolean {
  // Client public : aucun secret enregistré, PKCE seul fait foi.
  if (!client.clientSecretHash) return true;
  if (!secret) return false;
  return secretHashMatches(secret, client.clientSecretHash);
}

// ---------------------------------------------------------------------------
// Codes d'autorisation (usage unique, 10 min)
// ---------------------------------------------------------------------------

export async function createAuthCode(input: {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  scopes: string[];
}): Promise<string> {
  const code = generatePrefixedSecret("mcp_code_");
  await prisma.mcpAuthCode.create({
    data: {
      codeHash: hashSecret(code),
      clientId: input.clientId,
      redirectUri: input.redirectUri,
      codeChallenge: input.codeChallenge,
      scopes: input.scopes.join(" "),
      expiresAt: new Date(Date.now() + AUTH_CODE_TTL_MS),
    },
  });
  return code;
}

export async function consumeAuthCode(code: string) {
  const row = await prisma.mcpAuthCode.findUnique({
    where: { codeHash: hashSecret(code) },
  });
  if (!row || row.usedAt || row.expiresAt.getTime() < Date.now()) return null;
  // Marqué utilisé immédiatement pour empêcher tout rejeu.
  await prisma.mcpAuthCode.update({
    where: { id: row.id },
    data: { usedAt: new Date() },
  });
  return row;
}

// ---------------------------------------------------------------------------
// Jetons d'accès, de rafraîchissement et personnels
// ---------------------------------------------------------------------------

async function storeToken(
  type: "access" | "refresh" | "pat",
  plain: string,
  input: { clientId?: string | null; scopes: string[]; ttlMs: number | null }
): Promise<void> {
  await prisma.mcpToken.create({
    data: {
      tokenHash: hashSecret(plain),
      type,
      clientId: input.clientId ?? null,
      scopes: input.scopes.join(" "),
      expiresAt: input.ttlMs ? new Date(Date.now() + input.ttlMs) : null,
    },
  });
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // secondes
  scopes: string[];
}

export async function createTokenPair(
  clientId: string | null,
  scopes: string[]
): Promise<TokenPair> {
  const accessToken = generatePrefixedSecret("mcp_at_");
  const refreshToken = generatePrefixedSecret("mcp_rt_");
  await storeToken("access", accessToken, {
    clientId,
    scopes,
    ttlMs: ACCESS_TOKEN_TTL_MS,
  });
  await storeToken("refresh", refreshToken, {
    clientId,
    scopes,
    ttlMs: REFRESH_TOKEN_TTL_MS,
  });
  return {
    accessToken,
    refreshToken,
    expiresIn: Math.floor(ACCESS_TOKEN_TTL_MS / 1000),
    scopes,
  };
}

/** Crée un jeton d'accès personnel (PAT) : sans expiration, révocable en base. */
export async function createPat(scopes: string[]): Promise<string> {
  const pat = generatePrefixedSecret("mcp_pat_");
  await storeToken("pat", pat, { clientId: null, scopes, ttlMs: null });
  return pat;
}

export interface VerifiedToken {
  tokenId: string;
  type: string;
  clientId: string | null;
  scopes: string[];
}

/**
 * Vérifie un jeton Bearer présenté à l'endpoint MCP.
 * Seuls les jetons d'accès OAuth et les PAT sont acceptés (jamais un refresh).
 */
export async function verifyBearerToken(plain: string): Promise<VerifiedToken | null> {
  if (!plain) return null;
  const row = await prisma.mcpToken.findUnique({
    where: { tokenHash: hashSecret(plain) },
  });
  if (!row) return null;
  if (row.type !== "access" && row.type !== "pat") return null;
  if (row.revokedAt) return null;
  if (row.expiresAt && row.expiresAt.getTime() < Date.now()) return null;
  // Traçabilité d'usage, sans bloquer l'appel en cours.
  prisma.mcpToken
    .update({ where: { id: row.id }, data: { lastUsedAt: new Date() } })
    .catch(() => {});
  return {
    tokenId: row.id,
    type: row.type,
    clientId: row.clientId,
    scopes: row.scopes.split(/\s+/).filter(Boolean),
  };
}

/**
 * Consomme un jeton de rafraîchissement (rotation) : l'ancien est révoqué et
 * un nouveau couple accès/rafraîchissement est émis avec les mêmes scopes.
 */
export async function consumeRefreshToken(
  plain: string
): Promise<(TokenPair & { clientId: string | null }) | null> {
  const row = await prisma.mcpToken.findUnique({
    where: { tokenHash: hashSecret(plain) },
  });
  if (!row || row.type !== "refresh") return null;
  if (row.revokedAt) return null;
  if (row.expiresAt && row.expiresAt.getTime() < Date.now()) return null;
  await prisma.mcpToken.update({
    where: { id: row.id },
    data: { revokedAt: new Date(), lastUsedAt: new Date() },
  });
  const scopes = row.scopes.split(/\s+/).filter(Boolean);
  const pair = await createTokenPair(row.clientId, scopes);
  return { ...pair, clientId: row.clientId };
}

/** Révoque immédiatement un jeton (par son identifiant interne). */
export async function revokeTokenById(tokenId: string): Promise<void> {
  await prisma.mcpToken.update({
    where: { id: tokenId },
    data: { revokedAt: new Date() },
  });
}

// ---------------------------------------------------------------------------
// Journal d'audit : outil + identifiant de l'objet touché, jamais de contenu.
// ---------------------------------------------------------------------------

export async function writeAuditLog(
  tokenId: string,
  tool: string,
  targetType?: string | null,
  targetId?: string | null
): Promise<void> {
  try {
    await prisma.mcpAuditLog.create({
      data: {
        tokenId,
        tool,
        targetType: targetType ?? null,
        targetId: targetId ?? null,
      },
    });
  } catch {
    // Le journal ne doit jamais faire échouer l'opération principale.
  }
}

// ---------------------------------------------------------------------------
// Limitation de débit en mémoire (par processus).
// Limite connue : sur Vercel, chaque instance a sa propre mémoire — la borne
// réelle par jeton peut donc être dépassée d'un facteur égal au nombre
// d'instances chaudes. Accepté en v1 (voir spec §7).
// ---------------------------------------------------------------------------

const rateLimitBuckets = new Map<string, number[]>();

function recentHits(key: string, windowMs: number): number[] {
  const now = Date.now();
  const hits = (rateLimitBuckets.get(key) ?? []).filter((t) => now - t < windowMs);
  rateLimitBuckets.set(key, hits);
  return hits;
}

/** Vrai si la clé a encore du crédit ; enregistre l'appel au passage. */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const hits = recentHits(key, windowMs);
  if (hits.length >= limit) return false;
  hits.push(Date.now());
  rateLimitBuckets.set(key, hits);
  return true;
}

/** Nombre d'événements récents pour une clé, sans rien enregistrer. */
export function countRecentEvents(key: string, windowMs: number): number {
  return recentHits(key, windowMs).length;
}

/** Enregistre un événement (échec, tentative…) pour une clé. */
export function recordEvent(key: string): void {
  const hits = rateLimitBuckets.get(key) ?? [];
  hits.push(Date.now());
  rateLimitBuckets.set(key, hits);
}
