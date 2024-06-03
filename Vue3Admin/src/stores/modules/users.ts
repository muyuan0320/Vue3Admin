import {defineStore} from "pinia";
import { ref} from "vue";
import store from "@/stores";
import {getPermissions, getToken, removePermission, removeReFlushToken, removeToken} from "@/utils/cache/cookies";
import {request} from "@/utils/service";

export  const userStore =defineStore('user',()=>{
    const roles=ref<string[]>(getPermissions()||[])
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
        username.value=result.data.username
        roles.value=result.data.roles

    }
    const logout = ()=>{
        removeReFlushToken()
        removeToken()
        removePermission()
        token.value=''
        roles.value=[]
    }
    return {roles,token,username,getToken,getUserInfo,logout}
})
export  function useUserStoreHook(){
return userStore(store)
}