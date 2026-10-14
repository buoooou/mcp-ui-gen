#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { FetchUiTool } from "./tools/fetch-ui";
import { ListUiTool } from "./tools/list-ui";
import { CreateImageTool } from "./tools/create-image";

const { version } = require("../package.json");

const server = new McpServer({
  name: "supaui-mcp",
  version,
});

// Register tools
new FetchUiTool().register(server);
new ListUiTool().register(server);
new CreateImageTool().register(server);

async function main() {
  await server.connect(new StdioServerTransport());
  // stdout carries the MCP protocol, logs have to go to stderr.
  console.error("SupaUI MCP Server running");
}

main().catch((error) => {
  console.error("Failed to start SupaUI MCP Server:", error);
  process.exit(1);
});
