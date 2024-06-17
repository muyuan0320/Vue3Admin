import {request} from "@/utils/service";

export const getBusinessList=async ()=>{
    return (await request({
        url: 'businessList',
        method: 'get'
    }))
}
export const getProductInfo=async (bid:any)=>{
    return (await request({
        url: 'productInfo',
        method: 'get',
        params:{
            bid:bid
        }
    }))
}