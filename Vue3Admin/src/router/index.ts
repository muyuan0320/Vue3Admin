import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";

export const constantRoutes :RouteRecordRaw[] =[
  {
    path:'/redirect',
    redirect:'/',

  },{
  path:'/login',
    component: ()=>import('@/views/login/login.vue')
  }


]
export  const dynamicRoutes :RouteRecordRaw[] =[
  { component:HelloWorld,
    path:'',
    name:'',
    meta:{
      title:'',
      roles:['admin']
    },


  },

]
const router = createRouter({
  history:createWebHistory(),
  routes:constantRoutes,
})

export default router