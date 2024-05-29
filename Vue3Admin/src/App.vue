<script lang="ts" setup>

import {useUserStoreHook} from "@/stores/modules/users";

const userStore = useUserStoreHook();
</script>
<template>
<el-menu class="menu"
router
         background-color="#29436e">
<el-menu-item class="logoBox">
  <el-image class="logo" src="./favicon.ico"></el-image>
</el-menu-item>
  <div class="itemGroup">
  <el-menu-item v-if="userStore.roles?.length">
  </el-menu-item>
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
</style>