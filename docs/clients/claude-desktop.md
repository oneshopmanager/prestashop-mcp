# Claude Desktop

One button in the application writes the configuration for you.

## Connect

1. Install Claude Desktop ([claude.ai/download](https://claude.ai/download)) and open it once.
2. Quit Claude Desktop completely: on macOS ⌘Q; on Windows, right-click the icon near the clock › Quit. Closing the window is not enough.
3. In One Shop Manager: **Settings › AI settings**, card **AI access (MCP)**, check **Enable AI access**, choose **Claude Desktop**, then click **Connect Claude Desktop**.
4. Reopen Claude Desktop.

## Check

In a new conversation, click **+** › **Connectors**: `one-shop-manager` is listed and enabled. Then ask: "How many active products does my store have?"

The application shows a warning if Claude Desktop is connected with an old access key or another location of the application: quit Claude, click **Connect Claude Desktop** again, then reopen Claude.

## Manual setup

If the button fails: in Claude, **Settings › Developer › Edit config**, then open `claude_desktop_config.json`. If the file is empty, paste the block that the application shows under **Manual setup**:

```json
{
  "mcpServers": {
    "one-shop-manager": {
      "command": "<path to the One Shop Manager executable>",
      "args": [
        "--mcp",
        "<ACCESS_KEY>"
      ]
    }
  }
}
```

The application fills in the real path and access key; copy the block from there. If the file already contains other servers, add only the `one-shop-manager` entry inside `mcpServers`: a misplaced comma prevents Claude from starting its tools. Save, quit Claude completely and reopen it.

Claude Desktop starts the One Shop Manager executable as a stdio bridge to the local server. If you changed the port in the application, it is added as a third argument.
