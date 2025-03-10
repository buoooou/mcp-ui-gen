import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { CreateUiTool } from "./tools/create-ui";
import { FetchUiTool } from "./tools/fetch-ui";
import { ListUiTool } from "./tools/list-ui";
const server = new McpServer({
  name: "supaui-mcp",
  version: "0.0.1",
});

// Register tools
new CreateUiTool().register(server);
new FetchUiTool().register(server);
new ListUiTool().register(server);
const transport = new StdioServerTransport();

server.connect(transport);

console.log("SupaUI MCP Server running");