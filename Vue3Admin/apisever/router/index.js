/**
 * @description 这个文件用来配置路由和express中间件
 * @autor MuYuan
 */
const register = require('../serve/register/register')
const login = require('../serve/login/login')
const config = require('config')
const jwt = require('jsonwebtoken')
const app = require('./express')
const mysql = require('../utils/mysql')
const product = require("../serve/product/product");
const todo = require("../serve/todo/todo");
const {findPermissionByUsername, userExist} = require("../utils/mysql");
const business = require("../serve/business/business");
const admin =require("../serve/admin/admin");
const {businessInfo} = require("../serve/business/business");
const getInfo = (req) => {
    return jwt.verify(req.headers.authorization.split(' ')[1], config.get('JWTConfig.secret'))
}
const isAdmin = async (req)=>{
    const info = getInfo(req)
    const permissionGroup =  (await findPermissionByUsername(info.username))
    return !!permissionGroup.includes('Admin');
}
    app.post('/register', async (req, result) => {
try{
        if (await mysql.userExist(req.body.username)) {
            register.register(req.body).then(res => {
                if (res) result.jsonp({
                    msg: '注册成功', code: 200,
                })
                else result.jsonp({
                    msg: '注册失败', code: 400,
                })
            })
        } else result.jsonp({
            msg: '用户名已存在', code: 400,
        })}
        catch (err){
            result.jsonp({
                msg: '发生错误', code: 500
            })
        }
    })
    app.post('/login', (req, result) => {

        login.login(req.body).then(async res => {

            if (res) {
                const permission = await findPermissionByUsername(req.body.username)
                result.jsonp({
                    result: [{
                        token: res[0], reFleshToken: res[1], permission: permission
                    }], msg: '登录成功', code: 200
                })
            } else result.jsonp({
                result: [], msg: '登录失败', code: 400
            })


        }).catch(err => {
            console.log(err)
            result.jsonp({
                msg: '发生错误', code: 500
            })
        })
    })
    app.get('/getUserList',async (req, res) => {
       try {
           const payload = getInfo(req)
           if (payload.permissionGroupId===0) {
               const result = await mysql.selectUserAll()
               res.jsonp(result)
           }
           else res.status(40).jsonp({
               msg: '没有权限', code: 400
           })
             }
             catch (err){
                 res.jsonp({
                     msg: '获取失败', code: 400
                 })}
    })
    app.get('/userInfo', async (req, res) => {
        const payload = getInfo(req)
      try{  payload.roles = await findPermissionByUsername(payload.username)
        res.jsonp({
            userInfo: payload
        })
        }
        catch (err) {
            res.jsonp({
                msg: '获取失败', code: 400
            })
        }
    })
    app.get('/BusinessList', async (req, res) => {
        const result = await business.businessInfoAll()
        res.jsonp(result)
    })
    app.get('/productInfo', async (req, res) => {
        try {
            const result = await product.getProductListByBid(req.query.bid)
            res.jsonp(result)
        } catch (err) {
            res.jsonp({
                msg: '获取失败', code: 400
            })
        }


    })
app.post('/updateUserInfo',async(req,res)=>{
    try {

        if (await isAdmin(req)) {
               if (await userExist(req.body.username)&&req.body.username!==getInfo(req).username) res.jsonp({
                   msg: '用户名已存在', code: 400
               })
            else {
                   await admin.updateUserInfo(req.body)
                   res.jsonp({
                       msg: '修改成功', code: 200
                   })
               }
        }
        else new Error('没有权限')
    }
    catch (err) {
        res.jsonp({
            msg: '修改失败', code: 400
        })
    }
})
app.post('/addProduct',async (req,res)=>{
    try {
        const uid=getInfo(req).Uid
        const bid=(await business.businessInfoByUid(uid)).results[0].Bid
        const data={
            Bid:bid,
           ...req.body
        }
        await product.addProduct(data)
        res.jsonp({
            msg: '添加成功', code: 200
        })

    }
    catch (err) {
        res.jsonp({
            msg: '添加失败', code: 400
        })
    }
})
app.post('/editProduct',async (req,res)=>{
    try {
        const uid=getInfo(req).Uid
        const bid=(await business.businessInfoByUid(uid)).results[0].Bid
        const data={
            Bid:bid,
            ...req.body
        }
        await product.editProduct(data)
        res.jsonp({
            msg: '编辑成功', code: 200
        })

    }
    catch (err) {
        res.jsonp({
            msg: '编辑失败', code: 400
        })
    }

})
app.post('/createShop',async (req,res)=>{
    try {
        req.body.Uid=getInfo(req).Uid
      await business.createShop(req.body)
        res.jsonp({
            msg: '添加成功', code: 200
        })
    }catch (err) {
        res.jsonp({
            msg: '添加失败', code: 400
        })
    }
})
    app.get('/BusinessInfoByUid', async (req, res) => {

        try {
            const data = getInfo(req).Uid
            const result = await business.businessInfoByUid(data)
            res.jsonp(result)
        } catch (err) {
            res.jsonp({
                msg: '获取失败', code: 400
            })
        }

    })
// app.get('/BusinessInfo',async (req,res)=>{
//     const data= getInfo(req).Uid
//
//     res.jsonp(await business.businessInfo(data))
// })
    app.post('/uploadTodo', async (req, res) => {
        const data = {
            Uid: getInfo(req).Uid, todo: req.body.todo
        }
        try {
            await todo.insertTodo(data)
            res.jsonp({
                msg: '添加成功', code: 200
            })
        } catch (err) {
            res.jsonp({
                msg: '添加失败', code: 400
            })
        }

    })
    app.get('/getTodo', async (req, res) => {
        try {
            const result = {
                result: await todo.getTodo(getInfo(req).Uid), msg: '获取成功', code: 200
            }
            res.jsonp(result)
        } catch (err) {
            res.jsonp({
                msg: '获取失败', code: 400
            })
        }
    })
app.post('/removeUser',async (req,res)=>{
    try {
if (await isAdmin(req)) {

    await admin.removeUser(req.body.Uid)
    res.jsonp({
        msg: '删除成功', code: 200
    })
}else  new Error('没有权限')
    }catch (err)
    {res.jsonp({
        msg: '删除失败', code: 400
    })}
})
app.get('/getBusinessInfoByBid', async (req,res)=>{
    try{

      const result= ( await businessInfo(req.query.Bid))
        res.jsonp(result)
    }
    catch (err){
        res.jsonp({
            code:408,
            msg:'获取失败'
        })
    }
})
module.exports = app