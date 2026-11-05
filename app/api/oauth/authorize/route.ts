// Émission du code d'autorisation OAuth 2.1 (flux Authorization Code + PKCE).
// Appelé par le formulaire de la page /oauth/authorize : vérifie le client,
// l'URI de redirection enregistrée, la présence du challenge PKCE S256 et le
// code personnel du propriétaire (comparé en temps constant à son haché
// SHA-256, jamais stocké ni transmis en clair).
// Échecs du code personnel : 5 essais maximum par IP et par tranche de 15 min.

import { NextRequest, NextResponse } from "next/server";
import { getMcpConfig, isMcpConfigured, MCP_SCOPES, parseScopes } from "@/lib/mcp/config";
import {
  countRecentEvents,
  createAuthCode,
  findMcpClient,
  recordEvent,
  secretHashMatches,
} from "@/lib/mcp/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FAILED_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "inconnue";
}

function redirectWithParams(
  base: string,
  params: Record<string, string | undefined>
): NextResponse {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url, 302);
}

export async function POST(req: NextRequest) {
  if (!isMcpConfigured()) {
    return NextResponse.json(
      { error: "Connecteur MCP non configuré sur ce site." },
      { status: 503 }
    );
  }
  const config = getMcpConfig();

  const form = await req.formData();
  const get = (name: string) => {
    const v = form.get(name);
    return typeof v === "string" ? v : "";
  };

  const responseType = get("response_type") || "code";
  const clientId = get("client_id");
  const redirectUri = get("redirect_uri");
  const scopeParam = get("scope");
  const state = get("state");
  const codeChallenge = get("code_challenge");
  const codeChallengeMethod = get("code_challenge_method") || "S256";
  const ownerCode = get("owner_code");

  // Le client et son URI de redirection sont validés avant toute redirection :
  // jamais de redirection vers une URI non enregistrée.
  const client = clientId ? await findMcpClient(clientId) : null;
  if (!client) {
    return NextResponse.json(
      { error: "invalid_client", error_description: "Client OAuth inconnu." },
      { status: 400 }
    );
  }
  if (!redirectUri || !client.redirectUris.includes(redirectUri)) {
    return NextResponse.json(
      {
        error: "invalid_redirect_uri",
        error_description: "URI de redirection absente ou non enregistrée pour ce client.",
      },
      { status: 400 }
    );
  }

  const oauthError = (error: string, description: string) =>
    redirectWithParams(redirectUri, {
      error,
      error_description: description,
      state: state || undefined,
    });

  if (responseType !== "code") {
    return oauthError("unsupported_response_type", "Seul response_type=code est supporté.");
  }
  if (!codeChallenge || codeChallengeMethod !== "S256") {
    return oauthError(
      "invalid_request",
      "PKCE obligatoire : code_challenge absent ou code_challenge_method différent de S256."
    );
  }

  const scopes =
    parseScopes(scopeParam).length > 0 ? parseScopes(scopeParam) : [...MCP_SCOPES];

  // Limitation des tentatives sur le code personnel (par IP).
  const failKey = `oauth-authorize-fail:${clientIp(req)}`;
  if (countRecentEvents(failKey, ATTEMPT_WINDOW_MS) >= MAX_FAILED_ATTEMPTS) {
    return NextResponse.json(
      {
        error: "temporarily_unavailable",
        error_description:
          "Trop de codes incorrects : réessayez dans quelques minutes.",
      },
      { status: 429 }
    );
  }

  if (!ownerCode || !secretHashMatches(ownerCode, config.ownerCodeHash as string)) {
    recordEvent(failKey);
    // Retour au formulaire avec un message d'erreur, en conservant les
    // paramètres OAuth pour permettre une nouvelle tentative.
    const back = new URL(`${config.issuer}/oauth/authorize`);
    back.searchParams.set("response_type", responseType);
    back.searchParams.set("client_id", clientId);
    back.searchParams.set("redirect_uri", redirectUri);
    if (scopeParam) back.searchParams.set("scope", scopeParam);
    if (state) back.searchParams.set("state", state);
    back.searchParams.set("code_challenge", codeChallenge);
    back.searchParams.set("code_challenge_method", codeChallengeMethod);
    back.searchParams.set("error", "code_invalide");
    return NextResponse.redirect(back, 302);
  }

  const code = await createAuthCode({
    clientId,
    redirectUri,
    codeChallenge,
    scopes,
  });

  return redirectWithParams(redirectUri, {
    code,
    state: state || undefined,
  });
}
