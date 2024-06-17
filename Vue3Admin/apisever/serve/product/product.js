const mysql=require('../../utils/mysql')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

const getProductListByBid=async(bid)=>{

    return await mysql.select('*','Product',`Bid=${bid}`)
}
module.exports={
    getProductListByBid
}