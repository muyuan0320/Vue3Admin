// import {useUserStoreHook} from "@/stores/modules/users";
// import router from "@/router/index";
// import {usePermissionStoreHook} from "@/stores/modules/permission";
// import type {RouteRecordRaw} from "vue-router";
// import {getToken} from "@/utils/cache/cookies";
// const whiteTable:string[]=['/login','/forget']
//
// /**
//  * @description 全局路由守卫 如果用户没有动态路由中的角色，则获取角色 再根据角色生成动态路由，如果有 直接放行
//  * @autor MuYuan
//  * */
// router.beforeEach(async (to, from, next) => {
//   const useStore = useUserStoreHook()
//   const userPermissionStore=usePermissionStoreHook()
// if (getToken()) {
//     if (whiteTable.includes(to.path)) {
//         console.log(to.path)
//         return  next()
//
//     } else {
//         if (useStore.roles.length !== 0) next()
//         try {
//             await useStore.getUserInfo()
//             const roles = useStore.roles
//             if (roles.length === 0) return next('/login')
//             userPermissionStore.setRoutes(roles)
//             userPermissionStore.addRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
//             next({...to, replace: true})
//         } catch (err: any) {
//         }
//     }
// }
// else {
//     console.log(to.path)
//     next('/login')
// }
// })