import {request} from "@/utils/service";
export const updateUserInfo = async (data: any) => {
  return (await request({
    url: 'updateUserInfo',
    method: 'post',
    data: data
  }))
}
export const removeUser = async (data: any) => {
  return (await request({
    url: 'removeUser',
    method: 'post',
    data: data
  }))
}
