# SupaUI MCP Server

A Model Context Protocol (MCP) server for SupaUI that enables AI agents to fetch and browse UI components from buouui.com and to generate images through natural language interactions.

## Features

- **Fetch UI Components**: Search buouui.com and get a component's source code together with the npm packages and other components it needs
- **List UI Components**: Browse the available components, optionally filtered by keyword
- **Create Images**: Generate or edit an image and get its URL
- **TypeScript Support**: Built with TypeScript for better type safety and developer experience

## Prerequisites

### Smithery

use [Smithery](https://smithery.ai/server/@buoooou/supaui-mcp) to install supaui-mcp in Claude：

```bash
npx -y @smithery/cli install @buoooou/supaui-mcp --client claude
```

### munal 

1. clone repo：
```bash
git clone [your-repository-url]
cd mcp-ui-gen
```

- Node.js (Latest LTS version)
- BUOU_API_KEY from [buouui.com](https://buouui.com/dashboard/key)

## Installation


```bash
# Install dependencies
pnpm install

# Build the project
pnpm build
```

## Configuration

1. Set your BUOU_API_KEY in the environment:
```bash
export BUOU_API_KEY=your_api_key_here
```

2. Or create a configuration file based on smithery.yaml requirements.

## Usage

### Starting the Server

```bash
pnpm start
```

### Available Commands

The server supports the following commands:

1. Fetch UI Component:
```
/ui fetch modern login form
```

2. List UI Components:
```
/buou list cards
```

3. Create Image:
```
/image a minimal logo for a coffee shop
```

## API Tools

### FetchUiTool (`fetch-ui`)
- Input: `searchQuery`
- Returns the best matching component: its files, the npm packages to install, the `@/components/ui` components it imports, and other close matches
- Endpoint: `/api/fetch`

### ListUiTool (`list-ui`)
- Input: `searchQuery` (optional)
- Lists component names, filtered by the keyword when one is given
- Endpoint: `/api/list`

### CreateImageTool (`create-image`)
- Input: `message`, `image`
- Returns the URL of the generated image
- Endpoint: `/api/image`

## Development

```bash
# Build in watch mode
pnpm exec tsc -w
```

## Environment Variables

- `BUOU_API_KEY`: Your API key from buouui.com (Required)
- `BUOU_API_URL`: Base URL of the API, defaults to `https://buouui.com`. Point it to `http://localhost:3000` to develop against a local site

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For support, please visit:
- [buouui.com](https://buouui.com)
- Email: support@buouui.com
