<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProductInfo } from "@/serve/InfoGet/InfoGet";
import { getBusinessInfoByBid } from "@/serve/Business/business";
import {ElLoading} from "element-plus";

const typeList = ref<string[]>([]);
const productInfo = ref<any>({});
const bid = ref(useRoute().params.bid);
const router = useRouter();
const isCollapsed = ref(false);
const totalValue = ref(0);
const filteredProductInfo = ref([]);  // 新的用于展示的商品列表

onMounted(async () => {
  const instance = ElLoading.service({
    text:'加载中'
  })
  productInfo.value = (await getProductInfo(bid.value)).data.results.map((item: any) => ({ ...item, quantity: 0 }));
  typeList.value = (await getBusinessInfoByBid(bid.value)).data.results[0].Typelist.split(",");
  filteredProductInfo.value = productInfo.value;
  instance.close()
  updateTotalValue();
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const goBack = () => {
  router.back();
};

const changeQuantity = (index: number, delta: number) => {
  if (productInfo.value[index].quantity + delta > 0||productInfo.value[index].quantity==1) {
    productInfo.value[index].quantity += delta;
    updateTotalValue();
  }
};
const updateTotalValue = () => {
  let total = 0;
  for (let item of productInfo.value) {
    total += item.Pprice * item.quantity;
  }
  totalValue.value = total;
};

const filterProducts = (type: string) => {
  if (type === '全部') {
    filteredProductInfo.value = productInfo.value;  // 显示全部商品
  } else {
    filteredProductInfo.value = productInfo.value.filter((item: any) => item.type === type);  // 根据类型过滤商品
  }
};
</script>

<template>
  <div class="container">
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
      <button class="toggle-button" @click="toggleCollapse">{{ isCollapsed ? '展开' : '收起' }}</button>
      <nav v-if="!isCollapsed">
        <ul>
          <li @click="filterProducts('全部')">全部</li>
          <li v-for="type in typeList" :key="type" @click="filterProducts(type)">{{ type }}</li>
        </ul>
      </nav>
      <button class="back-button" @click="goBack">Back</button>
    </div>

    <div class="detail">
      <div class="item" v-for="(item, index) in filteredProductInfo" :key="item.Pid">
        <div class="image">
              <img class="img" :src="item.Pimg" alt="Product Image">
            </div>
            <div class="info">
              <div class="pname">{{ item.Pname }}</div>
              <div class="Pprice">￥{{ item.Pprice }}</div>
              <div class="type">{{ item.Pdesc }}</div>
              <div class="quantity-control">
                <button class="plus-button" @click="changeQuantity(index, -1)">-</button>
                <span>{{ item.quantity }}</span>
                <button class="minus-button" @click="changeQuantity(index, 1)">+</button>
              </div>
            </div>
       </div>
      <div class="total-value">
        总价: ￥{{ totalValue }}
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
  background-color: #c7def1;
  transition: width 0.5s;
  cursor: pointer;
}

.collapsed {
  width: 70px;
}

.detail {
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
}

.back-button, .toggle-button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


.item {
  border: 2px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  background-color: #c7def1;
  width: 100%; /* 宽度 100% */
  margin-bottom: 20px; /* 底部间距 */
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
}

.image {
  width: 200px;
}

.img {
  width: 100%;
  max-width: 200px;
}

.info {
  flex: 1;
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 垂直排列 */
  justify-content: center; /* 垂直居中 */
}

.pname {
  font-size: 18px;
  font-weight: bold;
}

.Pprice {
  color: red;
}

.type {
  margin-top: 5px;
}

.total-value {
  font-size: 18px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #c7def1;
  color: red;
  text-align: center;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
.plus-button, .minus-button {
  border-radius: 50%;
  border: 1px solid #322e2e;
  cursor: pointer;
  background-color: #c7def1;
}
</style>