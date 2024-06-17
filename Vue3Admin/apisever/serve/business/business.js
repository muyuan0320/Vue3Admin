const mysql=require('../../utils/mysql')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const businessInfo = async(bid)=>{
   return  await mysql.select('*','Business',`bid=${bid}`)
}
const businessInfoAll= async ()=>{
 return await  mysql.select('*','Business')
}

module.exports={
    businessInfo,
    businessInfoAll
}