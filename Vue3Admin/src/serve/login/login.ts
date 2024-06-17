import {request} from "@/utils/service";
import {setPermissions, setReFlushToken, setToken} from "@/utils/cache/cookies";
import {usePermissionStoreHook} from "@/stores/modules/permission";
import {useUserStoreHook} from "@/stores/modules/users";
import {ElMessage} from "element-plus";
import {type RouteRecordRaw, useRouter} from "vue-router";
import router from "@/router";

const login = async (data: LoginAttribute) => {

  await  request({
        url: "login", method: "post", data: data
    }).then(async res=> {
   if (res.data.code == 200) {
        setToken(res.data.result[0].token)
        setReFlushToken(res.data.result[0].reFleshToken)
       setPermissions(res.data.result[0].permission.split(','))
            const permission = usePermissionStoreHook()
            permission.setRoutes(res.data.result[0].permission.split(','))
            const user = useUserStoreHook()
            user.username=data.username
            user.roles=res.data.result[0].permission.split(',')
       ElMessage.success(res.data.msg)
       await router.replace('/')
        } else {
       ElMessage.error(res.data.msg)

        }

    })
}

export {login}