// Dynamic Client Registration (RFC 7591) : permet à ChatGPT, Claude et aux
// autres clients MCP de s'enregistrer automatiquement avant le flux OAuth.
// Les redirect_uris déclarées ici sont celles qui seront exigées, à
// l'identique, lors des demandes d'autorisation.

import { NextRequest, NextResponse } from "next/server";
import { isMcpConfigured, MCP_SCOPES, parseScopes } from "@/lib/mcp/config";
import { registerMcpClient } from "@/lib/mcp/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function oauthError(error: string, description: string, status = 400) {
  return NextResponse.json(
    { error, error_description: description },
    { status }
  );
}

export async function POST(req: NextRequest) {
  if (!isMcpConfigured()) {
    return oauthError(
      "server_error",
      "Connecteur MCP non configuré sur ce site.",
      503
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return oauthError("invalid_client_metadata", "Corps JSON invalide.");
  }

  const redirectUris = body.redirect_uris;
  if (
    !Array.isArray(redirectUris) ||
    redirectUris.length === 0 ||
    !redirectUris.every((u) => typeof u === "string" && /^https?:\/\/.+/.test(u))
  ) {
    return oauthError(
      "invalid_redirect_uri",
      "redirect_uris est obligatoire : un tableau d'au moins une URL de redirection valide."
    );
  }

  const clientName =
    typeof body.client_name === "string" ? body.client_name.slice(0, 200) : null;
  const requestedScopes =
    typeof body.scope === "string" && parseScopes(body.scope).length > 0
      ? parseScopes(body.scope)
      : [...MCP_SCOPES];

  const { clientId, clientSecret } = await registerMcpClient({
    name: clientName,
    redirectUris: redirectUris as string[],
  });

  return NextResponse.json(
    {
      client_id: clientId,
      client_secret: clientSecret,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_secret_expires_at: 0,
      client_name: clientName ?? undefined,
      redirect_uris: redirectUris,
      token_endpoint_auth_method: "client_secret_post",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      scope: requestedScopes.join(" "),
    },
    { status: 201 }
  );
}
