const mysql=require('../../utils/mysql')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

const updateUserInfo = async(data)=>{
    try {
        data.CreateTime = new Date(data.CreateTime).toISOString().slice(0, 19).replace('T', ' ');
        return await mysql.updateData('user',data,`Uid='${data.Uid}'`)
    }
    catch (err) {
        console.log(err)
        throw err
    }
}
const removeUser = async(data)=>{
    try {
        return await mysql.deleteData('user',`Uid='${data}'`)
    }
    catch (err) {
        console.log(err)
        throw err
    }
}
module.exports = {
    updateUserInfo,
    removeUser
}