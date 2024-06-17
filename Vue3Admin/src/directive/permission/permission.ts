import {type Directive} from "vue";
import  {useUserStoreHook} from "@/stores/modules/users";
import {getToken} from "@/utils/cache/cookies";
export  const permission: Directive={
  async  mounted  (el,binding) {
        const {value:permissionRoles}=binding;
        const userStore =useUserStoreHook()
        await useUserStoreHook().getUserInfo()
        if(getToken()) {
            if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
                await useUserStoreHook().getUserInfo()
                if(Array.isArray(userStore.roles)) {
                    const hasPermission = userStore.roles?.some((role) => permissionRoles.includes(role))
                    //hasPermission||(el.style.display="none") 隐藏
                    hasPermission || el.parentNode?.removeChild(el)//没有权限销毁节点
                }




            } else {
                throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
            }
        }
        else  el.parentNode?.removeChild(el)
    }
}