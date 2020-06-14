var Router = require('koa-router');
var router = new Router();

require('./user')(router)

module.exports = router
