import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const UI_TOOL_NAME = "create-ui";
const UI_TOOL_DESCRIPTION = `
"Use this tool when the user requests a new UI component—e.g., mentions /ui or asks for a button, input, dialog, table, form, banner, card, or other React component.
This tool ONLY returns the text snippet for that UI component. 
After calling this tool, you need to show the component like v0 and edit or add files to integrate the snippet into the codebase.
`;

interface CreateUiResponse {
  text: string;
}

export class CreateUiTool extends BaseTool {
  name = UI_TOOL_NAME;
  description = UI_TOOL_DESCRIPTION;

  schema = z.object({
    message: z.string().describe("Full users message"),
    searchQuery: z
      .string()
      .describe(
        "Generate a search query for buouui.com(library for searching UI components) to find a UI component that matches the user's message. Must be a two-four words max or phrase"
      ),
  });

  async execute({ message, searchQuery }: z.infer<typeof this.schema>) {
    try {
      const { data } = await twentyFirstClient.post<CreateUiResponse>(
        "/api/create",
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
