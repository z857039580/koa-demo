const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');


const app = new Koa();

app.use(bodyParser());
app.use(cors());


const router = require('./routers')

app.use(router.routes());


app.listen(3000);



