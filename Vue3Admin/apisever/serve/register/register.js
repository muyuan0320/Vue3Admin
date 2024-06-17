const mysql=require('../../utils/mysql')
const nanoid = require('nanoid')
const bcrypt = require('bcrypt')


const register= async (data)=>{

   //构造最终使用的json对象
   const registerData={
      uid:nanoid.nanoid(),
      username:data.username,
      password:await bcrypt.hash(data.password,10),
      createTime:new Date().toLocaleDateString(),
      permissionGroupId:2,
      email:data.email,
      phone:data.phone,
      isHaveExtraPermission:0,
   }

  return  mysql.regist(registerData).then(res=>{
      console.log(res)
         return true
   }).catch(err=>{
      console.log(err)
  return false
   })



}
module.exports={
   register
}