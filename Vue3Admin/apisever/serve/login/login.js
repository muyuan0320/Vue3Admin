const mysql=require('../../utils/mysql')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

const login = async (data) =>{
    let flag;
   const res= await mysql.findPasswordByUsername(data)
    flag = await bcrypt.compare(data.password, res)
    const payloads =  await  mysql.selectUser(data.username)

    if (flag){
        return [jwt.sign(payloads, config.get('JWTConfig.secret'), {expiresIn: config.get('JWTConfig.expiresIn')}),jwt.sign({payloads,
        type:'refresh'}, config.get('JWTConfig.secret'), {expiresIn: config.get('JWTConfig.reFlushExpiresIn')})]
    }
    else return  false
}
module.exports = {
    login
}