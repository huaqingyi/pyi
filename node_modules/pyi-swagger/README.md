# pyi
## Quick Start
```
npm i pyi-swagger --save
```
### app use
```
import { SwaggerInjectService, Swagger } from 'pyi-swagger';

SwaggerInjectService.register();

import "reflect-metadata";
import Koa from 'koa';
import { useKoaServer } from "routing-controllers";
import { UserController } from "./controllers/user.controller";

const koa = new Koa();

Swagger.build('/swagger', koa);

const app: Koa = useKoaServer(koa, {
    cors: true,
    controllers: [UserController]
});

app.listen(3001);
```
### controller
```
import {
    request,
    summary,
    body,
    tags,
    path,
    description
} from 'pyi-swagger';
import { Get, Delete, Controller, Ctx } from 'routing-controllers';

const tag = tags(['User']);

const userSchema = {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true }
};

@Controller()
export class UserController {

    @Get('/user/register')
    @request('POST', '/user/register')
    @summary('register user')
    @description('example of api')
    @tag
    @body(userSchema)
    public async register(ctx) {
        const { name } = ctx.validatedBody;
        const user = { name };
        ctx.body = { user };
    }

    @Get('/user/login')
    @request('post', '/user/login')
    @summary('user login, password is 123456')
    @tag
    @body(userSchema)
    public async login(ctx) {
        const { name, password } = ctx.validatedBody;
        if (password !== '123456') throw new Error('wrong password');
        const user = { name };
        ctx.body = { user };
    }

    @Get('/user')
    @request('get', '/user')
    @summary('user list')
    @tag
    public async getAll(ctx) {
        const users = [{ name: 'foo' }, { name: 'bar' }];
        ctx.body = { users };
    }

    @Get('/user/:id')
    @request('get', '/user/:id')
    @summary('get user by id')
    @tag
    @path({ id: { type: 'string', required: true } })
    public async getOne(ctx) {
        const { id } = ctx.validatedParams;
        console.log('id:', id);
        const user = { name: 'foo' };
        ctx.body = { user };
    }

    @Delete('/user/:id/:ids')
    @request('DELETE', '/user/:id/:ids')
    @summary('delete user by id')
    @tag
    @path({ id: { type: 'string', required: true }, ids: { type: 'string', required: true } })
    public async deleteOne(@Ctx() ctx) {
        // console.log(ctx.validatedParams)
        // const { id } = ctx.validatedParams;
        // console.log('id:', id);
        // ctx.body = { msg: 'success' };
        return 111;
    }
}
```
### 注意事项
```
SwaggerInjectService.register(); // 一定要在 controller 加载之前

Swagger.build('/swagger', app); // 将 swagger service 中间件 use 到 app
```
### 修饰器参考
```
koa-swagger-decorator [https://github.com/Cody2333/koa-swagger-decorator.git]
```
### jsdoc 风格
```
// 参考 swagger-ui-koa [https://github.com/Darmikon/swagger-ui-koa.git]

SwaggerInjectService.register();

const options = {
    swaggerDefinition: {
      info: {
        title: 'API', // Title (required)
        version: '2.0.0', // Version (required)
      },
    },
    apis: [
      './src/module/swagger/swagger.yaml',
      './src/routes/*.js', // Path to the API docs from root
      './src/module/swagger/parameters.yaml'
    ],
};
Swagger.build('/swagger', app, options);
```
