<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import { useRoute} from "vue-router";
import {getProductInfo, getProductInfoByType} from "@/serve/InfoGet/InfoGet";
import { getBusinessInfoByBid } from "@/serve/Business/business";
import {ElLoading, ElMessage} from "element-plus";
import ProductComponet from "@/components/ProductComponet.vue";
import {SubmitOrder} from "@/serve/Order/order";
const typeList = ref<string[]>([]);
const productInfo = ref<any[any]>([]);
const bid = ref(useRoute().params.bid);
const choice = ref("全部");
const totalValue = ref(0);
const OrderList=ref<any>({
  Bid:bid.value,
  ProductList:[]
})
const handleSubmit = async () => {
  const res=await SubmitOrder(OrderList.value);
  ElMessage.success(res.data.msg);
};

const handleChange=async()=>{
  if(choice.value=="全部"){
    await getAllProduct();
  }else{
    await updateProduct(choice.value)
  }
}
const getAllProduct = async () => {
  const instance = ElLoading.service({
    text:'加载中'
  })
  productInfo.value = (await getProductInfo(bid.value)).data.results
  instance.close()
};
const updateProduct = async (data: any) => {


  const instance = ElLoading.service({
    text:'加载中'
  })
  productInfo.value=(await getProductInfoByType({ Bid:bid.value,
    type:data})).data.results

  instance.close()
};
onMounted(async () => {
  const instance = ElLoading.service({
    text:'加载中'
  })
  productInfo.value = (await getProductInfo(bid.value)).data.results
  typeList.value = (await getBusinessInfoByBid(bid.value)).data.results[0].Typelist.split(",");
  instance.close()

  watch(()=>productInfo,() => {
    totalValue.value = 0;
    for (let i = 0; i < productInfo.value.length; i++) {
      if (productInfo.value[i]) {
        totalValue.value += productInfo.value[i].Pprice * productInfo.value[i].Pnum;
      }
    }
  },{deep:true} );

});


</script>

<template>
  <div class="container">
   <div class="left">
     <el-tabs v-model="choice" @tab-change="handleChange" class="tabs" tab-position="left" :stretch="true">
       <el-tab-pane  label="全部" name="全部"  >
        <ProductComponet :productList="productInfo" />
       </el-tab-pane>
       <el-tab-pane :name="type" v-for="type in typeList" :key="type" :label="type" >
         <ProductComponet   :productList="productInfo"  />
       </el-tab-pane>
        </el-tabs>
    </div>
    <div class="buttonBar">
      <div class="total">合计: <p class="totalPrice"> &yen{{ totalValue }}</p></div>
      <div class="submitButton">
      <el-button round type="primary" size="large" @click="handleSubmit">提交订单</el-button>
      </div>

    </div>
    </div>

</template>

<style scoped>
.totalPrice{
  line-height: 35px;
  font-size: 20px;
  color: #e4393c;
}
.container{
  height: 100%;
}

.tabs{
  background: #fff;
}

.left{

  min-height: 90vh;
  display: block;
flex-grow: 1}
.total{display: flex;
  margin-left: 50%;
  margin-right: 10%;
}
.buttonBar{

  float:right ;
  position: fixed;
  border-radius: 10px;
  bottom: 0;
  color: #666666;
  line-height: 10vh;
  height: 10vh;
  right: 0;
  left: 0;
  display: flex;
  background: #e6e6e6;
  z-index: 3;
}


</style>