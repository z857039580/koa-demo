exports.res_success = function (data = '', msg='success') {
    return {
        code: 0,
        data: data,
        msg: msg,
    }
};

exports.res_warning = function (code, msg) {
    return {
        code: code,
        data: '',
        msg: msg,
    }
}

exports.err_system = function (err) {//系统错误，数据库连不上，sql语法错误等
    return {
        code: 1000,
        data: '',
        msg: err,
    }
}

exports.err_reject = function (err) {
    return Promise.reject(err)
}
