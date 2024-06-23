import {request} from "@/utils/service";

/**
 * 异步获取商家信息。
 *
 * 该函数发送一个GET请求到后端API，获取商家列表。
 * @returns 返回一个Promise，解析为请求的响应数据。
 */
export const getBusinessList=async ()=>{
    return (await request({
        url: 'businessList',
        method: 'get'
    }))
}
/**
 * 异步获取产品信息。
 *
 * 该函数发送一个GET请求到后端API，获取指定商家产品信息。
 * @param bid 商家id。
 * @returns 返回一个Promise，解析为请求的响应数据。
 */
export const getProductInfo=async (bid:any)=>{
    return (await request({
        url: 'productInfo',
        method: 'get',
        params:{
            bid:bid
        }
    }))
}
export const getProductInfoByType=async (data:any)=>{
    console.log(data)
    return (await request({
        url: 'getProductListByType',
        method: 'get',
        params:{
            bid:data.Bid,
            type:data.type
        }
    }))}

export const getBusinessInfo=async ()=>{
    return (await request({
        url:'BusinessInfoByUid',
        method:'get',
    }))
}
export const getUserList =async()=>{
    return (await request(
        {
            url:'getUserList',
            method:'get'
        }
    ))
}