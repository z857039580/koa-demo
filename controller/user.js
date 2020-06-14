const config = require('../config')
const db = require('../db')

const userTable = 'user'

exports.login = async function (ctx) {
    await db.select(userTable, ctx.request.body).then(function (data) {
        if (data.length > 0) {
            ctx.body(config.success(data[0]))
        } else {
            ctx.body(config.errMsg(1001, '用户不存在或账号密码有误'))
        }
    }, err => {
        ctx.body(err)
    })
}
exports.register = async function (ctx) {
    await db.findOrCreate(userTable, ctx.request.body, {username: ctx.request.body.username}).then(function (result) {
        if (!result) {
            ctx.body(config.errMsg(1002, '用户名已存在'))
        } else {
            ctx.body(config.success())
        }
    }, err => {
        ctx.body(err)
    })
}
