# SupaUI MCP Server

A Model Context Protocol (MCP) server for SupaUI that enables AI agents to generate, fetch, and manage UI components through natural language interactions.

## Features

- **Create UI Components**: Generate React components based on natural language descriptions
- **Fetch UI Components**: Search and retrieve components from buouui.com
- **List UI Components**: Browse available components with detailed previews
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
=======
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

1. Create UI Component:
```
/ui create a basic button
```

2. Fetch UI Component:
```
/ui fetch modern login form
```

3. List UI Components:
```
/buou list cards
```

## API Tools

### CreateUiTool
- Generates new UI components based on natural language descriptions
- Endpoint: `/api/create`

### FetchUiTool
- Retrieves existing components from buouui.com
- Endpoint: `/api/fetch`

### ListUiTool
- Lists available components with previews
- Endpoint: `/api/list`

## Development

```bash
# Build in watch mode
tsc -w

# Run tests
pnpm test
```

## Environment Variables

- `BUOU_API_KEY`: Your API key from buouui.com (Required)

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
