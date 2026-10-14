# Changelog

Changes to the MCP server of One Shop Manager. The server version is the application version. The full list of tools is in [docs/tools.md](docs/tools.md).

## Unreleased

- ChatGPT desktop app and Codex: **Connect ChatGPT and Codex** button in the application. It installs a local plugin for the ChatGPT desktop app and the server entry in `~/.codex/config.toml`, with the access key.
- `get_product`, `get_product_texts`: the product can be given by its reference, EAN or name instead of its id (several matches: the list of candidates is returned).
- `search_products`: sort by last update (`dateUpd`); the description says that sorting by `id` descending gives the latest added products.

## 0.4.56 — 2026-10-14

- Claude Desktop extension `prestashop-mcp.mcpb` 1.0.0, in the [Releases](https://github.com/oneshopmanager/prestashop-mcp/releases): a relay from Claude to the One Shop Manager already installed on the computer. It does not contain the software.
- New tools: `search_customers`, `get_customer` (read) and `propose_order_create` (proposal: a new order for an existing customer; a created order cannot be undone from the journal).

## 0.4.55 — 2026-10-14

First public documentation of the MCP server.

- 41 tools: 24 read tools, 16 proposal tools and `save_table`. Read-only mode hides the proposal tools, `save_table` and `list_proposals`.
- Transports: Streamable HTTP on `127.0.0.1` with a bearer access key, and stdio through the application executable.
- Clients: Claude Desktop (one-click setup), Claude Code, Codex, Cursor and any MCP client.
