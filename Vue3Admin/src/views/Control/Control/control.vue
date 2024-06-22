<script setup lang="ts">
import {getUserList} from "@/serve/InfoGet/InfoGet";
import {onMounted, ref, watch} from "vue";
import {emailRules} from "@/utils/rules";
import {removeUser, updateUserInfo} from "@/serve/Admin/admin";
import {ElMessage} from "element-plus";
const tableRef=ref()
const tableData=ref([])
const selectRowData=ref<any>({})
const diaLogIsShow=ref(false)
const UserRules=ref({
  username:[{
    required: true, message: '用户名不能为空', trigger: 'blur'
  }],
  email:[{
    required:true,
    message:'邮箱不能为空',
    trigger: 'blur'
  },{
    validator:emailRules,
    trigger: 'blur'
  }],
permissionGroupId:[{
    required:true,
    message:'权限组不能为空',
    trigger: 'blur'
  }]
})
onMounted(async ()=>{
    tableData.value= (await getUserList()).data.results
    console.log(tableData.value)
})
const handleEdit = (row: any) => {
 selectRowData.value=row
  diaLogIsShow.value=true
}
const handleSubmit =async (data:any)=>{
  const res=await updateUserInfo(data)
  tableData.value=(await getUserList()).data.results
  ElMessage.success(res.data.msg)
  diaLogIsShow.value=false
}
const handleDelete = async (row: any) => {
  console.log(row.Uid)
  const res = await removeUser(row)
  tableData.value=(await getUserList()).data.results
  ElMessage.success(res.data.msg)
}


</script>

<template>


  <el-table :ref="tableRef" v-if="tableData.length" :data="tableData" border table-layout="auto" >
  <el-table-column prop="Uid" label="Uid"/>
  <el-table-column prop="username" label="Name"  />
  <el-table-column prop="email" label="Email" />
    <el-table-column prop="permissionGroupId" label="PermissionGroup"  />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          Edit
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
</el-table>
  <el-empty v-else></el-empty>
  <el-dialog
      v-model="diaLogIsShow"
      title="Edit"
  >
   <el-form :model="selectRowData" @submit.prevent="handleSubmit(selectRowData)">
     <el-form-item  prop="username" label="name"><el-input  v-model="selectRowData.username" placeholder="请输入用户名"></el-input></el-form-item>
     <el-form-item  prop="email" label=" email" ><el-input v-model="selectRowData.email" placeholder="请输入邮箱"></el-input></el-form-item>
     <el-form-item  prop="Permission" label="权限组" ><el-input v-model="selectRowData.permissionGroupId" placeholder="请输入权限组编码"></el-input></el-form-item>
     <el-button type="primary" native-type="submit">完成</el-button>
   </el-form>
  </el-dialog>
  <div class="fixedBottom">
    <div class="font">ps:在这一模块中,分别存在三个权限组,0,1,2,0代表超级管理员,1代表商家,2代表普通用户</div>

  </div>
</template>

<style scoped>
.fitBottom{

  height: 100px;
  position: fixed;
  bottom: 10%;
}
.font{
  font-weight: 700;
  font-size: 18px;
  color: #999999;
}
</style>