# Changelog

Changes to the MCP server of One Shop Manager. The server version is the application version. The full list of tools is in [docs/tools.md](docs/tools.md).

## Unreleased

- New tools: `search_customers`, `get_customer` (read) and `propose_order_create` (proposal: a new order for an existing customer; a created order cannot be undone from the journal).

## 0.4.55 — 2026-10-14

First public documentation of the MCP server.

- 41 tools: 24 read tools, 16 proposal tools and `save_table`. Read-only mode hides the proposal tools, `save_table` and `list_proposals`.
- Transports: Streamable HTTP on `127.0.0.1` with a bearer access key, and stdio through the application executable.
- Clients: Claude Desktop (one-click setup), Claude Code, Codex, Cursor and any MCP client.
