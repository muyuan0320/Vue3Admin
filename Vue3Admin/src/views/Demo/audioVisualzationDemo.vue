<script setup lang="ts">
import type {UploadRequestOptions} from "element-plus";
import {onMounted, ref} from "vue";
let isInit=false
const audioContext=new AudioContext()
let analyser=audioContext.createAnalyser()
const url=ref()
let mediaElementSource
let cvs:HTMLCanvasElement,ctx:CanvasRenderingContext2D|null
const canvasRef=ref<HTMLCanvasElement>()
onMounted(()=>{

  const canvas = canvasRef.value;
  while(!canvas){}
  ctx=canvas.getContext('2d')
  cvs=canvas
  draw()
})


const audioElement=ref<HTMLAudioElement>()
const dataArray=new Uint8Array(513)
const handleUpload=async  (options:UploadRequestOptions)=>{
  url.value=URL.createObjectURL(options.file)

  }
const handlePlay=()=>{

  if(isInit){
   return
  }
  isInit = true
  mediaElementSource=audioContext.createMediaElementSource(<HTMLMediaElement>audioElement.value)
  analyser=audioContext.createAnalyser()
  mediaElementSource.connect(analyser)
  analyser.connect(audioContext.destination)
  analyser.fftSize=1024
  audioContext.resume()
  audioElement.value?.play()
}
const draw =()=>{
  requestAnimationFrame(draw)
 const {width,height} = cvs
  if(!isInit) return
  if(ctx) {
    ctx.clearRect(0, 0, width, height)
    cvs.width=512
    cvs.height=618
   analyser.getByteFrequencyData(dataArray)
      const barWidth = width / dataArray.length/2
      ctx.fillStyle='rgb(80,80,200)'

      for (let i = 0; i < dataArray.length; i++) {
        const data = dataArray[i]
        const barHeight = (data/513)*height
        const x1 = i * barWidth+width/2;
        const x2= width/2- i * barWidth;
        const y = height - barHeight
        ctx.fillRect(x1, y,  barWidth-5,barHeight)
        ctx.fillRect(x2, y,  barWidth-5,barHeight)
      }}






}

</script>

<template>
  <el-upload :http-request="handleUpload" drag  accept=".mp3  ">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>

    <audio ref="audioElement" @play="handlePlay" :src="url" controls></audio>
    <canvas ref="canvasRef" >

    </canvas>


</template>

<style scoped>

</style>