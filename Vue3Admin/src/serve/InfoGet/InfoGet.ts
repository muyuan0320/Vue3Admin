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