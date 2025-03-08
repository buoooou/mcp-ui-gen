import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const UI_TOOL_NAME = "component";
const UI_TOOL_DESCRIPTION = `
"Use this tool when the user requests a new UI component—e.g., mentions /ui, /21 /21st, or asks for a button, input, dialog, table, form, banner, card, or other React component.
This tool ONLY returns the text snippet for that UI component. 
After calling this tool, you must edit or add files to integrate the snippet into the codebase."
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
        "Generate a search query for 21st.dev (library for searching UI components) to find a UI component that matches the user's message. Must be a two-four words max or phrase"
      ),
  });

  async execute({ message, searchQuery }: z.infer<typeof this.schema>) {
    try {
      console.log("Sending request to API with:", { message, searchQuery });

      const { data } = await twentyFirstClient.post<CreateUiResponse>(
        "/api/mcp",
        {
          message,
          searchQuery,
        }
      );

      console.log("Received API response:", data);

      // 确保响应中包含文本
      if (!data || !data.text) {
        return {
          content: [
            {
              type: "text" as const,
              text: "No component data received from the API",
            },
          ],
        };
      }

      // 返回符合基类要求的响应格式
      return {
        content: [
          {
            type: "text" as const,
            text: data.text,
          },
        ],
      };
    } catch (error) {
      console.error("Error executing tool:", error);

      // 返回错误信息
      return {
        content: [
          {
            type: "text" as const,
            text: "Error: Failed to generate UI component. Please try again.",
          },
        ],
      };
    }
  }
}
