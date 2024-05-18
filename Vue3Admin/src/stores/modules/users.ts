import {defineStore} from "pinia";
import { ref} from "vue";
import store from "@/stores";

export  const userStore =defineStore('user',()=>{
    const roles=ref<string[]>([])
    const token =ref<string>('')
    const userName =ref<string>('')

    const getToken =()=>{
        return token.value
    }
    return {roles,token,userName,getToken}
})
export  function useUserStoreHook(){
return userStore(store)
}