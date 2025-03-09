import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const FETCH_UI_TOOL_NAME = "list-ui";
const FETCH_UI_TOOL_DESCRIPTION = `
"Use this tool when the user wants to see buouui.com component, or /buou fetch data and previews from buouui.com. 
This tool returns the JSON data of matching components without generating new code. This tool ONLY returns the text snippet for that UI component. 
After calling this tool, you need to display the data in the UI, and finally you need to show the website page of the buouui.com."
`;

interface FetchUiResponse {
  text: string;
}

export class ListUiTool extends BaseTool {
  name = FETCH_UI_TOOL_NAME;
  description = FETCH_UI_TOOL_DESCRIPTION;

  schema = z.object({
    message: z.string().describe("Full users message"),
    searchQuery: z
      .string()
      .describe(
        "Search query for buouui.com(library for searching UI components) to find a UI component that matches the user's message. Must be a two-four words max or phrase"
      ),
  });

  async execute({ message, searchQuery }: z.infer<typeof this.schema>) {
    try {
      const { data } = await twentyFirstClient.post<FetchUiResponse>(
        "/api/list",
        {
          message,
          searchQuery,
        }
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data),
          },
        ],
      };
    } catch (error) {
      console.error("Error executing tool:", error);

      // 返回更详细的错误信息
      return {
        content: [
          {
            type: "text" as const,
            text: `Error: ${
              error instanceof Error
                ? error.message
                : "Failed to generate UI component"
            }. Please try again.`,
          },
        ],
      };
    }
  }
}
