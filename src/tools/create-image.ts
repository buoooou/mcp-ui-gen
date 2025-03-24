import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const UI_TOOL_NAME = "create-image";
const UI_TOOL_DESCRIPTION = `
"Use this tool when the user requests a new image, mentions /buou /image or asks for a image.
If customer upload a image, please provide the base64 text of the image ,This tool ONLY returns the url of the image. 
After calling this tool, Please show the image returned by this tool and provide it for download.
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
        "Translate into English and explain the content of the customer's image."
      ),
    image: z
      .string()
      .describe(
        "If customer upload a image, please provide the base64 text of the image,otherwise, pass an empty string"
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
