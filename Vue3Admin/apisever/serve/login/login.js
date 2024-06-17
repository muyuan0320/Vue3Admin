const mysql=require('../../utils/mysql')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

/**
 * 异步函数：处理用户登录
 * @param {Object} data - 包含用户名和密码的对象
 * @returns {boolean | Array} - 如果登录失败返回false，如果登录成功返回一个包含访问令牌和刷新令牌的数组
 */
const login = async (data) => {
    // 通过用户名查找数据库中的密码
    const res = await mysql.findPasswordByUsername(data)
    // 如果找不到对应的密码记录，表示用户名不存在，直接返回登录失败
    if (!res) return false
    // 查询数据库中对应的用户信息
    const payloads = await mysql.selectUser(data.username)
    // 使用bcrypt比对输入的密码和数据库中的密码是否一致
    if (await bcrypt.compare(data.password, res))  {// 如果密码比对成功
        // 生成访问令牌和刷新令牌，用于用户身份验证和令牌刷新
        // 返回一个包含访问令牌和刷新令牌的数组
        return [
            jwt.sign(payloads, config.get('JWTConfig.secret'), {expiresIn: config.get('JWTConfig.expiresIn')}),
            jwt.sign({payloads, type:'refresh'}, config.get('JWTConfig.secret'), {expiresIn: config.get('JWTConfig.reFlushExpiresIn')})
        ]
    }
    // 密码比对失败，返回登录失败
    else return false
}

module.exports = {
    login
}