<script lang="ts" setup>
import { login } from './serve/login/login';
import {useUserStoreHook} from "@/stores/modules/users";
import {ref} from "vue";
import {request} from "@/utils/service";

const data=ref<any>([{}])

Promise.all([
  request({
    method:'get',
    url:'',}).then((res)=>{
    console.log(res)
  }),
  // login({
  //   username:'test',
  //   password:'yanmo123'
  // }).then(()=>{
  //
  // })
])
const userStore=useUserStoreHook()
data.value=[{
    username:userStore.username,
    token:userStore.token,
    roles:userStore.roles,
  }]





console.log(data.value)
</script>
<template>
  <div>
 <el-table :data=data>
   <el-table-column label="姓名" prop="username"></el-table-column>
   <el-table-column label="token" prop="token"></el-table-column>
   <el-table-column label="roles"  prop="roles"></el-table-column>
 </el-table>
  </div>
</template>


<style lang="scss" scoped>

</style>