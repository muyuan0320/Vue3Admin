<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getBusinessInfo, getProductInfo} from "@/serve/InfoGet/InfoGet";
import {useRoute} from "vue-router";
import {
  ElLoading,
  ElMessage,
  type UploadInstance,
  type UploadRequestOptions
} from "element-plus";
import {toBase64String} from "@/utils/toString";
import {addProducts, EditProduct} from "@/serve/Business/business";
import router from "@/router";
import {finnishOrder, getOrderListByBid, getOrderListByUid, SubmitOrder} from "@/serve/Order/order";
const tabChoice =ref()
const productList=ref([])
const isShow=ref(false);
const file=ref<File[]>([])
const Bid=ref()
const addProduct = ref({
  Pname:'',
  Pimg:'',
  Pprice:0,
  Pdesc:'',
  type:'',
})
const orderList =ref<any>([])
const isEdit=ref(false)
const title=ref('创建商品')
const upload=ref<UploadInstance>()
const addProductRef =ref()
const getOrder=async()=>{
  orderList.value=(await getOrderListByBid(Bid.value)).data

}
onMounted(async ()=>{
Bid.value=useRoute().params.Bid

  if(Bid.value!=(await getBusinessInfo()).data.results[0].Bid){
    ElMessage.error('非法访问')
   await router.replace('/')
    location.reload()
  }
  const instance = ElLoading.service({
    text:'加载中'
  })
   await getOrder()
  productList.value=( await getProductInfo(Bid.value)).data.results
instance.close()
})



const handleEdit=async(data:any)=>{
  title.value='编辑商品'
  isEdit.value=true
  isShow.value=true
  addProduct.value=data
}
const handleDelete=async(data:any)=>{

}
const handleAdd=()=>{
 isShow.value=true
  isEdit.value=false
  title.value='创建商品'

}
const handleFinish = async (item:any)=>{
 const res=await  finnishOrder({Oid:item.Oid})
  ElMessage.success(res.data.message)
  const loadInstance=ElLoading.service({text:'加载中'})
  await getOrderListByBid(Bid.value)
  loadInstance.close()
}
const handleSubmit= async ()=>{

  isShow.value=false
  if(isEdit.value){
    await  EditProduct(addProduct.value)
    addProduct.value={
      Pname:'',
      Pimg:'',
      Pprice:0,
      Pdesc:'',
      type:'',
    }
  }else{await addProducts(addProduct.value)
  }
  const instance = ElLoading.service({
    text:'加载中'
  })
  productList.value=(
      await getProductInfo(useRoute().params.Bid)).data.results
  instance.close()
  addProduct.value={
    Pname:'',
    Pimg:'',
    Pprice:0,
    Pdesc:'',
    type:'',
  }

}
const handleUpload=async(pragmas:UploadRequestOptions)=>{
 file.value[0]=pragmas.file
  const data= await toBase64String(pragmas.file)
  addProduct.value.Pimg = data
}
</script>

<template>
  <el-tabs v-model="tabChoice">
    <el-tab-pane  label="商品管理">
      <el-table :data="productList" border>
        <el-table-column prop="Pid" label="产品ID"></el-table-column>
        <el-table-column prop="Pimg" label="产品图片">
          <template #default="scope" >
            <el-image :src="scope.row.Pimg" @click="console.log(scope.row)"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="Pname" label="产品名"></el-table-column>
        <el-table-column prop="Pdesc" label="产品描述"></el-table-column>
        <el-table-column prop="Pprice" label="产品价格"></el-table-column>
        <el-table-column prop="type" label="产品类型"></el-table-column>
        <el-table-column >
          <template #default="scope">
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
          </template>
        </el-table-column>

      </el-table>
      <el-dialog
          v-model="isShow"
          :before-close="()=>{isShow=false;addProduct={
        Pname:'',
    Pimg:'',
    Pprice:0,
    Pdesc:'',
    type:'',

      }}"
          :title="title"
      >
        <el-form v-model="addProduct" :ref="addProductRef" @submit.prevent="handleSubmit">
          <el-form-item label="商品图片">
            <el-upload drag  :file-list="file"
                       :http-request="handleUpload"
                       :show-file-list="false"
                       ref="upload"
            >
              <template #default>
                <el-image :src="addProduct.Pimg">
                </el-image>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品名称"><el-input v-model="addProduct.Pname" placeholder="请输入商品名"></el-input></el-form-item>
          <el-form-item label="商品价格">
            <el-input-number v-model="addProduct.Pprice"></el-input-number></el-form-item>
          <el-form-item label="商品描述" ><el-input type="textarea" placeholder="请输入商品描述" v-model="addProduct.Pdesc"></el-input> </el-form-item>
          <el-form-item label="商品类型"><el-input v-model="addProduct.type" placeholder="请选择商品类型"></el-input> </el-form-item>
          <el-button type="primary" native-type="submit">提交</el-button>
        </el-form>
      </el-dialog>
      <el-button type="primary" @click="handleAdd">添加</el-button>

    </el-tab-pane>
    <el-tab-pane label="订单管理">
      <div v-for="item in orderList">
        <el-card  class="OrderView">
             <div class="OrderFirst"><el-tag>订单号:{{item.Oid}}</el-tag>
               <el-tag>订单状态:{{item.status}}</el-tag></div>
            <el-table :data="item.ProuductList" border>
              <el-table-column prop="Pimg" label="产品图片">
               <template #default="scope">
                 <el-image :src="scope.row.Pimg"></el-image>
               </template>
              </el-table-column>
              <el-table-column prop="Pname" label="产品名"></el-table-column>
              <el-table-column prop="Pprice" label="产品价格"></el-table-column>
              <el-table-column prop="Count" label="购买数量"></el-table-column>
            </el-table>
          <el-button type="primary" @click="handleFinish(item)" v-if="item.status==='进行中'">完成订单</el-button>
        </el-card>
        </div>
    </el-tab-pane>
  </el-tabs>

</template>

<style scoped>
.OrderView{
display: flex;
}
.OrderFirst{
  display:flex;
  flex-direction: column;
}

</style>