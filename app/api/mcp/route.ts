// Endpoint MCP du connecteur : POST /api/mcp
// Protocole MCP en Streamable HTTP, sans état de session côté serveur :
// chaque requête porte son jeton Bearer (accès OAuth ou PAT), vérifié en base.
// Runtime Node.js obligatoire (Prisma ne fonctionne pas en Edge Runtime).

import { NextRequest, NextResponse } from "next/server";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import {
  getMcpConfig,
  isMcpConfigured,
  protectedResourceMetadataUrl,
} from "@/lib/mcp/config";
import { checkRateLimit, verifyBearerToken } from "@/lib/mcp/tokens";
import { createMcpServer } from "@/lib/mcp/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Borne par jeton (spec §7). Limite connue : compteur en mémoire, donc par
// instance Vercel chaude — la borne réelle peut être multipliée par le
// nombre d'instances.
const RATE_LIMIT = 120;
const RATE_WINDOW_MS = 5 * 60 * 1000;

function unauthorizedResponse(): NextResponse {
  const { issuer } = getMcpConfig();
  const headers: Record<string, string> = {};
  if (issuer) {
    headers["WWW-Authenticate"] =
      `Bearer <redacted>, resource_metadata="${protectedResourceMetadataUrl(issuer)}"`;
  }
  return NextResponse.json(
    { error: "Non autorisé : jeton Bearer manquant, invalide, expiré ou révoqué." },
    { status: 401, headers }
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  if (!isMcpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Connecteur MCP non configuré sur ce site (variables OAUTH_ISSUER et MCP_OWNER_CODE_HASH absentes).",
      },
      { status: 503 }
    );
  }

  const authorization = req.headers.get("authorization");
  const bearer =
    authorization && authorization.startsWith("Bearer ")
      ? authorization.slice("Bearer ".length).trim()
      : null;
  if (!bearer) return unauthorizedResponse();

  const verified = await verifyBearerToken(bearer);
  if (!verified) return unauthorizedResponse();

  if (!checkRateLimit(`mcp:${verified.tokenId}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Trop de requêtes : limite de débit atteinte, réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  const server = createMcpServer({
    tokenId: verified.tokenId,
    scopes: verified.scopes,
  });
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // mode sans état
    enableJsonResponse: true,
  });
  await server.connect(transport);

  return transport.handleRequest(req, {
    authInfo: {
      token: bearer,
      clientId: verified.clientId ?? "",
      scopes: verified.scopes,
      extra: { tokenId: verified.tokenId, tokenType: verified.type },
    },
  });
}

export async function GET(): Promise<Response> {
  return NextResponse.json(
    { error: "Méthode non autorisée : l'endpoint MCP n'accepte que POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function DELETE(): Promise<Response> {
  return NextResponse.json(
    { error: "Méthode non autorisée : l'endpoint MCP n'accepte que POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
