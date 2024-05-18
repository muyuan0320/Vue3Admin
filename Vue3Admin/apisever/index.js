const express = require('express')
const mysql =require('./utils/mysql')
const app=require('./router')
const selectUserALL=mysql.selectUserAll
const port=3000
app.listen(port,()=>{
    console.log('sever is running on port '+port)
})


