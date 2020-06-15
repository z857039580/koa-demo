const {res_success, err_system, res_warning} = require('../util/funcUtils');
const {sql_select, sql_findOrCreate} = require('../db');

const userTable = 'user';

exports.login = async (ctx) => {
    const result = await sql_select(userTable, ctx.request.body).catch(err => {
        ctx.body = err_system(err);
    });
    if (!result) return;

    if (result.length > 0 && result[0]['username'] === ctx.request.body.username) {
        ctx.body = res_success(result[0]);
    }
};

exports.register = async (ctx) => {
    const where_obj = {username: ctx.request.body.username};
    const result = await sql_findOrCreate(userTable, ctx.request.body, where_obj).catch(err => {
        ctx.body = err_system(err);
    });
    if (!result) return;

    if (result > 0) {
        return ctx.body = res_warning(1001, '用户名已存在');
    }
    ctx.body = res_success();
};
