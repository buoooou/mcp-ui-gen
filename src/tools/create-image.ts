import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const UI_TOOL_NAME = "create-image";
const UI_TOOL_DESCRIPTION = `
"Use this tool when the user requests a new image, mentions /buou /image or asks for a image.
This tool ONLY returns the base64 text for that image. 
After calling this tool, you need to show the image like v0 and edit or add files to integrate the snippet into the codebase.
`;

interface CreateUiResponse {
  text: string;
}

export class CreateImageTool extends BaseTool {
  name = UI_TOOL_NAME;
  description = UI_TOOL_DESCRIPTION;

  schema = z.object({
    message: z.string().describe("Full users message"),
    searchQuery: z
      .string()
      .describe("Generate a create image query for user's message"),
    image: z.string().describe("The customer upload image base64 text"),
  });

  async execute({ message, searchQuery, image }: z.infer<typeof this.schema>) {
    try {
      const { data } = await twentyFirstClient.post<CreateUiResponse>(
        "/api/image",
        {
          message,
          searchQuery,
          image,
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
                : "Failed to generate Image"
            }. Please try again.`,
          },
        ],
      };
    }
  }
}
