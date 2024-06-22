const mysql=require('../../utils/mysql')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

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
        return await mysql.insertData('Product' ,data)

    }
    catch (error) {
        console.log(error)
        throw error
    }
}
const editProduct = async (data)=>{
    try {

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