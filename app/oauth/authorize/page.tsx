// Page d'autorisation OAuth 2.1 du connecteur MCP.
// Le client (ChatGPT, Claude…) redirige l'utilisateur ici ; la page affiche
// qui demande l'accès et les permissions demandées, puis un seul champ :
// le code personnel du propriétaire du site. Le formulaire est posté vers
// /api/oauth/authorize qui émet le code d'autorisation.

import { prisma } from "@/lib/prisma";
import { isMcpConfigured, MCP_SCOPES, parseScopes } from "@/lib/mcp/config";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Autoriser l'accès au site — Moriartii Consulting",
};

const SCOPE_LABELS: Record<string, string> = {
  "content:read":
    "Lire les contenus du site (articles, FAQ, services, équipe, témoignages, coordonnées)",
  "content:write":
    "Créer, modifier et supprimer des contenus du site (articles, FAQ, services, équipe, témoignages, coordonnées)",
};

type SearchParams = Record<string, string | string[] | undefined>;

function param(searchParams: SearchParams, name: string): string {
  const v = searchParams[name];
  return typeof v === "string" ? v : "";
}

export default async function AuthorizePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const card = (children: React.ReactNode) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 m-10">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );

  if (!isMcpConfigured()) {
    return card(
      <>
        <h1 className="text-2xl font-bold text-center mb-4">Accès non disponible</h1>
        <p className="text-center">
          Le connecteur MCP n&apos;est pas configuré sur ce site. Contactez
          l&apos;administrateur.
        </p>
      </>
    );
  }

  const clientId = param(searchParams, "client_id");
  const redirectUri = param(searchParams, "redirect_uri");
  const responseType = param(searchParams, "response_type") || "code";
  const scopeParam = param(searchParams, "scope");
  const state = param(searchParams, "state");
  const codeChallenge = param(searchParams, "code_challenge");
  const codeChallengeMethod =
    param(searchParams, "code_challenge_method") || "S256";
  const error = param(searchParams, "error");

  const client = clientId
    ? await prisma.mcpClient.findUnique({ where: { clientId } })
    : null;

  const paramsValid =
    client !== null &&
    redirectUri !== "" &&
    client.redirectUris.includes(redirectUri) &&
    codeChallenge !== "";

  if (!paramsValid) {
    return card(
      <>
        <h1 className="text-2xl font-bold text-center mb-4">Demande invalide</h1>
        <p className="text-center">
          Cette demande d&apos;autorisation est incomplète ou provient d&apos;un
          client inconnu. Relancez la connexion depuis votre application
          (ChatGPT, Claude…).
        </p>
      </>
    );
  }

  const scopes =
    parseScopes(scopeParam).length > 0 ? parseScopes(scopeParam) : [...MCP_SCOPES];
  const clientName = client.name || client.clientId;

  return card(
    <>
      <h1 className="text-2xl font-bold text-center mb-2">
        Autoriser l&apos;accès au site
      </h1>
      <p className="text-center mb-4">
        <strong>{clientName}</strong> demande l&apos;accès au site Moriartii
        Consulting pour :
      </p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        {scopes.map((s) => (
          <li key={s}>{SCOPE_LABELS[s] ?? s}</li>
        ))}
      </ul>

      {error === "code_invalide" && (
        <div className="alert alert-error mb-4">
          <span>Code personnel incorrect. Vérifiez le code et réessayez.</span>
        </div>
      )}

      <form method="POST" action="/api/oauth/authorize">
        <input type="hidden" name="response_type" value={responseType} />
        <input type="hidden" name="client_id" value={clientId} />
        <input type="hidden" name="redirect_uri" value={redirectUri} />
        <input type="hidden" name="scope" value={scopeParam} />
        <input type="hidden" name="state" value={state} />
        <input type="hidden" name="code_challenge" value={codeChallenge} />
        <input
          type="hidden"
          name="code_challenge_method"
          value={codeChallengeMethod}
        />
        <div className="form-control mb-4">
          <label className="label" htmlFor="owner_code">
            <span className="label-text">Votre code personnel</span>
          </label>
          <input
            id="owner_code"
            name="owner_code"
            type="password"
            required
            autoComplete="off"
            className="input input-bordered w-full"
            placeholder="Code personnel du propriétaire du site"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Autoriser l&apos;accès
        </button>
      </form>
      <p className="text-sm text-center mt-4 opacity-70">
        Ne saisissez ce code que si c&apos;est bien vous qui avez lancé la
        connexion depuis ChatGPT ou Claude.
      </p>
    </>
  );
}
