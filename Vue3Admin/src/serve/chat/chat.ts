import {request} from "@/utils/service";

export const chat = async (msg:string)=>{
  return   await request({
        url: 'chat',
        method: 'post',
        data: {
            content: msg
        },
      timeout:1000000
    })
}