# MCP tools

Tools exposed by the `one-shop-manager` MCP server, version 0.4.55. Source of truth: `tools/list` on the server.

- **Read**: returns data from the local copy of the store (a few tools read the store directly, as noted). Nothing is modified.
- **Propose**: computes the change and files it as a proposal in the AI log of the application. **It writes nothing to the store.** The user opens the before/after preview and clicks Apply; applied changes can be undone from the journal, except created orders.
- **Local**: saves a table in the application on this computer, immediately. Nothing is sent to the store.

Every `propose_*` tool takes a `reason` argument: why the change is suggested, shown to the user next to the proposal.

In **read-only** mode, the server hides every Propose tool, `save_table` and `list_proposals`.

## Store

| Tool | What it does | Type |
| --- | --- | --- |
| `shop_info` | Store open in the application: name, URL, number of cached products, last sync | Read |
| `list_languages` | Store languages (id, ISO code, name), used for texts | Read |

## Catalog

| Tool | What it does | Type |
| --- | --- | --- |
| `search_products` | Search products: quick checks (out of stock, below cost, no EAN, no image…), advanced filters, sorting, pagination. Returns price excl./incl. tax, cost price, margin, stock, EAN, active | Read |
| `get_product` | Product details, categories and change history | Read |
| `get_product_texts` | Product texts per language: name, short description, meta title and description, friendly URL | Read |
| `list_categories` | Category tree: id, parent, name, depth, active, position, number of products | Read |
| `get_category_texts` | Category texts per language: description, meta tags, friendly URL | Read |
| `list_attributes` | Combination attributes (size, color…) and their values, with usage count | Read |
| `list_combinations` | Product combinations, read from the store: label, reference, EAN, price impact, final price, stock, default | Read |

## Customers

| Tool | What it does | Type |
| --- | --- | --- |
| `search_customers` | Search active customers by name, email or company (20 results at most) | Read |
| `get_customer` | Customer details, read from the store: groups, addresses, orders, total spent, note | Read |

## Orders

| Tool | What it does | Type |
| --- | --- | --- |
| `list_orders` | Orders, most recent first, filtered by status, dates or search; returns the list of order statuses and carriers | Read |
| `get_order` | Order details: customer, status, carrier, payment, country, totals, lines with cost price at the time of sale, gross margin | Read |

## Analysis

| Tool | What it does | Type |
| --- | --- | --- |
| `sales_report` | Sales for a period (paid, not cancelled orders): revenue, orders and customers, by day, payment method, country, carrier and status, top customers, gross margin | Read |
| `product_sales` | Best sellers over the last N days, or active products that did not sell, sorted by stock value tied up | Read |
| `stock_report` | Stock valuation at cost and at selling price, units, out-of-stock items, products without cost price, by default category | Read |
| `restock` | Products and combinations to reorder, from sales of the last N days and current stock | Read |
| `seo_report` | SEO audit: score 0–100, issues by severity and type, affected pages | Read |
| `list_tables` | Tables saved in My tables | Read |
| `run_table` | Computes a saved table on local data, with pagination | Read |
| `table_format` | Format of a table definition, read before `save_table` | Read |
| `save_table` | Creates or replaces a table in My tables on this computer. Nothing is sent to the store | Local |

## Accounting

| Tool | What it does | Type |
| --- | --- | --- |
| `accounting_summary` | Period summary with the chart of accounts set in the application: journal totals and balance, VAT by country and rate, items to check | Read |
| `accounting_documents` | Invoices or credit slips of a period, with the reasons to check each document | Read |
| `accounting_order` | Accounting for one order: sales and payment entries, anomalies (unbalanced, VAT, country), invoices and credit slips | Read |

## Journal

| Tool | What it does | Type |
| --- | --- | --- |
| `list_journal` | Latest operations executed on the store | Read |
| `list_proposals` | Recent proposals and their status: pending, validated, rejected (with the user's note), expired after 7 days | Read |
| `propose_undo` | Undo an operation from the journal | Propose |

## Product proposals

| Tool | What it does | Type |
| --- | --- | --- |
| `propose_cell_edits` | Exact values product by product: price excl./incl. tax, cost price, stock, EAN, reference, active, name | Propose |
| `propose_price_change` | Price change on several products: percentage, amount or fixed price, rounding, minimum margin; warns below cost, blocks zero prices | Propose |
| `propose_field_change` | Enable or disable, set or adjust stock, or set a field value on several products | Propose |
| `propose_texts` | Texts on several products, per language: template with variables, or search and replace | Propose |
| `propose_product_create` | New product, created disabled: texts per language, photos from URLs, categories, brand, combinations | Propose |
| `propose_product_duplicate` | Duplicate products like the back office does: copies disabled, stock at 0 | Propose |

## Category proposals

| Tool | What it does | Type |
| --- | --- | --- |
| `propose_category_edit` | Create, rename, enable or disable, move, or delete an empty category | Propose |
| `propose_category_texts` | Category texts per language; only changed fields are sent | Propose |

## Combination proposals

| Tool | What it does | Type |
| --- | --- | --- |
| `propose_attribute_group` | New attribute (Material, Shoe size…), color or not | Propose |
| `propose_attribute_values` | New values for an attribute; existing values are skipped | Propose |
| `propose_combinations_create` | Add combinations to an existing product | Propose |
| `propose_combination_stock` | Set or adjust stock for all or some combinations of one or more products | Propose |
| `propose_combination_edits` | Exact values combination by combination: stock, references, EAN, price impact, cost price, weight | Propose |

## Order proposals

| Tool | What it does | Type |
| --- | --- | --- |
| `propose_order_state` | Change the status of orders, with or without the status email to the customer | Propose |
| `propose_order_tracking` | Tracking numbers, one line per order, optionally with a shipped status | Propose |
| `propose_order_create` | New order for an existing customer; PrestaShop builds the cart and computes prices, discounts, shipping and taxes. A created order cannot be undone from the journal | Propose |

## Not available to the AI yet

Creating or editing customers; promotions, vouchers and specific prices; photos of an existing product; suppliers, SEO redirects and image captions. These are done in the application.
