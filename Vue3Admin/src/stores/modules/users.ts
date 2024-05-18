import {defineStore} from "pinia";
import { ref} from "vue";
import store from "@/stores";

export  const userStore =defineStore('user',()=>{
    const roles=ref<string[]>([])
    const token =ref<string>('')
    const userName =ref<string>('')
    return {roles,token,userName}
})
export  function useUserStoreHook(){
return userStore(store)
}