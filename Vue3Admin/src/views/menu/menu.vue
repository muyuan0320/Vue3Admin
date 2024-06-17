<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getBusinessList} from "@/serve/InfoGet/InfoGet";
import router from "@/router";
import {getToken} from "@/utils/cache/cookies";
const push=(index:any)=>{
  if(getToken()) {
    router.push({
      name: 'business',
      params: {
        bid: index.Bid
      }
    })
  }
  else router.push('/login')
}
const businessList=ref()
onMounted(async()=>{
 businessList.value= (await getBusinessList()).data.results
  console.log(businessList.value)
})

</script>

<template>
  <div class="menu" >
 <div class="business" v-for="index in businessList" @click="push(index)">
   <div>
   <img class="avatar" :src="index.avatar?index.avatar:'http://localhost:3000/default.png'" alt="">

 </div>
    <div class="name">
      <span>{{index.Bname}}</span>
    </div>
    <div class="desc">
      <span>{{index.description}}</span>
    </div>
 </div>
  </div>
</template>

<style scoped>
.menu{
  display: flex;

}
.business{
  width: 50%;
}
.avatar{
  width: 50%;
  aspect-ratio: 1/1;
}
</style>