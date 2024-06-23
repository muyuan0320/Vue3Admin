import {request} from "@/utils/service";
export const SubmitOrder = async (data: any) => {

    return (await request({
    url: 'SubmitOrder',
    method: 'post',
    data: data
  }))
}