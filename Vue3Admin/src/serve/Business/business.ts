import {request} from "@/utils/service";
import {ElMessage} from "element-plus";
export const createShop = async (data: any) => {
 const res=   (await request({
        url: 'createShop',
        method: 'post',
        data: data
    }))
    ElMessage({
        type: 'success',
        message: res.data.msg
    })
  return
}
export const removeProducts = async (data: any) => {
    const res=   (await request({
        url: 'removeProduct',
        method: 'post',
        data: data
    }))
    ElMessage({
        type: 'success',
        message: res.data.msg
    })
  return res
}
export const addProducts = async (data: any) => {
    const res=   (await request({
        url: 'addProduct',
        method: 'post',
        data: data
    }))
    ElMessage({
        type: 'success',
        message: res.data.msg
    })
  return res
}
export const EditProduct = async (data: any) => {
    const res=   (await request({
        url: 'editProduct',
        method: 'post',
        data: data
    }))
    ElMessage({
        type: 'success',
        message: res.data.msg
    })
  return res
}