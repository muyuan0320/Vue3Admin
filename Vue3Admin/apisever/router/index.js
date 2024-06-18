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
const product = require("../serve/product/product");
const todo=require("../serve/todo/todo");
const {findPermissionByUsername} = require("../utils/mysql");
const business = require("../serve/business/business");


const getInfo=(req)=>{
  return   jwt.verify( req.headers.authorization.split(' ')[1],config.get('JWTConfig.secret'))
}
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
    app.get('/userInfo', async (req,res)=>{
    const payload = getInfo(req)
        payload.roles=await findPermissionByUsername(payload.username)
        res.jsonp({
            userInfo:payload
        })


    })
app.get('/BusinessList', async (req,res)=>{
 const result=await business.businessInfoAll()

    res.jsonp(result)
})
app.get('/productInfo',async (req,res)=>{

    const result=await product.getProductListByBid(req.query.bid)
    res.jsonp(result)
})
app.post('/uploadTodo',async (req,res)=> {
        const data = {
            Uid: getInfo(req).Uid,
            todo: req.body.todo
        }
        try {
            const result = await todo.insertTodo(data)
        }
        catch (err) {
            res.jsonp({
                msg:'添加失败',
                code:400
            })
        }
        res.jsonp({
            msg:'添加成功',
            code:200
        })
    }
)
app.get('/getTodo',async (req,res)=>{
   try {
       const result={
           result:await  todo.getTodo(getInfo(req).Uid),
           msg:'获取成功',
           code:200
       }
       res.jsonp(result)
   }
   catch (err){
       res.jsonp({
           msg:'获取失败',
           code:400
       })
    }
})
module.exports=app