const mysql = require('mysql');
const {mysqlInfo} = require('./config');
const _ = require('lodash');
const {err_reject} = require('./util/funcUtils');

const sql_pool = mysql.createPool(mysqlInfo);

const connection = () => {
    return new Promise(((resolve, reject) => {
        sql_pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                resolve(connection)
            }
        });
    }))
}

const queryResult = (connection, sql, values) => {
    return new Promise(((resolve, reject) => {
        connection.query(sql, values, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
            connection.release()
        })
    }))
}

const query = async (sql, values) => {
    const thisConnection = await connection().catch(err => {
        Promise.reject(err)
    });
    if (!thisConnection) return;

    return queryResult(thisConnection, sql, values)
}

const SQL_Params = (obj) => {
    let result = '';
    _.forOwn(obj, (value, key) => {
        result += key + '="' + value + '",'
    });
    return result.substring(0, result.length - 1)
}

const where_and = (obj) => {
    let result = '';
    _.forOwn(obj, (value, key) => {
        result += '`' + key + '` = "' + value + '" AND '
    });
    return result.substring(0, result.length - 5)
}

//查找新增
exports.sql_findOrCreate = async (table, data, whereObj) => {
    const result = await this.sql_select(table, whereObj).catch(err => err_reject(err));
    //出错result===undefined => err_reject()
    if (!result) return;

    //数据已存在, return result.length
    if(result.length > 0){
        return Promise.resolve(result.length);
    };

    return this.sql_insert(table, data);

}

//增
exports.sql_insert = (table, data) => {
    let sql = 'INSERT INTO ' + table + ' SET ' + SQL_Params(data);
    return query(sql)
}

//删
exports.sql_delete = (table, where) => {
    let sql = 'DELETE FROM ' + table + " WHERE " + where_and(where);
    return query(sql)
}

//改
exports.sql_update = (table, obj, where) => {
    let sql = 'UPDATE ' + table + ' SET ' + SQL_Params(obj) + ' WHERE ' + where_and(where);
    return query(sql)
}

//查
exports.sql_select = (table, where, keys) => {
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


