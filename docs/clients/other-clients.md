# Other MCP clients

Any MCP client that runs on the same computer can connect, in one of two ways.

## Streamable HTTP

- URL: `http://127.0.0.1:47715/mcp` (the port can be changed in the application)
- Header: `Authorization: Bearer <ACCESS_KEY>`

## stdio

Command: the One Shop Manager executable, with the arguments `--mcp <ACCESS_KEY>` (and the port as a third argument if you changed it). This is the setup used for Claude Desktop.

The address, the access key and the executable path are shown in **Settings › AI settings**, card **AI access (MCP)**.

## Codex (ChatGPT)

ChatGPT in the browser cannot reach a server on your computer: use Codex (app, editor extension or terminal). In One Shop Manager, choose **ChatGPT (Codex)**, click **Connect Codex**, then restart Codex. The button adds (or replaces) the `one-shop-manager` server in `~/.codex/config.toml` (Windows: `%USERPROFILE%\.codex\config.toml`; `$CODEX_HOME` if set) and keeps the rest of the file.

Manual method: add this block, shown by the application, at the end of the same file:

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
