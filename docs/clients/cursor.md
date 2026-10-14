# Cursor

Cursor connects to the local HTTP server with the same address and access key as [Claude Code](claude-code.md).

## Connect

1. In One Shop Manager: **Settings › AI settings**, card **AI access (MCP)**, check **Enable AI access**, then choose **Claude Code** to see the address and the access key.
2. In Cursor, open `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project) and add:

```json
{
  "mcpServers": {
    "one-shop-manager": {
      "url": "http://127.0.0.1:47715/mcp",
      "headers": {
        "Authorization": "Bearer <ACCESS_KEY>"
      }
    }
  }
}
```

Replace `<ACCESS_KEY>` with the key shown in the application, and the port if you changed it.

## Check

In Cursor's MCP settings, `one-shop-manager` is enabled and lists its tools. Then ask in the chat: "How many active products does my store have?"
