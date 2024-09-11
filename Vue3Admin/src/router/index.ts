import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import { useUserStoreHook} from "@/stores/modules/users";
import {usePermissionStoreHook} from "@/stores/modules/permission";
import {getToken} from "@/utils/cache/cookies";
import {ElMessage} from "element-plus";
const whiteTable:string[]=['/login','/forget','/']
export const constantRoutes :RouteRecordRaw[] =[
  {path:'/*',
  redirect:'/'},
  {path:'/',
  name:'name',
  component:()=>import('@/views/menu/menu.vue')},
  {
    path:'/redirect',
    redirect:'/',
  },{
  path:'/login',
    component: ()=>import('@/views/login/login.vue')
  },{
  path:'/demo1',
    component: ()=>import('@/views/Demo/audioVisualzationDemo.vue')
  }
]
export  const dynamicRoutes :RouteRecordRaw[] =[
  { component: ()=>import('@/views/Detail/BusinessDetail/businessDetail.vue'),
    path:'/businessDetail/:bid?',
    name:'business',
    meta:{
      title:'商家详情',
      roles:['Admin','Business','User']
    },
  },  {
  component: ()=>import('@/views/mine/mine.vue'),
    path:'/mine/:Uid?',
    name:'mine',
    meta:{
      title:'个人界面',
      roles:['Admin','Business','User']
    },
  },
  {component:()=>import('@/views/Control/BusinessControl/BusinessControl.vue'),
  path:'/businessControl/:Bid',
    name:'businessControl',
    meta:{
      title:'商家控制',
      roles:['Business']
    },
  },
  {
    component:()=>import('@/views/Control/Control/control.vue'),
    path:'/control',
    name:'Control',
    meta:{
      title:'用户控制',
      roles:['Admin']
    },},
  {
    component:()=>import('@/views/Control/FileControl/file.vue'),
    path:'/file',
    name:'file',
    meta:{
      title:'文件控制',
      roles:['Admin','User']
    },

  },
  {
    component:()=>import("@/views/Demo/chatDemo.vue"),
    path:'/chat',
    name:'chat',
    meta:{
      title:'聊天界面',
      roles:['Admin','Business','User']
    },

  }
]
const router = createRouter({
  history:createWebHistory(),
  routes:constantRoutes,
})

export default router

/**
 * @description 全局路由守卫 如果用户没有动态路由中的角色，则获取角色 再根据角色生成动态路由，如果有 直接放行
 * @autor MuYuan
 * */
router.beforeEach(async (to, from, next) => {
  const useStore = useUserStoreHook();
  const userPermissionStore = usePermissionStoreHook();
  await useStore.getUserInfo() // 获取用户信息 包括权限信息等
  const tokenExists = getToken();
  const hasRoles = useStore.roles.length !== 0;
  const routesNeedToAdd = userPermissionStore.addRoutes.length === 0;

  if (tokenExists) {
    if (hasRoles) {
      if (routesNeedToAdd) {
        userPermissionStore.setRoutes(useStore.roles);
        userPermissionStore.addRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route));
        // 只调用一次next，之前已经错误地调用了两次
        next({...to, replace: true});
      } else {
        // 这里原本没有逻辑，但为了清晰，显式调用next继续导航
        next();
      }
    } else {
      try {
        await useStore.getUserInfo();
        const roles = useStore.roles;
        if (roles.length === 0) {
          ElMessage.error('没有权限');
          next('/login'); // 直接重定向，无需return
        } else if (userPermissionStore.addRoutes.length === 0) {
          userPermissionStore.setRoutes(roles);
          userPermissionStore.addRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route));
          next({...to, replace: true});
        } else {
          next(); // 已有路由无需再次添加，直接继续
        }
      } catch (err: any) {
        // 可能需要错误处理逻辑，如重定向到错误页面
      }
    }
  } else {
    if (whiteTable.includes(to.path)) {
      next(); // 白名单直接放行
    } else {
      ElMessage.error('请先登录');
      next('/login'); // 登录页面重定向
    }
  }
});
