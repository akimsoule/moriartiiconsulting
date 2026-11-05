// Configuration du connecteur MCP (lue depuis l'environnement, jamais codée en dur).
// Voir .env.example et GUIDE-MCP-AFIZ.md.

export interface McpConfig {
  /** Émetteur OAuth 2.1, p. ex. https://www.moriartiiconsulting.org (sans slash final). */
  issuer: string | null;
  /** SHA-256 (hex) du code personnel du propriétaire — jamais le code en clair. */
  ownerCodeHash: string | null;
  /** Id du User auquel attribuer les articles créés via MCP (repli : compte admin). */
  authorId: string | null;
}

export function getMcpConfig(): McpConfig {
  const issuer = process.env.OAUTH_ISSUER?.trim().replace(/\/+$/, "") || null;
  const ownerCodeHash = process.env.MCP_OWNER_CODE_HASH?.trim() || null;
  const authorId = process.env.MCP_AUTHOR_ID?.trim() || null;
  return { issuer, ownerCodeHash, authorId };
}

/**
 * Le connecteur est considéré « configuré » si l'émetteur OAuth et le haché du
 * code personnel sont présents. Sans cela, les endpoints MCP/OAuth répondent
 * 503 sans rien exposer, et le reste du site fonctionne normalement.
 */
export function isMcpConfigured(): boolean {
  const { issuer, ownerCodeHash } = getMcpConfig();
  return Boolean(issuer && ownerCodeHash);
}

/** Scopes OAuth/MCP supportés par le connecteur. */
export const MCP_SCOPES = ["content:read", "content:write"] as const;

export function parseScopes(scope: string | null | undefined): string[] {
  if (!scope) return [];
  return scope.split(/\s+/).filter((s) => (MCP_SCOPES as readonly string[]).includes(s));
}

/** URL publique de l'endpoint MCP, dérivée de l'émetteur configuré. */
export function mcpResourceUrl(issuer: string): string {
  return `${issuer}/api/mcp`;
}

/** URL du document de métadonnées de la ressource protégée (RFC 9728). */
export function protectedResourceMetadataUrl(issuer: string): string {
  return `${issuer}/.well-known/oauth-protected-resource`;
}
