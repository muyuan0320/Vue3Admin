import Cookies from 'js-cookie'
import CacheKey from "@/Constants/Cache-key";
export const getToken=()=>{
    return Cookies.get(CacheKey.TOKEN)
}
export const removeToken=()=>{
    return Cookies.remove(CacheKey.TOKEN)
}
export const removeReFlushToken=()=>{
    return Cookies.remove(CacheKey.ReFlushTOKEN)
}
export const setToken=(token:string)=>{
    return Cookies.set(CacheKey.TOKEN,token)
}
export const setReFlushToken=(token:string)=>{
    return Cookies.set(CacheKey.ReFlushTOKEN,token)
}
export const getReFlushToken=()=>{
    return Cookies.get(CacheKey.ReFlushTOKEN)
}
export const setPermissions=(permissions:string[])=>{
    return Cookies.set(CacheKey.PERMISSION,permissions.join(','))
}
export const getPermissions=():string[]|undefined=>{
    return (Cookies.get(CacheKey.PERMISSION)?.split(','))
}