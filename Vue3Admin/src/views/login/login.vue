<script setup lang="ts">
import {login} from '@/serve/login/login'
import {reactive, ref} from 'vue'
const loginForm=ref<LoginAttribute>({
  username:'',
  password:'',
})
const rules=ref([

])
</script>

<template>
<el-container class="login">
<el-image class="img" src="/img.png">
</el-image>
  <div class="loginBox">
    <div class="loginBorder">
      <div class="loginText">登录</div>
      <div class="loginForm">
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef"   label-width="0px" @submit.prevent="login(loginForm)">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" native-type="submit">登录</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>
  </div>
</el-container>
</template>

<style scoped>
.login{
  display: flex;
  height: 100%;

}
.img{
  flex:0 0 65%;
  height: 90vh;
  aspect-ratio: 1/1;
}
.loginBox{
  position: relative;
  flex: 0 0 35%;
  background: #c7def1;
  height: 90vh;
}
.loginBorder{
  position: absolute;
  left: 18%;
  top: 30%;
  width: 70%;
  height: 30vh;
  background: rgba(101, 216, 216, 0.9);
  border-radius: 15px;
}
.loginText{
  font-size: 3vh;
  color: #666;
}
.loginForm{
  margin: 10%;
}


</style>