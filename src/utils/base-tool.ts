import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { isAxiosError } from "axios";
import { z } from "zod";

type ToolResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

function describeError(error: unknown) {
  if (isAxiosError(error) && error.response) {
    const { status, data } = error.response;
    if (status === 401) {
      return "Error: BUOU_API_KEY is invalid. Check the key at https://buouui.com/dashboard/key and update the MCP server configuration. Retrying will not help.";
    }
    const detail = typeof data?.error === "string" ? `: ${data.error}` : "";
    return `Error: buouui.com answered with status ${status}${detail}.`;
  }

  return `Error: ${error instanceof Error ? error.message : "Request failed"}`;
}

export abstract class BaseTool {
  abstract name: string;
  abstract description: string;
  abstract schema: z.ZodObject<any>;

  register(server: McpServer) {
    server.tool(
      this.name,
      this.description,
      this.schema.shape,
      async (args: Record<string, unknown>): Promise<ToolResult> => {
        try {
          return await this.execute(args);
        } catch (error) {
          console.error(`Error executing ${this.name}:`, error);

          return {
            content: [{ type: "text", text: describeError(error) }],
            isError: true,
          };
        }
      }
    );
  }

  abstract execute(args: z.infer<typeof this.schema>): Promise<ToolResult>;
}
