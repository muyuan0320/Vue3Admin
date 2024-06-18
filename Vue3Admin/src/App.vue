<script lang="ts" setup>

import {useUserStoreHook} from "@/stores/modules/users";
import {request} from "@/utils/service";
import {getTodo, upLoadTodo} from "@/serve/Todo/todo";
const userStore = useUserStoreHook();

upLoadTodo({
  todo:'test'
})
</script>
<template>
<el-menu class="menu"
router
         background-color="#29436e">
<el-menu-item class="logoBox">
  <el-image class="logo" src="./favicon.ico"></el-image>
</el-menu-item>
  <div class="itemGroup">
    <el-menu-item index="/" class="font">首页</el-menu-item>
    <div></div>
    <el-menu-item index="/mine" class="font" >我的</el-menu-item>
    <el-sub-menu v-if="userStore.roles.length"  class="subMenu"  >
      <template #title >
        <el-avatar class="avatar"></el-avatar>
      </template>
      <el-menu-item v-permission="['Admin']" >
        <div class="font">
        管理界面
        </div>
      </el-menu-item>
      <el-menu-item v-permission="['Business']">
        <div class="font">
        商店管理
        </div>
      </el-menu-item>
      <el-menu-item @click="userStore.logout" index="/login">
        <div class="font">退出登录</div>
      </el-menu-item>

    </el-sub-menu>

    <el-menu-item v-else index="/login" class="loginBox">
    <div class="loginText">登录</div>
    </el-menu-item>
  </div>
</el-menu>
  <div class="view">
    <router-view></router-view>
  </div>
</template>


<style lang="scss" scoped>
.subMenu{
  margin-top: 3vh;
  height: 10vh;
  border: #c7def1;
}
.font{
  color: #999;
  text-align: center;
}
.loginText{
  border: white;
  color: #ccc;
  font-size: 2vh;
}
.loginBox{
  background-color: #c7af9a;
  border-top-left-radius: 0;
  border-top-right-radius: 5px ;
  width: 10vw;
  height: 10vh;
  align-items: center;
  justify-content: center;
}
.itemGroup{
  display: flex;
  float: right;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}
.menu{
  display: flex;
  z-index: 100;
  height: 10vh;

}
.logoBox{

  height: 10vh;
}
.logo {  display: flex;
  align-items: center;
  width: auto;
  height: auto;
}

.avatar{
  position: absolute;
  transition: none;
  z-index: 2;
}

</style>