<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getProductInfo} from "@/serve/InfoGet/InfoGet";
const productInfo=ref({})
const bid=ref(useRoute().params.bid)
onMounted(async ()=>{
 productInfo.value= await getProductInfo(bid.value)
  console.log(productInfo.value)
})


</script>

<template>
123
</template>

<style scoped>

</style>