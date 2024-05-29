import {defineStore} from "pinia";
import { ref} from "vue";
import store from "@/stores";
import {getToken, removeReFlushToken, removeToken} from "@/utils/cache/cookies";

export  const userStore =defineStore('user',()=>{
    const roles=ref<string[]|undefined>([])
    const token =ref<string>(getToken() ||'')
    const username =ref<string>('')
    const getUserInfo = async ()=>{
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