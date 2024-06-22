<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProductInfo } from "@/serve/InfoGet/InfoGet";
import { getBusinessInfoByBid } from "@/serve/Business/business";

const typeList = ref<string[]>([]);
const productInfo = ref<any>({});
const bid = ref(useRoute().params.bid);
const router = useRouter();
const isCollapsed = ref(false);

onMounted(async () => {
  productInfo.value = (await getProductInfo(bid.value)).data.results;
  typeList.value = (await getBusinessInfoByBid(bid.value)).data.results[0].Typelist.split(",");
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="container">
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
      <button class="toggle-button" @click="toggleCollapse">{{ isCollapsed ? '展开' : '收起' }}</button>
      <nav v-if="!isCollapsed">
        <ul>
          <li v-for="type in typeList" :key="type">{{ type }}</li>
        </ul>
      </nav>
      <button class="back-button" @click="goBack">Back</button>
    </div>

    <div class="detail">
      <div class="content">
        <div class="left">
          <!-- 左侧可固定内容 -->
        </div>
        <div class="right">
          <div class="item" v-for="item in productInfo" :key="item.id">
            <img class="img" :src="item.Pimg" alt="Product Image">
            <div class="pname">{{ item.Pname }}</div>
            <div class="Pprice">{{ item.Pprice }}</div>
            <div class="type">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f5f5f5;
  transition: width 0.5s;
}

.collapsed {
  width: 70px;
}

.detail {
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
}

.back-button,.toggle-button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.content {
  display: flex;
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