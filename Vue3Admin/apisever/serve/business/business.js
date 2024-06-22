const mysql=require('../../utils/mysql')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const businessInfo = async(bid)=>{
  try{  return  await mysql.select('*','Business',`bid=${bid}`)}
    catch (e){
      console.log(e)
      throw e
    }

}
const businessInfoByUid = async(Uid)=>{
    try{    return  await mysql.select('*','Business',`Uid='${Uid}'`)}
    catch(e){
        console.log(e)
        throw e
    }
}
const createShop=async (data)=>{
    try {
        await mysql.insertData('Business', data)
    }catch (e) {
        console.log(e)
        throw e
    }
}
const businessInfoAll= async ()=>{
    try{ return await  mysql.select('*','Business')}
    catch(e){
        console.log(e)
        throw e
    }

}

module.exports={
    businessInfo,
    businessInfoAll,
    businessInfoByUid,
    createShop
}