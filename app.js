const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());

const router = require('./routers')
app.use(router.routes());


app.use(async ctx => {
    ctx.body = 'Hello 1111 World';
});

app.listen(3000);



