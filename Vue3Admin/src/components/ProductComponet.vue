<script setup lang="ts">



const emit = defineEmits(['updateItem']); // 定义自定义事件名
const ProductList = defineModel('productList')


</script>

<template>
  <div class="detail" v-for="item in  productList" :key="item?.Pid">
    <div class="item">
      <div class="img">
        <el-image :src="item?.Pimg" ></el-image>
      </div>
    <div class="contentItem">
      <div class="productNameLine">
        <div class="productName">{{item?.Pname}}</div>
      </div>
      <div class="productDescLine">
        <div class="productDesc">{{item?.Pdesc}}</div>
      </div>
      <div class="priceLine">
     <div class="price">&yen{{item?.Pprice}}</div>
        <div class="Num">
          <div class="reduceBnt">
           <button class="button" @click="()=>{
             if(item.Pnum>=1){    item.Pnum--}
           }">-</button>
          </div>
          <div class="choiceNum">{{item?.Pnum}}</div>
          <div class="addBnt">
            <button class="button" @click="()=>{

              item.Pnum++
            }
        ">+</button>
          </div>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<style scoped>
.Num{
  display: flex;


}
.choiceNum{
  margin: 0 10%;
  line-height: 100%;
  height: 100%;
}
.contentItem{
  padding: 5%;
  position: relative;
}
.button{
  width: 100%;
  line-height: 100%;
  border-radius: 20px;
  color: white;
  border: none;
  background: #409efe;
}
.img{

  width: 15%;
  margin: 10%;
}
.price{
  color: #e4393c;
  padding-right: 100%  ;
  margin: 0 8%;
}
.item{
  margin: 5%;
  width: 100%;
 color: #666666;
  background: #fff;
  border-radius: 20px;
  display: flex;
}

.productName{
  color: #444444;
}
.priceLine{
height: 10%;
  line-height: 10%;
position: absolute;
  display: flex;
bottom: 10%;
  font-size: 100%;
}
.productDesc{
  color: #999999;
  font-size: 12px;
}
.detail{
  width: 100%;
  display: flex;
  text-align: left;
  background: #f5f5f5;


}


</style>