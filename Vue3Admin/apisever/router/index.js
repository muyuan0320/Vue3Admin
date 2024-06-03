/**
 * @description 这个文件用来配置路由和express中间件
 * @autor MuYuan
 */
const register=require('../serve/register/register')
const login=require('../serve/login/login')
const config=require('config')
const jwt=require('jsonwebtoken')
const app=require('./express')
const mysql = require('../utils/mysql')
const {findPermissionByUsername} = require("../utils/mysql");
app.post('/register',async (req,result)=>{

    if (await mysql.userExist(req.body.username)) {
        register.register(req.body).then(res => {
            if (res) result.jsonp({
                msg: '注册成功',
                code: 200,
            })
            else result.jsonp({
                msg: '注册失败',
                code: 400,
            })
        })
    }
    else result.jsonp({
        msg: '用户名已存在',
        code: 400,
    })
})
app.post('/login', (req,result)=> {

   login.login(req.body).then(async res => {

       if (res) {
           const permission = await findPermissionByUsername(req.body.username)
           result.jsonp({
               result: [{
                   token: res[0],
                   reFleshToken: res[1],
                   permission: permission
               }],
               msg: '登录成功',
               code: 200
           })
       } else result.jsonp({
           result: [],
           msg: '登录失败',
           code: 400
       })


   })})
    app.get('/userInfo',(req,res)=>{
    res.jsonp (jwt.verify(req.query.token, config.get('jwtSecret')))
    })
    app.get('/', (req, res) => {
        res.send('hello world')
    })

module.exports=app