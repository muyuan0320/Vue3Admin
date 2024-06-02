<script setup lang="ts">
import {login} from '@/serve/login/login'
import {onMounted, reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import {useUserStoreHook} from "@/stores/modules/users";
import {ElMessage} from "element-plus";
onMounted(()=>{
 const user=useUserStoreHook()
 if (user.token){
   ElMessage.warning('您已处于登录状态')
   route.replace('/')
 }
})
const passwordRules=(rule:any, value:string, callback:any)=>{
  const passwordReg= /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{1,9}$/
  if (!passwordReg.test(value)){

    callback(new Error('密码必须包含大小写字母、数字和特殊字符，长度在8-20之间'))
  }else{
    callback()
  }
}
const loginRules=ref({
  username:[{
    required: true, message: '用户名不能为空', trigger: 'blur'
  }],
  password:[{
    required:true,
    message:'密码不能为空',
    trigger: 'blur'
  },{
    validator:passwordRules,
    trigger: 'blur'
  }
  ]
})
const loginForm=ref<LoginAttribute>({
  username:'',
  password:'',
})
const loginFormRef=ref()
const onLogin=async ()=>{
  loginFormRef.value.validate(async (valid:any)=>{
    if(valid) {
      await login(loginForm.value)

    }
    else {
      ElMessage.error('请检查账号密码是否填写正确')
    }
  })

}
const route = useRouter()
</script>

<template>
<el-container class="login">
<el-image class="img" src="/img.png">
</el-image>
  <div class="loginBox">
    <el-tabs stretch>
      <el-tab-pane class="tab-pane" index="0"  >
        <template #label>
          <span class="title">登录</span>
        </template>

    <div class="loginBorder">
      <div class="loginText">登录</div>
      <div class="loginForm">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules"    label-width="0px" @submit.prevent="onLogin">
        <el-form-item prop="username" >
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-text class="forgotText" @click="route.push('/forgot')">忘记密码</el-text>
          </el-form-item>
            <el-button  class="button" type="primary" native-type="submit">登录</el-button>
        </el-form>
      </div>
    </div>
      </el-tab-pane>
      <el-tab-pane class="tab-pane" index="1"  >
        <template #label>
          <span class="title">注册</span>
        </template>
      </el-tab-pane>

    </el-tabs>
  </div>
</el-container>
</template>

<style scoped>
.button{
  margin-top: 10%;
}
.title{
  font-size: 18px;
  color: #666;

}

.tab-pane{
  height: 60vh;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-grow: 1;
}
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
  top: 20%;
  width: 70%;
  height: 60%;
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
.forgotText{

  text-align: right;
  position: absolute;
  margin-top: 20%;
  right: 0;
}
@media screen  and (max-width: 768px){
  .tab-pane{
    height: 45vh;
    align-items: center;
    text-align: center;
    justify-content: center;
    flex-grow: 1;
  }
  .img{
    flex:0 0 100%;
    height: 90vh;
    aspect-ratio: 1/1;
  }
  .loginBox{
    position: absolute;
    z-index: 50;
    left: 10%;
    width: 80%;
    background: #c7def1;
    top: 25%;
    border-radius: 15px;
    height: 50vh;
  }
  .loginForm{
    margin: 5%;
  }
  .loginBorder{
    position: absolute;
    left: 15%;
    top: 15%;
    height: 70%;
  }
}

</style>