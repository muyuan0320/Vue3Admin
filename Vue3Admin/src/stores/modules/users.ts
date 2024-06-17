import {defineStore} from "pinia";
import { ref} from "vue";
import store from "@/stores";
import { getToken, removePermission, removeReFlushToken, removeToken} from "@/utils/cache/cookies";
import {request} from "@/utils/service";

export  const userStore =defineStore('user',()=>{
    const roles=ref<string[]>([''])
    const token =ref<string>(getToken() ||'')
    const username =ref<string>('')
    const getUserInfo = async ()=>{
        if(!token.value){
            return
        }
        const result = await  request(
        {
            url: 'userInfo',
            method: 'get'
        }
    )
        username.value=result.data.userInfo.username
        roles.value=result.data.userInfo.roles
    }

    const logout = ()=>{
        removeReFlushToken()
        removeToken()
        token.value=''
        roles.value=[]
    }
    return {roles,token,username,getToken,getUserInfo,logout}
})
export  function useUserStoreHook(){
return userStore(store)
}