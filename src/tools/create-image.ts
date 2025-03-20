import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const UI_TOOL_NAME = "create-image";
const UI_TOOL_DESCRIPTION = `
"Use this tool when the user requests a new image, mentions /buou /image or asks for a image.
This tool ONLY returns the base64 text for that image. 
After calling this tool, please convert the generated Base64 image data into an HTML snippet that displays the image using an <img> tag, and include a download link for users to download the image.
`;

interface CreateUiResponse {
  text: string;
}

export class CreateImageTool extends BaseTool {
  name = UI_TOOL_NAME;
  description = UI_TOOL_DESCRIPTION;

  schema = z.object({
    message: z
      .string()
      .describe(
        "Generate a prompt to generate a direct picture according to the customer's description,and the prompt should be concise and clear, without second communication with the customer."
      ),
    image: z
      .string()
      .describe(
        "If customer upload image, please provide the base64 text of the image"
      ),
  });

  async execute({ message, image }: z.infer<typeof this.schema>) {
    try {
      const { data } = await twentyFirstClient.post<CreateUiResponse>(
        "/api/image",
        {
          message,
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
