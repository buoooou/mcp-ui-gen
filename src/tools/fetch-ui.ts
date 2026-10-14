import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { twentyFirstClient } from "../utils/http-client";

const FETCH_UI_TOOL_NAME = "fetch-ui";
const FETCH_UI_TOOL_DESCRIPTION = `
Use this tool when the user wants to see component, get inspiration, or /buou or /ui fetch a UI component from buouui.com.
This tool returns the source code of the best matching component, a link to its docs and live preview, the npm packages and other components it needs, and the names of other close matches.
After calling this tool, you must edit or add files to integrate the code into the codebase.
`;

interface ComponentFile {
  path: string;
  content: string;
}

interface FetchUiResponse {
  component?: {
    name: string;
    title?: string;
    description?: string;
    url?: string;
    dependencies?: string[];
    registryDependencies?: string[];
    localImports?: string[];
    files: ComponentFile[];
  } | null;
  alternatives?: string[];
  message?: string;
  error?: string;
  // Shape returned by older versions of the buouui.com API.
  text?: unknown;
}

function formatFile({ path, content }: ComponentFile) {
  const fence = content.includes("```") ? "````" : "```";
  const language = path.split(".").pop();

  return `## ${path}\n\n${fence}${language}\n${content.trimEnd()}\n${fence}`;
}

function formatResponse(data: FetchUiResponse) {
  if (data.error) {
    return data.error;
  }

  if (data.component === null) {
    return `${
      data.message ?? "No matching component."
    } Use list-ui to see the available components.`;
  }

  if (!data.component) {
    return typeof data.text === "string"
      ? data.text
      : JSON.stringify(data.text ?? data);
  }

  const {
    name,
    title,
    description,
    url,
    dependencies = [],
    registryDependencies = [],
    localImports = [],
    files,
  } = data.component;
  const sections = [`# ${name}${title ? ` (${title})` : ""}`];

  if (description) {
    sections.push(description);
  }
  if (url) {
    sections.push(`Docs and live preview: ${url}`);
  }

  if (dependencies.length) {
    sections.push(`npm packages to install: ${dependencies.join(", ")}`);
  }
  if (registryDependencies.length) {
    sections.push(
      `UI components it imports from @/components/ui (fetch the missing ones with this tool): ${registryDependencies.join(
        ", "
      )}`
    );
  }
  if (localImports.length) {
    sections.push(
      `Other project imports that must exist or be adapted: ${localImports.join(
        ", "
      )}`
    );
  }

  sections.push(...files.map(formatFile));

  if (data.alternatives?.length) {
    sections.push(`Other matches: ${data.alternatives.join(", ")}`);
  }

  return sections.join("\n\n");
}

export class FetchUiTool extends BaseTool {
  name = FETCH_UI_TOOL_NAME;
  description = FETCH_UI_TOOL_DESCRIPTION;

  schema = z.object({
    searchQuery: z
      .string()
      .describe(
        "Search query for buouui.com(library for searching UI components) to find a UI component that matches the user's message. Must be a two-four words max or phrase"
      ),
  });

  async execute({ searchQuery }: z.infer<typeof this.schema>) {
    const { data } = await twentyFirstClient.post<FetchUiResponse>(
      "/api/fetch",
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
