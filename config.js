const config = {
    mysqlInfo: {
        host: 'localhost',
        user: 'kevin',
        password: '123456',
        database: 'mywebsite',
        port: 3306
    },
    success: function (data = '') {
        return {
            code: 0,
            data: data,
            msg: 'success',
        }
    },
    errMsg: function (code, err) {
        return {
            code: code,
            data: '',
            msg: err,
        }
    }
}

module.exports = config
