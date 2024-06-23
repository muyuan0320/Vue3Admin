import {request} from "@/utils/service";
export const SubmitOrder = async (data: any) => {

    return (await request({
    url: 'SubmitOrder',
    method: 'post',
    data: data
  }))
}
export const getOrderListByUid = async () => {
  return (await request({
    url: 'getOrderListByUid',
    method: 'get',

  }))
}
export const getOrderListByBid = async (data:any) => {
  return (await request({
    url: 'getOrderListByBid',
    method: 'get',
      params:{
          Bid:data
      }

  }))
}
export const getOrderListByStatus = async (data:any) => {
  return (await request({
    url: 'getOrderListByStatus',
    method: 'get',
    params:{
        status:data
    }
  }))
}
export const finnishOrder = async (data:any) => {
  return (await request({
    url: 'finnishOrder',
    method: 'post',
    data:data
  }))
}