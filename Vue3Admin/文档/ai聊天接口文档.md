### 接口文档

#### 1. 获取 Token
**URL**: `/getToken`
**Method**: GET
**Description**: 用户首次访问时获取 token。
**Headers**:
- `Authorization`: Bearer [用户令牌]

**Response**:
- **Status Code**: 200
- **Body**: 
``` JSON
{
  "token": "generated_token"
}
```
#### 2. 发送消息  
**URL**: `/chat`  
**Method**: POST  
**Description**: 用户发送消息到服务器。  
**Headers**:
- `Authorization`: Bearer [用户令牌]
- `Content-Type`: application/json

**Request Body**: 
```JSON
{
  "content": "用户输入的消息"
}
```
**Response**: 
- **Status Code**: 200
- **Body**: 流式返回 AI 的回复，格式为：
```JSON
{
  "id": "响应ID",
  "choices": [
    {
      "delta": {
        "content": "AI 的部分回复"
      }
    }
  ]
}
```


#### 3. 完成会话
**URL**: `/finish`
**Method**: POST
**Description**: 标记当前会话结束。
**Headers**:
- `Authorization`: Bearer [用户令牌]
- `Content-Type`: application/json

**Request Body**: 
```json
{
  "content": "最终的完整回复"
}
```
**Response**: 

- **Status Code**: 200
- **Body**: 
```json
{
  "status": "success"
}
```
### 示例请求和响应

#### 示例 1: 获取 Token
```http request
GET /getToken HTTP/1.1
Host: localhost:3000
Authorization: Bearer user_token
```
**Response** :
```http response
HTTP/1.1 200 OK
Content-Type: application/json
{
  "token": "generated_token"
}

```
#### 示例 2: 发送消息
```http request
POST /chat HTTP/1.1
Host: localhost:3000
Authorization: Bearer user_token
Content-Type: application/json

{
  "content": "你好，世界！"
}
```


**Response**: 
```http response
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "response_id_1",
  "choices": [
    {
      "delta": {
        "content": "你好，很高兴见到你！"
      }
    }
  ]
}

```

#### 示例 3: 完成会话
```http request
POST /finish HTTP/1.1
Host: localhost:3000
Authorization: Bearer user_token
Content-Type: application/json

{
  "content": "完整的回复内容"
}
```
**Response**:
```http response
HTTP/1.1 200 OK
Content-Type: application/json
{
"status": "success"
}

```
