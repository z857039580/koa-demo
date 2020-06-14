const mysql = require('mysql');
const config = require('./config')
const _ = require('lodash')

const SQL_Params = (obj) => {
    let result = '';
    _.forOwn(obj, function (value, key) {
        result += key + '="' + value + '",'
    });
    return result.substring(0, result.length - 1)
}
const where_and = (obj) => {
    let result = '';
    _.forOwn(obj, function (value, key) {
        result += '`' + key + '` = "' + value + '" AND '
    });
    return result.substring(0, result.length - 4)
}

const pool = mysql.createPool(config.mysqlInfo);

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('---1111', err)
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}


const DATABASE = {

    //查找新增
    findOrCreate: (table, data, whereObj) => {
        let selectSql = 'SELECT * FROM ' + table + ' WHERE ' + where_and(whereObj);

        return new Promise((resolve, reject) => {
            query(selectSql).then(function (res) {
                /*数据已存在*/
                if (res.length > 0) {
                    return resolve(false)
                }
                let createSql = 'INSERT INTO ' + table + ' SET ' + SQL_Params(data);
                query(createSql).then(function (resp) {
                    return resolve(true)
                }, function (err) {
                    reject(err)
                })
            }, function (err) {
                reject(err)
            })
        })
    },

    //增
    insert: (table, data) => {
        let sql = 'INSERT INTO ' + table + ' SET ' + SQL_Params(data);
        return query(sql)
    },

    //删
    del: (table, where) => {
        let sql = 'DELETE FROM ' + table + " WHERE " + where_and(where);
        return query(sql)
    },

    //改
    update: (table, obj, where) => {
        let sql = 'UPDATE ' + table + ' SET ' + SQL_Params(obj) + ' WHERE ' + where_and(where);
        return query(sql)
    },

    //查
    select: (table, where, keys) => {
        //判断是选所有的还是选一部分的
        keys == undefined ? keys = "*" : keys = keys.join(',');
        let sql;
        if (where) {
            sql = 'SELECT * FROM ' + table + ' WHERE ' + where_and(where);
        } else {
            sql = 'SELECT ' + keys + ' FROM ' + table;
        }
        return query(sql)
    }
}


module.exports = DATABASE;
