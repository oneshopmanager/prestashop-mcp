# Other MCP clients

Any MCP client that runs on the same computer can connect, in one of two ways.

## Streamable HTTP

- URL: `http://127.0.0.1:47715/mcp` (the port can be changed in the application)
- Header: `Authorization: Bearer <ACCESS_KEY>`

## stdio

Command: the One Shop Manager executable, with the arguments `--mcp <ACCESS_KEY>` (and the port as a third argument if you changed it). This is the setup used for Claude Desktop.

The address, the access key and the executable path are shown in **Settings › AI settings**, card **AI access (MCP)**.

## ChatGPT desktop app and Codex

ChatGPT in the browser cannot reach a server on your computer. The ChatGPT desktop app (Mac, Windows) and Codex (app, editor extension or terminal) can.

In One Shop Manager, choose **ChatGPT (Codex)** and click **Connect ChatGPT and Codex**. The button keeps the rest of each file and writes:

- a local plugin in `~/.agents/plugins/one-shop-manager`, listed in the personal marketplace `~/.agents/plugins/marketplace.json`, for the ChatGPT desktop app;
- the `one-shop-manager` server in `~/.codex/config.toml` (`$CODEX_HOME` if set), for Codex.

Then:

- **ChatGPT desktop app**: quit and reopen it, open **Plugins**, choose the « Plugins locaux » marketplace and install **One Shop Manager** (once).
- **Codex**: restart it.

Manual method for Codex: add this block, shown by the application, at the end of `~/.codex/config.toml`:

```toml
[mcp_servers.one-shop-manager]
command = "<path to the One Shop Manager executable>"
args = ["--mcp", "<ACCESS_KEY>"]
```

In Codex, type `/mcp`: `one-shop-manager` is listed.

## Notes

- The application must stay open on the store you want the AI to work on.
- **New token** in the application disconnects every client already connected: connect them again afterwards.
- **Test access** checks that a client can reach the server and produces a diagnostic report for support.
