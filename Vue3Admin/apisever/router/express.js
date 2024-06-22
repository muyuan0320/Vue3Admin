/**
 * @description 这个文件用于创建一个express实例和配置中间件
 */
const config = require('config')
const express = require("express");
const jwts = require('jsonwebtoken')
const jwt = require('express-jwt')
const {selectUser} = require("../utils/mysql");
const app = express();
app.use(express.static('./public/www'))
app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({extended: false,limit:'100mb'}))
app.use(jwt.expressjwt({
    secret: config.get('JWTConfig.secret'),//密钥
    algorithms: ['HS256']
}).unless({
    path: ['/login', '/register','/forgetPassword','/businessList']
}))

const TokenErrorHandler = async (err, req, res, next) => {
    // 设置允许跨域的域名，*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With, x-refresh-token')
    res.header('Access-Control-Allow-Credentials', 'true');
    if (err.name === 'UnauthorizedError') {
        // 如果请求头中有Refresh Token，尝试刷新Access Token
        const refreshToken = req.headers['x-refresh-token'];
        if (!refreshToken) return res.status(400).send('Unauthorized');
        try {
            const decoded = jwts.verify(refreshToken, config.get('JWTConfig.secret'));
            if (decoded.type !== 'refresh') {
                throw new Error('Invalid token type');
            }
            const payload = await selectUser(decoded.payloads.username)
            const newAccessToken = jwts.sign(payload, config.get('JWTConfig.secret'), {expiresIn: config.get('JWTConfig.expiresIn')});
            return res.status(401).json({token: newAccessToken});
        } catch (err) {
            res.status(400).send('Unauthorized');
        }
    } else {
        next(err);
    }
}
app.use(TokenErrorHandler)
app.all('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With, x-refresh-token')
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    next()
})

module.exports = app