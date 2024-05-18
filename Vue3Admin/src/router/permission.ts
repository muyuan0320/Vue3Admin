import {useUserStoreHook} from "@/stores/modules/users";
import router from "@/router/index";
import {usePermissionStoreHook} from "@/stores/modules/permission";
import type {RouteRecordRaw} from "vue-router";

/**
 * @description 全局路由守卫 如果用户没有动态路由中的角色，则获取角色 再根据角色生成动态路由，如果有 直接放行
 * @autor MuYuan
 * */
router.beforeEach(async (to, from, next) => {
  const useStore = useUserStoreHook()
  const userPermissionStore=usePermissionStoreHook()
    if (useStore.roles.length!==0) next()
    try{
    await useStore.getUserInfo()
    const roles = useStore.roles
        userPermissionStore.setRoutes(roles)
        userPermissionStore.addRoutes.forEach((route:RouteRecordRaw)=>router.addRoute(route))
        next({...to,replace:true})
    }
    catch (err:any){
    }

})