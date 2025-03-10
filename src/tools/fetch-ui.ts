import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const FETCH_UI_TOOL_NAME = "fetch-ui";
const FETCH_UI_TOOL_DESCRIPTION = `
"Use this tool when the user wants to see component, get inspiration, or /ui fetch data and previews from buouui.com. 
This tool ONLY returns the text snippet for that UI component. 
After calling this tool, you must edit or add files to integrate the snippet into the codebase."
`;

interface FetchUiResponse {
  text: string;
}

export class FetchUiTool extends BaseTool {
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
        "/api/fetch",
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
