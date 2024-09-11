<script setup lang="ts">

import {cutFile, fileExit, getFileMd5, uploadFile} from "@/utils/file/fileUpload";

const fileChange= async  (e:any)=>{

  console.log('runing')
  const md5=await getFileMd5(e.target.files[e.target.files.length-1])
  if(! await fileExit(md5)) {
    console.time('cut')
    const cutChunksList=await cutFile(e.target.files[e.target.files.length-1]) as any[]
    await uploadFile(cutChunksList,md5)
    console.timeEnd('cut')
  }
}
</script>

<template>
 <input type="file" @change="fileChange">
</template>

<style scoped>

</style>