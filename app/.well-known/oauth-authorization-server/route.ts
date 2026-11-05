// Métadonnées du serveur d'autorisation OAuth 2.1 (RFC 8414).
// PKCE S256 uniquement ; grants authorization_code et refresh_token.

import { NextResponse } from "next/server";
import { getMcpConfig, isMcpConfigured, MCP_SCOPES } from "@/lib/mcp/config";

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
    issuer,
    authorization_endpoint: `${issuer}/oauth/authorize`,
    token_endpoint: `${issuer}/api/oauth/token`,
    registration_endpoint: `${issuer}/api/oauth/register`,
    scopes_supported: [...MCP_SCOPES],
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post", "client_secret_basic"],
  });
}
