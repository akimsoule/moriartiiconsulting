// Échange de jetons OAuth 2.1 : grant authorization_code (avec vérification
// PKCE S256) et grant refresh_token (avec rotation — l'ancien jeton de
// rafraîchissement est révoqué à chaque usage).
// Les jetons émis sont des valeurs aléatoires stockées hachées (SHA-256) :
// accès 1 h, rafraîchissement 30 j.

import { NextRequest, NextResponse } from "next/server";
import { isMcpConfigured } from "@/lib/mcp/config";
import {
  consumeAuthCode,
  consumeRefreshToken,
  createTokenPair,
  findMcpClient,
  verifyClientSecret,
  verifyPkceS256,
} from "@/lib/mcp/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function oauthError(error: string, description: string, status = 400) {
  return NextResponse.json({ error, error_description: description }, { status });
}

function tokenResponse(pair: {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  scopes: string[];
}) {
  return NextResponse.json(
    {
      access_token: pair.accessToken,
      token_type: "Bearer",
      expires_in: pair.expiresIn,
      refresh_token: pair.refreshToken,
      scope: pair.scopes.join(" "),
    },
    { headers: { "Cache-Control": "no-store", Pragma: "no-cache" } }
  );
}

export async function POST(req: NextRequest) {
  if (!isMcpConfigured()) {
    return oauthError("server_error", "Connecteur MCP non configuré sur ce site.", 503);
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return oauthError("invalid_request", "Corps de requête form-urlencoded attendu.");
  }
  const get = (name: string) => {
    const v = form.get(name);
    return typeof v === "string" ? v : "";
  };

  // Authentification du client : corps (client_secret_post) ou en-tête Basic.
  let clientId = get("client_id");
  let clientSecret = get("client_secret");
  const basic = req.headers.get("authorization");
  if (basic?.startsWith("Basic ")) {
    try {
      const decoded = Buffer.from(basic.slice("Basic ".length), "base64").toString("utf8");
      const sep = decoded.indexOf(":");
      if (sep >= 0) {
        clientId = clientId || decodeURIComponent(decoded.slice(0, sep));
        clientSecret = clientSecret || decodeURIComponent(decoded.slice(sep + 1));
      }
    } catch {
      // En-tête Basic illisible : on retombe sur les paramètres du corps.
    }
  }

  const grantType = get("grant_type");

  // -------------------------------------------------------------------------
  if (grantType === "authorization_code") {
    const code = get("code");
    const redirectUri = get("redirect_uri");
    const codeVerifier = get("code_verifier");
    if (!code || !codeVerifier) {
      return oauthError("invalid_request", "Paramètres code et code_verifier obligatoires.");
    }

    const client = clientId ? await findMcpClient(clientId) : null;
    if (!client) {
      return oauthError("invalid_client", "Client OAuth inconnu.", 401);
    }
    if (!verifyClientSecret(client, clientSecret || null)) {
      return oauthError("invalid_client", "Secret du client invalide.", 401);
    }

    const authCode = await consumeAuthCode(code);
    if (!authCode) {
      return oauthError("invalid_grant", "Code d'autorisation invalide, expiré ou déjà utilisé.");
    }
    if (authCode.clientId !== client.clientId) {
      return oauthError("invalid_grant", "Ce code n'a pas été émis pour ce client.");
    }
    if (redirectUri && redirectUri !== authCode.redirectUri) {
      return oauthError("invalid_grant", "redirect_uri différente de celle de la demande d'autorisation.");
    }
    if (!verifyPkceS256(codeVerifier, authCode.codeChallenge)) {
      return oauthError("invalid_grant", "Vérification PKCE échouée (code_verifier incorrect).");
    }

    const scopes = authCode.scopes.split(/\s+/).filter(Boolean);
    const pair = await createTokenPair(client.clientId, scopes);
    return tokenResponse(pair);
  }

  // -------------------------------------------------------------------------
  if (grantType === "refresh_token") {
    const refreshToken = get("refresh_token");
    if (!refreshToken) {
      return oauthError("invalid_request", "Paramètre refresh_token obligatoire.");
    }
    const result = await consumeRefreshToken(refreshToken);
    if (!result) {
      return oauthError("invalid_grant", "Jeton de rafraîchissement invalide, expiré ou révoqué.");
    }
    if (clientId && result.clientId && clientId !== result.clientId) {
      return oauthError("invalid_grant", "Ce jeton n'appartient pas à ce client.");
    }
    return tokenResponse(result);
  }

  return oauthError(
    "unsupported_grant_type",
    "grant_type doit valoir authorization_code ou refresh_token."
  );
}
