### 配置文档

#### 环境变量配置
**`BASE_URL`**: 服务器基础 URL 地址，例如 `http://localhost:3000/`。
**`TOKEN_KEY`**: 存储在本地存储中的 token 键名，默认为 `'token'`。

#### Vue 组件配置
**数据绑定**:
- 使用 `v-model` 绑定用户输入框 (`userInput`)。
- 通过 `@click` 和 `@keyup.enter` 监听按钮点击事件和回车键事件触发 `send` 方法。

#### 样式配置
**CSS 样式**:
- `#chat-box`: 聊天框容器样式。
- `#messages`: 显示消息区域样式。
- `#user-input`: 用户输入框样式。
- `#send-button`: 发送按钮样式。
