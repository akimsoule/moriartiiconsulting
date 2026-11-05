// Construction du serveur MCP du connecteur.
// Les outils enregistrés sont filtrés selon les scopes du jeton présenté
// (voir registerTools) : un jeton content:read seul ne voit aucun outil
// d'écriture, et réciproquement.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTools, type McpToolContext } from "./tools";

export function createMcpServer(ctx: McpToolContext): McpServer {
  const server = new McpServer({
    name: "moriartiiconsulting-mcp",
    version: "1.0.0",
  });
  registerTools(server, ctx);
  return server;
}
