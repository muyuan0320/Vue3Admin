const mysql=require('../../utils/mysql')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const {businessInfo} = require("../business/business");
const typeExit= async (bid,type)=>{
if (!(await businessInfo(bid)).results[0].Typelist)
{   const addTypeList={
    TypeList:(await businessInfo(bid)).results[0].Typelist+=`${type}`
}
    await mysql.updateData('Business',addTypeList,`Bid=${bid}`)

}
   return !((await businessInfo(bid)).results[0].Typelist.includes(type))
}
const getProductListByBid=async(bid)=>{
try{
    return await mysql.select('*','Product',`Bid=${bid}`)
}
    catch(err){
        console.log(err)
        throw err
    }
}
const addProduct = async (data)=>{
    try {
        if (await typeExit(data.Bid, data.type)) {

            const addTypeList={
                TypeList:(await businessInfo(data.Bid)).results[0].Typelist+=`,${data.type}`
            }
            await mysql.updateData('Business',addTypeList,`Bid=${data.Bid}`)
        }
        return await mysql.insertData('Product' ,data)

    }
    catch (error) {
        console.log(error)
        throw error
    }
}
const editProduct = async (data)=>{
    try {
        if (await typeExit(data.Bid, data.type)) {

            const addTypeList={
                TypeList:(await businessInfo(data.Bid)).results[0].Typelist+=`,${data.type}`
            }
            await mysql.updateData('Business',addTypeList,`Bid=${data.Bid}`)
        }
        return await mysql.updateData('Product' ,data,`Bid=${data.Bid} and Pid=${data.Pid}`)

    }
    catch (error) {
        console.log(error)
        throw error
    }
}
const removeProduct = async (data)=>{
    try {
        return await mysql.deleteData('Product' ,`Bid=${data.Bid} and Pid=${data.Pid}`)
    }
    catch (error) {
        console.log(error)
        throw error
    }
}
module.exports={
    getProductListByBid,
    addProduct,
    editProduct
}