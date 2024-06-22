<script lang="ts" setup>

import {useUserStoreHook} from "@/stores/modules/users";
import router from "@/router";
import {getBusinessInfo} from "@/serve/InfoGet/InfoGet";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {createShop} from "@/serve/Business/business";
const userStore = useUserStoreHook();
const form =ref({
  Bname:'',
  description:'',
})
const menuRef = ref<any>();
const isShow = ref(false);
</script>
<template>
  <el-menu background-color="#29436e"
           class="menu"
  ref="menuRef">
    <el-menu-item class="logoBox">
      <el-image class="logo" src="./favicon.ico"></el-image>
    </el-menu-item>
    <div class="itemGroup">
      <el-menu-item class="font" index="/" @click="router.push('/');menuRef.close('sub')">首页</el-menu-item>
      <div></div>
      <el-menu-item class="font" index="/mine" @click="router.push('/mine');menuRef.close('sub')">我的</el-menu-item>
      <el-sub-menu v-if="userStore.roles.length" class="subMenu" index="sub">
        <template #title>
          <el-avatar class="avatar"></el-avatar>
        </template>
        <el-menu-item  v-permission="['Admin']" @click="router.push('/control');menuRef.close('sub')">
          <div class="font">
            管理界面
          </div>
        </el-menu-item>
        <el-menu-item v-permission="['Business']" index="/businessControl"
                      @click=" async()=>{
              menuRef?.close('sub')
        const bid = await getBusinessInfo();
         if(bid.data.results.length){

            await router.push({
        name: 'businessControl',
        params: {
        Bid:bid.data.results[0]?.Bid
        }})}
         else {

         ElMessage.warning('您还未创建店铺,请先创建');
         isShow = true;
        }
       }">
          <div class="font">
            商店管理
          </div>
        </el-menu-item>
        <el-menu-item index="/login" @click="()=>{userStore.logout(); router.push('/login');menuRef?.close('sub')}">
          <div class="font">退出登录</div>
        </el-menu-item>

      </el-sub-menu>

      <el-menu-item v-else class="loginBox" index="/login">
        <div class="loginText">登录</div>
      </el-menu-item>
    </div>
  </el-menu>
  <el-dialog
      v-model="isShow"
      title="商店创建"
      :before-close="()=>{isShow = false}">
    <el-form v-model="form" @submit.prevent="createShop(form);isShow=false">
      <el-form-item label="店铺名称">
        <el-input v-model="form.Bname"></el-input>
      </el-form-item>
      <el-form-item label="店铺描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item style="padding: 7%"  >
        <el-button type="primary" native-type="submit"  > 创建</el-button>
        <el-button @click="isShow = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <div class="view">
    <router-view></router-view>
  </div>
</template>


<style lang="scss" scoped>

.subMenu {
  margin-top: 3vh;
  height: 10vh;
  border: #c7def1;
}
.center{
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: center;
}
.button{
  display: block !important;
}
.font {
  color: #999;
  text-align: center;
}

.loginText {
  border: white;
  color: #ccc;
  font-size: 2vh;
}

.loginBox {
  background-color: #c7af9a;
  border-top-left-radius: 0;
  border-top-right-radius: 5px;
  width: 10vw;
  height: 10vh;
  align-items: center;
  justify-content: center;
}

.itemGroup {
  display: flex;
  float: right;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.menu {
  display: flex;
  z-index: 100;
  height: 10vh;

}

.logoBox {

  height: 10vh;
}

.logo {
  display: flex;
  align-items: center;
  width: auto;
  height: auto;
}

.avatar {
  position: absolute;
  transition: none;
  z-index: 2;
}

</style>