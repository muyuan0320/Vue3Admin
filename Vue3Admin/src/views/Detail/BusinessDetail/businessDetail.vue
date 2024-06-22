<script setup lang="ts">
import {useRoute,useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getProductInfo} from "@/serve/InfoGet/InfoGet";


const productInfo=ref({})
const bid=ref(useRoute().params.bid)
const router = useRouter();

const goBack = () => {
  router.back();
};

onMounted(async ()=>{
 productInfo.value= (await getProductInfo(bid.value)).data.results
})
</script>

<template>
  <div class="detail">
    <div class="content">
      <div class="left">
      </div>
      <div class="right" v-for="item in productInfo" :key="item.id">
        <div class="item">
          <img class="img" :src="item.Pimg">
          <div class="pname">{{item.Pname}}</div>
          <div class="Pprice">{{item.Pprice}}</div>
          <div class="type">{{item.type}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  position: relative;
  background-color: #f0f0f0;
  padding: 20px;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.content {
  display: flex; /* 使用 Flex 布局 */
  justify-content: space-between; /* 左右两侧水平分布 */
  align-items: flex-start; /* 上下对齐方式 */
  gap: 20px; /* 间隔 */
}

.left {
  flex: 0 0 auto; /* 左侧固定宽度 */
}

.right {
  flex: 1 1 auto; /* 右侧自适应宽度 */
  display: flex;
  flex-direction: column; /* 信息内容垂直排列 */
}

.item {
  border: 2px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  background-color: #c7def1;
  width: 100%; /* 宽度 100% */
  margin-bottom: 20px; /* 底部间距 */
}

.img {
  width: 100%;
  max-width: 200px;
}

.pname {
  font-weight: bold;
}

.Pprice {
  color: #007bff;
}

.type {
  margin-top: 5px;
}
</style>