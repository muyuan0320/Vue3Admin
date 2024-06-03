import {request} from "@/utils/service";
import {ElMessage} from "element-plus";

export  const register =(data:RegisterAttribute)=>{
    request({
        data:data,
        url:'register'
        ,method:'post'
    }).then(res=>{
        if(res.data.code===200) {
            ElMessage.success(res.data.msg)
        }
       else {
            ElMessage.error(res.data.msg)
        }

    })
}