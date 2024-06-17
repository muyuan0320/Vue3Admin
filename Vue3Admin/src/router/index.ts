import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
import {useUserStoreHook} from "@/stores/modules/users";
import {usePermissionStoreHook} from "@/stores/modules/permission";
import {getToken} from "@/utils/cache/cookies";
import {ElMessage} from "element-plus";
import {forEach} from "lodash-es";
import BusinessDetail from '@/views/Detail/BusinessDetail/businessDetail.vue';
const whiteTable:string[]=['/login','/forget',]
export const constantRoutes :RouteRecordRaw[] =[
  {path:'/',
  name:'name',
  component:()=>import('@/views/menu/menu.vue')},
  {
    path:'/redirect',
    redirect:'/',
  },{
  path:'/login',
    component: ()=>import('@/views/login/login.vue')
  }
]
export  const dynamicRoutes :RouteRecordRaw[] =[
  { component: ()=>import('@/views/Detail/BusinessDetail/businessDetail.vue'),
    path:'/businessDetail/:bid?',
    name:'business',
    meta:{
      title:'商品详情',
      roles:['Admin','Business']
    },
  },
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
