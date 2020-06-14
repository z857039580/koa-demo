const Router = require('koa-router');
const router = new Router();

require('./router/user')(router)

module.exports = router
