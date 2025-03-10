# UI 组件生成 MCP 服务

[![smithery badge](https://smithery.ai/badge/@buoooou/supaui-mcp)](https://smithery.ai/server/@buoooou/supaui-mcp)

这是一个基于 MCP (Model Context Protocol) 的服务，用于自动生成 UI 组件。该服务可以与 Claude 和 Windsurf 等 AI 助手集成，提供便捷的 UI 组件生成功能。

## 功能特点

- 支持多种 UI 组件的生成（按钮、输入框、对话框、表格、表单等）
- 与 Claude 和 Windsurf AI 助手无缝集成
- 基于 buouui.com API 进行组件生成
- 支持自定义组件查询和生成

## 安装

### 安装管理工具 Smithery

通过 [Smithery](https://smithery.ai/server/@buoooou/supaui-mcp) 自动将 supaui-mcp 安装到 Claude：

```bash
npx -y @smithery/cli install @buoooou/supaui-mcp --client claude
```

### 手动安装

1. 克隆仓库：
```bash
git clone [your-repository-url]
cd mcp-ui-gen
```

2. 安装依赖：
```bash
pnpm install
```

3. 构建项目：
```bash
pnpm build
```

## 使用方法

1. 启动服务：
```bash
pnpm start
```

2. 在 Claude 或 Windsurf 中使用以下命令触发 UI 组件生成：
- `/ui [组件描述]`
- `/21 [组件描述]`
- `/21st [组件描述]`

例如：
```
/ui 创建一个带有确认和取消按钮的对话框
```

## 项目结构

```
src/
├── tools/
│   ├── create-ui.ts    # UI 组件生成工具
│   ├── logo-search.ts  # Logo 搜索工具
│   └── fetch-ui.ts     # UI 组件获取工具
├── utils/
│   ├── base-tool.ts    # 基础工具类
│   └── http-client.ts  # HTTP 客户端配置
└── index.ts           # 主入口文件
```

## API 说明

### 组件生成 API

- 端点：`https://buouui.com/api/mcp`
- 方法：`POST`
- 请求体：
  ```typescript
  {
    message: string;    // 用户完整消息
    searchQuery: string // 组件搜索查询（2-4个关键词）
  }
  ```
- 响应：
  ```typescript
  {
    text: string  // 生成的组件代码
  }
  ```

## 开发指南

### 添加新工具

1. 在 `src/tools` 目录下创建新的工具类
2. 继承 `BaseTool` 类
3. 实现必要的抽象方法和属性
4. 在 `src/index.ts` 中注册新工具

示例：
```typescript
export class NewTool extends BaseTool {
  name = "tool-name";
  description = "Tool description";
  
  schema = z.object({
    // 定义参数架构
  });

  async execute(args: z.infer<typeof this.schema>) {
    // 实现工具逻辑
  }
}
```

### 错误处理

服务使用标准的错误处理机制：

```typescript
try {
  // 业务逻辑
} catch (error) {
  return {
    content: [{
      type: "text" as const,
      text: "Error: [错误描述]"
    }]
  };
}
```

## 故障排除

1. 组件生成失败
   - 检查网络连接
   - 确认 API 端点可访问
   - 查看服务器日志

2. 集成问题
   - 确保 Claude/Windsurf 正确配置了 MCP 工具
   - 验证工具响应格式是否符合要求

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

ISC License

## 联系方式

- 邮箱：support@buouui.com
- 网站：https://buouui.com
