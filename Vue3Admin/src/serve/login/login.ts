import {request} from "@/utils/service";
import { setReFlushToken, setToken} from "@/utils/cache/cookies";
import {usePermissionStoreHook} from "@/stores/modules/permission";
import {useUserStoreHook} from "@/stores/modules/users";
import {ElMessage} from "element-plus";
import router from "@/router";

const login = async (data: LoginAttribute) => {

  await  request({
        url: "login", method: "post", data: data
    }).then(async res=> {
   if (res.data.code == 200) {
        setToken(res.data.result[0].token)
        setReFlushToken(res.data.result[0].reFleshToken)

            const permission = usePermissionStoreHook()
            permission.setRoutes(res.data.result[0].permission.split(','))
            const user = useUserStoreHook()
            user.username=data.username
            user.roles=res.data.result[0].permission.split(',')
       ElMessage.success(res.data.msg)
       await router.replace({path: '/',replace:true})
       location.reload()} else {
       ElMessage.error(res.data.msg)

        }

    })
}

export {login}