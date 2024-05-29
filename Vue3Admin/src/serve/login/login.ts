import {request} from "@/utils/service";
import {setPermissions, setReFlushToken, setToken} from "@/utils/cache/cookies";
import {usePermissionStoreHook} from "@/stores/modules/permission";
import {useUserStoreHook} from "@/stores/modules/users";
import {ElMessage} from "element-plus";

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
       ElMessage.success(res.data.msg)
        } else {
       ElMessage.error(res.data.msg)

        }

    })
}

export {login}