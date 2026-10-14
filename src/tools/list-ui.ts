import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const LIST_UI_TOOL_NAME = "list-ui";
const LIST_UI_TOOL_DESCRIPTION = `
Use this tool when the user wants to see which components buouui.com offers, or mentions /buou list.
This tool ONLY returns component names, it does not return or generate code. Use fetch-ui with one of the names to get the code.
After calling this tool, you need to show the names to the user, and finally point them to the website page of buouui.com for previews.
`;

interface ListUiResponse {
  components?: string[];
  total?: number;
  error?: string;
}

function formatResponse(data: ListUiResponse) {
  if (data.error) {
    return data.error;
  }

  if (!Array.isArray(data.components)) {
    return JSON.stringify(data);
  }

  const { components, total = components.length } = data;
  const heading =
    components.length < total
      ? `${components.length} of ${total} components match`
      : `${total} components`;

  return `${heading}:\n${components.join(", ")}`;
}

export class ListUiTool extends BaseTool {
  name = LIST_UI_TOOL_NAME;
  description = LIST_UI_TOOL_DESCRIPTION;

  schema = z.object({
    searchQuery: z
      .string()
      .optional()
      .describe(
        "Optional keyword to narrow the list, e.g. 'card' or 'pricing'. Leave it out to list every component"
      ),
  });

  async execute({ searchQuery }: z.infer<typeof this.schema>) {
    const { data } = await twentyFirstClient.post<ListUiResponse>(
      "/api/list",
      {
        searchQuery,
      }
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatResponse(data),
        },
      ],
    };
  }
}
