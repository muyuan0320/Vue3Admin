<script setup lang="ts" >
import {getOrderListByStatus, getOrderListByUid} from "@/serve/Order/order";
import {onMounted, ref} from "vue";
import {ElLoading} from "element-plus";
const OrderList =ref([])
const Choice =ref('我的订单')
onMounted(async ()=>{
 const instance= ElLoading.service({text:'加载中'})
 OrderList.value  = (await getOrderListByUid()).data
instance.close()
})
const tabChange =async (name)=>{
  const instance= ElLoading.service({text:'加载中'})
  if(name==='全部'){
    OrderList.value  = (await getOrderListByUid()).data
  }
 else {

    OrderList.value = (
        await getOrderListByStatus(name)).data
  }
  instance.close()
}

</script>

<template>
<el-tabs v-model="Choice" @tab-change="tabChange"  type="card">
  <el-tab-pane label="我的订单" name="全部">
    <div v-for="item in OrderList">
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
      </el-card>
    </div>
  </el-tab-pane>
  <el-tab-pane label="进行中订单" name="进行中">
    <div v-for="item in OrderList">
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
      </el-card>
    </div>
  </el-tab-pane>
  <el-tab-pane label="已完成订单" name="已完成">
    <div v-for="item in OrderList">
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
      </el-card>
    </div>
  </el-tab-pane>
</el-tabs>
</template>

<style scoped>

</style>