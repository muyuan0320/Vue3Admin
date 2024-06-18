import {request} from "@/utils/service";
export const upLoadTodo = async (data:any)=>{
    return request({
        url:'/uploadTodo',
        method:'post',
        data:data
    })
}
export const getTodo = async ()=>{
    return request({
        url:'/getTodo',
        method:'get'
    })
}