<script setup  >

import {onMounted, ref} from "vue";
import {getToken} from "@/utils/cache/cookies.ts";


const baseUrl= 'http://localhost:3000/'
const messagesDiv = ref()
const userInput = ref()

const post=(URL,config={})=> fetch(baseUrl+URL,{
  method:'post',
  headers:{
    'authorization':`Bearer `+getToken(),
    'Content-Type': 'application/json',
  },
  ...config

})

const  get=(URL,config={})=> fetch(baseUrl+URL,{
  method:'get',
  headers:{
    'authorization':`Bearer `+getToken(),
  },
  ...config

})


onMounted(()=>{
  messagesDiv.value= document.getElementById('messages');

  document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('beforeunload',(e)=>{
      post('leave')
    })


})
});
function appendMessage(text, sender, id) {
  if (sender === 'user') {
    const messageElement = document.createElement('div');
    messageElement.textContent = text;
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messagesDiv.value.appendChild(messageElement);
    messagesDiv.value.scrollTop = messagesDiv.value.scrollHeight;
  } else if (sender === 'ai') {
    // 假设 text 是一个对象，包含 content 和 id


    // 查找具有相应 id 的元素
    const messageElement = document.getElementById(id);

    if (!messageElement) {
      // 如果没有找到，创建一个新的元素
      const newMessageElement = document.createElement('div');
      newMessageElement.id = id;
      newMessageElement.textContent = text;
      newMessageElement.classList.add('ai-message');
      messagesDiv.value.appendChild(newMessageElement);
    } else {
      // 如果找到了，更新现有元素的内容
      messageElement.textContent += text;
    }

    messagesDiv.value.scrollTop = messagesDiv.value.scrollHeight;
  }
}
async function send() {
  if(!localStorage.getItem('token')){
    localStorage.setItem( 'token', await ( await get('getToken')).text())
  }
  const message = userInput.value;
  userInput.value = '';
  if (message) {
    appendMessage(message, 'user', 0);
    // 发送请求并处理响应
    try {
      const response = await post('chat', {
        body: JSON.stringify({ content: message })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 处理流式响应
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          await post('finish', {

            body: JSON.stringify({content: result}),


          })

          break;
        }

        const chunk = decoder.decode(value);
        let dataArray = chunk.split('}\n{')
        let data
        for (let i = 0; i < dataArray.length; i++) {

          if (dataArray.length > 1) {
            if (i % 2 === 0) { data = JSON.parse(dataArray[i] + '}'); }
            else {
              data = JSON.parse('{' + dataArray[i]);
            }
          }
          else { data = JSON.parse(dataArray[i]) }

          const content = data.choices[0].delta.content;
          const id = data.id;
          result += content;
          appendMessage(content, 'ai', id);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }
}


</script>

<template>
  <div id="chat-box">
    <div id="messages"></div>
    <input type="text" id="user-input" v-model="userInput" placeholder="Type your message...">
    <button id="send-button" @click="send" @keyup.enter="send">Send</button>
  </div>

</template>

<style >
/* styles.css */
/* styles.css */
#chat-box {
  width: 400px;
  max-width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#messages {
  height: 300px;
  overflow-y: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 10px;
  background-color: #ffffff;
}

#user-input {
  width: 80%;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  border-radius: 4px;
}

#send-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#send-button:hover {
  background-color: #0056b3;
}

.user-message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  float: right;
  clear: both;
  max-width: 70%;
}

.ai-message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f0f0f0;
  color: #333;
  float: left;
  clear: both;
  max-width: 70%;
}

/* OpenAI 风格的额外样式 */
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f5f5f5;
}

#chat-box {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#user-input {
  border: 1px solid #dfe1e5;
  background-color: #f5f5f5;
  width: 95%;
}

#send-button {
  background-color: #007bff;
  color: #fff;
}

#send-button:hover {
  background-color: #0056b3;
}

.user-message {
  background-color: #007bff;
  color: #fff;
}

.ai-message {
  background-color: #f0f0f0;
  color: #333;
}

/* 文本样式 */
.user-message p,
.ai-message p {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  word-wrap: break-word;
}

</style>