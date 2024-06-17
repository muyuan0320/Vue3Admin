import {defineStore, } from "pinia";
import {ref} from "vue";
import type {RouteRecordRaw} from "vue-router";
import router, {constantRoutes, dynamicRoutes} from "@/router";
import store from "@/stores";

/**
 * @description 判断用户是否拥有有权限的用户，该方法通过遍历路由的meta.roles属性，判断用户是否拥有该路由的权限如果有，返回true，反之，返回false
 * @author MuYuan
 **/
const hasPermission = (roles: string[], route: RouteRecordRaw): boolean => {
    const routerRoles = route.meta?.roles
    return routerRoles ? routerRoles.some(role => roles.includes(role)) : false
}
/**
 * @description 根据用户角色过滤路由（递归遍历路由，判断用户是否拥有该路由的权限，如果有，则返回该路由，反之，返回空数组）
 * @param routes 已有的路由
 * @param roles  用户的角色集合
 * @author MuYuan
 */
const filterDynamicRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {

        const tmp = {...route}

        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterDynamicRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}
/**
 * @description 权限管理仓库
 * @author MuYuan
 */
export const useUserPermissionStore :any = defineStore('permission', () => {
    //可访问的路由
    const routes = ref<RouteRecordRaw[]>([])
    const addRoutes = ref<RouteRecordRaw[]>([])
    /**
     * @description 设置动态路由 根据router目录下的index.ts文件中的dynamicRoutes中的路由的meta中的role，如果roles有这个权限，则添加路由
     * @param roles 角色用户集
     * @author MuYuan
     */
    const setRoutes = (roles: string[]) => {
        //这里给filterDynamicRoutes方法传入的参数是动态路由数组来源于router目录下的index.ts文件，将所有的动态路由筛查权限
        const accessRoutes=filterDynamicRoutes(dynamicRoutes,roles)
        routes.value = constantRoutes.concat(accessRoutes)
        console.log(accessRoutes)
        addRoutes.value=accessRoutes
    }

return {routes, addRoutes, setRoutes}
}
)
export function usePermissionStoreHook() {
    return useUserPermissionStore(store)
}

