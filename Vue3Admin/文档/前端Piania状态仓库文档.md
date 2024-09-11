
---

# Pinia 状态管理库文档

## 导入依赖
- 从 `pinia` 导入 `defineStore`。
- 从 `vue` 导入 `ref`。
- 从 `vue-router` 导入 `RouteRecordRaw` 类型。
- 从项目路由配置中导入常量路由和动态路由。
- 导入项目的状态管理实例。

## 权限管理仓库 (`useUserPermissionStore`)
- 定义了状态管理仓库，用于管理用户可访问的路由。

### 仓库状态
- `routes`: 用户可访问的路由数组。
- `addRoutes`: 动态添加的路由数组。

### 仓库方法
- `setRoutes`: 根据用户角色设置动态路由。

### 辅助函数
- `hasPermission`: 判断用户角色是否包含在路由的 `meta.roles` 中。
- `filterDynamicRoutes`: 递归遍历路由，根据用户角色过滤出用户有权限访问的路由。

---

## 用户信息仓库 (`userStore`)
- 定义了状态管理仓库，用于管理用户信息。

### 仓库状态
- `roles`: 用户角色数组。
- `token`: 用户认证 Token。
- `username`: 用户名。

### 仓库方法
- `getUserInfo`: 获取用户信息，包括角色和用户名。
- `logout`: 用户登出操作，清除 Token 和角色信息。

### 辅助函数
- `getToken`, `removeReFlushToken`, `removeToken`: 用于操作 Cookie 中的 Token。

### HTTP 请求服务
- `request`: 执行 HTTP 请求的辅助函数。

## 仓库钩子函数
- `usePermissionStoreHook`: 用于获取权限管理仓库实例。
- `useUserStoreHook`: 用于获取用户信息仓库实例。

---
