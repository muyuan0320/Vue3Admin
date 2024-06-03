/**
 * @description 这个文件用来配置路由和express中间件
 * @autor MuYuan
 */
const register=require('../serve/register/register')
const login=require('../serve/login/login')
const config=require('config')
const jwt=require('jsonwebtoken')
const app=require('./express')
const {findPermissionByUsername, selectUser} = require("../utils/mysql");


app.post('/register',(req,result)=>{
    console.log(req.body)
    register.register(req.body).then(res=>{
       if (res)  result.jsonp({
           msg: '注册成功',
           code: 200,
       })
        else   result.jsonp({
           msg: '注册失败',
           code: 400,
       })
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
    app.get('/', (req, res) => {
        res.send('hello world')
    })
    app.get('/refreshToken',async (req,res)=>{
       const payload=await selectUser(req.body.username)
       return  jwt.sign(payload,config.get('JwtConfig.secret'), {expiresIn:config.get('JwtConfig.expiresIn')})
    })

module.exports=app