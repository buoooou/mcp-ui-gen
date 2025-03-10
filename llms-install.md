# SupaUI MCP Server Installation Guide for LLMs

This guide provides detailed instructions for AI agents to install and configure the SupaUI MCP server.

## Prerequisites

1. Node.js (Latest LTS version)
2. A valid BUOU_API_KEY from [buouui.com](https://buouui.com/dashboard/key)

## Installation Steps

### 1. Configuration Setup

The SupaUI MCP server requires configuration based on the client type. Below are the setup instructions for each supported client:

#### For Cursor

1. Create or modify the configuration file at `~/.cursor/mcp_config.json`:

```json
{
  "mcpServers": {
    "supaui": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "install",
        "@buouui/supaui-mcp",
        "--client",
        "cursor"
      ],
      "env": {
        "BUOU_API_KEY": "<API_KEY>"
      }
    }
  }
}
```

2. Replace `<API_KEY>` with your actual BUOU_API_KEY.

#### For Other LLM Clients

1. Create or modify the MCP configuration file:

```json
{
  "mcpServers": {
    "@buouui/supaui-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@buouui/supaui-mcp",
        "--config",
        "\"{\\\"BUOU_API_KEY\\\":\\\"<API_KEY>\\\"}\""
      ]
    }
  }
}
```

2. Replace `<API_KEY>` with your actual BUOU_API_KEY.

### 2. Verification

To verify the installation:

1. The MCP server should appear in the list of available servers
2. Test the connection by sending a simple command:
   ```
   /ui create a basic button
   ```

## Troubleshooting

Common issues and solutions:

1. Server Start Issues:
   - Verify API key validity
   - Check Node.js version (should be LTS)
   - Ensure all dependencies are installed

2. Component Generation Issues:
   - Check network connectivity
   - Verify API key permissions
   - Ensure correct command format

## Environment Variables

Required environment variables:

- `BUOU_API_KEY`: Your SupaUI API key from buouui.com

## Additional Notes

- The server supports TypeScript and React components out of the box
- No additional configuration needed for basic usage
- Supports hot reloading for development

## Support

If you encounter any issues:

1. Visit [buouui.com/docs](https://buouui.com/docs)
2. Join our community on [Discord](https://discord.gg/nNbB7CpSue)
3. Email support at support@buouui.com

---

This installation guide is maintained by the SupaUI team. For updates and more information, visit [buouui.com](https://buouui.com).
