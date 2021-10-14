import Koa from 'koa';
import { createServer, IncomingMessage, ServerResponse } from 'http';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
const app = new Koa();
app.use(async (ctx, next) => {
    ctx.body = { admin: 111 };
    return await next();
});

createServer().on('connection', socket => {
    console.log(111);
    socket.on('data', data => {
        console.log(1111, data.toString());
        socket.write(Buffer.from(JSON.stringify({ admin: 111 })));
    });
}).listen(3000);
