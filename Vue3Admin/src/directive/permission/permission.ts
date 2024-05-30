import {type Directive} from "vue";
import  {useUserStoreHook} from "@/stores/modules/users";
export  const permission: Directive={
    mounted(el,binding){
        const {value:permissionRoles}=binding;
        const {roles} =useUserStoreHook()
        if (Array.isArray(permissionRoles)&& permissionRoles.length>0){
            const hasPermission=roles?.some((role)=>permissionRoles.includes(role))
            //hasPermission||(el.style.display="none") 隐藏
            hasPermission||el.parentNode?.removeChild(el)//没有权限销毁节点
        }
        else {
            throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
        }

    }
}