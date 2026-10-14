# Claude Code

One command, once per computer; it applies to all your folders.

## Connect

1. In One Shop Manager: **Settings › AI settings**, card **AI access (MCP)**, check **Enable AI access**, then choose **Claude Code**.
2. Copy the command shown by the application and run it in a terminal (Terminal on macOS, PowerShell on Windows):

```bash
claude mcp add --scope user --transport http one-shop-manager http://127.0.0.1:47715/mcp --header "Authorization: Bearer <ACCESS_KEY>"
```

The application fills in the real access key, and the port if you changed it.

## Check

Run `claude`, then type `/mcp`: `one-shop-manager` is `connected`. Then ask: "How many active products does my store have?"

This works the same in the terminal and in the Claude Code extension for VS Code.
