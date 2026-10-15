# Changelog

Changes to the MCP server of One Shop Manager. The server version is the application version. The full list of tools is in [docs/tools.md](docs/tools.md).

## Unreleased

- Pagination on every list tool: `search_customers`, `product_sales`, `restock`, `seo_report`, `accounting_documents`, `list_journal` and `list_proposals` take `offset` and return `total` and `nextOffset` (absent on the last page), like `list_orders`, `search_products` and `run_table`. `search_customers` is no longer capped at 20 results; `list_journal` and `list_proposals` now return an object (`operations`, `proposals`).
- AI journal: a pending proposal shows all its changes (500 at a time, "Show the next"), no longer only the first 500, so each one can be checked or left out.

## 0.4.66 — 2026-10-15

- New tool `propose_product_delete` (proposal): permanent deletion of products, by ids or exact references (module 0.44.0). Irreversible: the AI journal shows a red warning, asks the user to type a confirmation word, and never sends a deletion with "Validate all". A reference that is not found or shared by several products blocks the whole proposal.
- `propose_texts`: the long description (`description`, HTML) can now be changed, besides the short one. One product with a plain text (no variable) sets that exact text, for a description written for that product.

## 0.4.64 — 2026-10-15

- New tool `mcp_suggest`: when a request is not possible with the tools, the AI reports it to the publisher (generic description, sent with the anonymous usage statistics if they are on), to add it in a next version.

## 0.4.63 — 2026-10-14

- New tool `propose_attribute_edit` (proposal): rename, reorder, move or merge attribute values, rename or reorder attributes, delete unused values or attributes.
- New tools `list_features` (read) and `propose_feature_edit` (proposal): product features and their values; rename, merge, reorder, delete, turn custom texts into a predefined value, assign to products.
- New tools `list_promotions` (read), `propose_promotion` and `propose_campaign_edit` (proposals): promotion campaigns with specific prices; create, remove, change dates, duplicate.

## 0.4.62 — 2026-10-14

- New tools `get_accounting_plan` (read) and `set_accounting_plan` (local write): read and change the chart of accounts and the account labels of the application, in the CSV format of the plan export. Hidden in read-only mode.

## 0.4.61 — 2026-10-14

- New tool `propose_product_categories` (proposal): add products to categories, remove them, or move them (replace), and change their default category.
- `propose_cell_edits`: new `position` column, with an optional `category`, to change the order of products in a category (same as drag and drop in the grid). `search_products` with `category` and `sort: position` returns the current order.

## 0.4.60 — 2026-10-14

- `search_customers`: each result also gives the company, order count, total spent and last order date; an empty search returns the 6 latest buyers.

## 0.4.58 — 2026-10-14

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
