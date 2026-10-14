# Security and data flow

## Access

- **AI access is disabled by default.** It is enabled in **Settings › AI settings**, card **AI access (MCP)**; **Test access** checks that Claude reaches One Shop Manager.
- **Local MCP connection.** The server listens on `127.0.0.1` only, on this computer, and every request needs the access key. **New token** revokes the current key.
- **Credentials out of reach.** The store keys and passwords stay in the system keychain; the AI has no access to them.
- **Read-only mode** hides every proposal tool from the AI.
- The server does not answer while the application is locked or in point-of-sale mode.

## Changes

- **Nothing is applied without your approval.** The AI never writes to the store itself: `propose_*` tools file proposals in **AI assistant › AI log**.
- Each proposal opens in the usual preview: before/after line by line, with warnings (negative price, duplicate EAN, change over 50%). You apply, adjust or reject it. Unprocessed proposals expire after 7 days.
- **Everything can be undone** from the journal, like an operation done by hand. Exception: an order created by the AI cannot be undone from the journal.

## Your data

The assistant sends only what is needed for the question asked, not the whole store.

- **With your own Claude (MCP)**: the data goes directly to Anthropic, under its terms.
- **With the built-in assistant and One Shop Manager AI credits**: the question and the data needed for the answer go through the One Shop Manager server, which counts the credits, then to the AI provider.
- **With your own API key in the built-in assistant**: the data goes directly to your AI provider.

Outside the assistant, the catalog, orders and customers go through no third-party server: One Shop Manager talks directly to the store.

## Reporting a vulnerability

Write to contact@oneshopmanager.com.
