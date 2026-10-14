// Builds dist/prestashop-mcp.mcpb and updates server.json (address, SHA-256).
// The manifest's tool list is taken from docs/tools.md at build time. Usage: node build-mcpb.mjs
import { readFileSync, writeFileSync, rmSync, cpSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

rmSync("dist", { recursive: true, force: true });
cpSync("mcpb", "dist/bundle", { recursive: true });
const manifest = JSON.parse(readFileSync("mcpb/manifest.json", "utf8"));
manifest.tools = [...readFileSync("docs/tools.md", "utf8").matchAll(/^\| `([a-z_]+)` \| (.+?) \| (?:Read|Propose|Local) \|$/gm)]
  .map(([, name, description]) => ({ name, description: description.replaceAll("`", "") }));
writeFileSync("dist/bundle/manifest.json", JSON.stringify(manifest, null, 2) + "\n");

const file = "dist/prestashop-mcp.mcpb";
execFileSync("npx", ["-y", "@anthropic-ai/mcpb@2.1.2", "pack", "dist/bundle", file], { stdio: "inherit" });

const server = JSON.parse(readFileSync("server.json", "utf8"));
server.version = manifest.version;
const pkg = server.packages[0];
pkg.identifier = `https://github.com/oneshopmanager/prestashop-mcp/releases/download/v${manifest.version}/prestashop-mcp.mcpb`;
pkg.fileSha256 = createHash("sha256").update(readFileSync(file)).digest("hex");
writeFileSync("server.json", JSON.stringify(server, null, 2) + "\n");
console.log(`${file}: ${manifest.tools.length} tools, sha256 ${pkg.fileSha256}`);
