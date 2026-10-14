import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const UI_TOOL_NAME = "create-image";
const UI_TOOL_DESCRIPTION = `
"Use this tool when the user requests a new image, mentions /buou /image or asks for a image.
If the customer provides the picture editing operation of the attachment, please send it to the corresponding tool.
This tool ONLY returns the url of the image.
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
        "If the customer provides the picture editing operation of the attachment,please send it to the corresponding tool,otherwise, pass an empty string"
      ),
  });

  async execute({ message, image }: z.infer<typeof this.schema>) {
    const { data } = await twentyFirstClient.post<CreateUiResponse>(
      "/api/image",
      {
        message,
        image,
      },
      // Generating an image takes longer than the default timeout.
      { timeout: 120_000 }
    );

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(data),
        },
      ],
    };
  }
}
