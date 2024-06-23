
---

# Util 方法文档

## 导入依赖
- 导入 `Cookies` 从 `js-cookie`。
- 导入 `CacheKey` 从项目常量文件。

## Token 管理
- `getToken`: 获取存储在 Cookie 中的 Token。
- `removeToken`: 从 Cookie 中移除 Token。
- `setToken`: 在 Cookie 中设置 Token。

## Refresh Token 管理
- `getReFlushToken`: 获取存储在 Cookie 中的 Refresh Token。
- `removeReFlushToken`: 从 Cookie 中移除 Refresh Token。
- `setReFlushToken`: 在 Cookie 中设置 Refresh Token。

## 权限管理
- `removePermission`: 从 Cookie 中移除权限信息。

## 表单验证规则
- `passwordRules`: 验证密码强度，必须包含大小写字母、数字和特殊字符，长度在8-20之间。
- `emailRules`: 验证邮箱格式。
- `phoneRules`: 验证手机号码格式。

---

## HTTP 请求服务

### Axios 实例创建
- `createService`: 创建并配置 Axios 实例，包括响应拦截器。

### 请求拦截器逻辑
- 对响应状态码进行判断：
    - `401`: 处理未授权情况，可能刷新 Token 并重试请求。
    - 其他错误状态码：执行登出操作并重定向到登录页。

### 请求配置
- `createRequest`: 创建请求方法，配置请求头等信息。

### Axios 实例常量
- `service`: 导出 Axios 实例。

### 请求方法
- `request`: 导出可用的请求方法，配置请求参数并发送请求。

## 文件处理
- `toBase64String`: 将文件转换为 Base64 字符串。

---

