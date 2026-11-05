// Métadonnées de la ressource protégée (RFC 9728) pour l'endpoint MCP.
// Permet aux clients (ChatGPT, Claude…) de découvrir le serveur
// d'autorisation à partir d'une réponse 401 de /api/mcp.

import { NextResponse } from "next/server";
import { getMcpConfig, isMcpConfigured, mcpResourceUrl, MCP_SCOPES } from "@/lib/mcp/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isMcpConfigured()) {
    return NextResponse.json(
      { error: "Connecteur MCP non configuré sur ce site." },
      { status: 503 }
    );
  }
  const { issuer } = getMcpConfig();
  return NextResponse.json({
    resource: mcpResourceUrl(issuer as string),
    authorization_servers: [issuer],
    scopes_supported: [...MCP_SCOPES],
    bearer_methods_supported: ["header"],
  });
}
