import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { CreateUiTool } from "./tools/create-ui";
import { FetchUiTool } from "./tools/fetch-ui";

const server = new McpServer({
  name: "supa-buou",
  version: "0.0.1",
});

// Register tools
new CreateUiTool().register(server);
new FetchUiTool().register(server);

const transport = new StdioServerTransport();

server.connect(transport);
