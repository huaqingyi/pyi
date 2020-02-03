###### <sup>（PYI Typescript Framework）</sup><br>（PYI JS）<br>──<br><br>`Commonjs/1.2.9`<br><br><br><br><br>**huaqingyi**<br>*COPYRIGHT © XXXXX. ALL RIGHTS RESERVED.*
[TOC]

# pyi
This Typescript MVC Server Framework ...
轻量级 restful 快速开发

## Quick Start
### npm i -g pyi-cli
```
$ pyi -h
  Usage: pyi [options] [command]
  
  Commands:
    create   create new project ...
    help     Display help
    version  Display version
  
  Options:
    -h, --help     Output usage information
    -v, --version  Output the version number

$ pyi create test
$ cd test 
$ npm run start
```

### 编译部署工具可选用 gyi 或 pm2 和 nodemon
#### src/application.ts 程序入口
```
import { PYIBootstrap, PYIApplication } from 'pyi';

@PYIBootstrap
export class Application extends PYIApplication<any, any> {
}
```
#### PYIApplication Hooks
```
/**
 * Application init
 */
export interface PYIOnInit {
    onInit: () => any;
}
/**
 * 开始扫描文件
 */
export interface PYIOnScanInit {
    onScanInit: () => any;
}
/**
 * 发现项目文件
 */
export interface PYIOnScanChange {
    onScanChange: () => any;
}
/**
 * 添加扫描的文件完成
 */
export interface PYIOnScanAfter {
    onScanAfter: () => any;
}
/**
 * 初始化 Application 配置
 */
export interface PYIOnConfigurationInit {
    onConfigurationInit: () => any;
}
/**
 * 配置初始化完成
 */
export interface PYIOnConfigurationAfter {
    onConfigurationAfter: (config: PYIAppConfiguration) => any;
}
/**
 * 初始化 Application 完成
 */
export interface PYIOnInitApplication {
    onInitApplication: () => any;
}
/**
 * install plugins
 */
export interface PYIOnPluginApplication {
    onPluginApplication: (plugins: PYICoreClass<PYIPlugins>) => any;
}

// demo 

import { PYIBootstrap, PYIApplication } from 'pyi';

@PYIBootstrap
export class Application extends PYIApplication<any, any> implements PYIOnInit {
    public onInit() {
        console.log('Application OnInit ...');
    }
}
```

### dao层 入参验证
```
import { Dao, PYIDao } from 'pyi';
import { IsString, IsNotEmpty } from 'class-validator';
// import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator';

@Dao
// 这里可以使用 pyi-swagger 生成说明文档
// @swaggerClass()
export class LoginDao extends PYIDao {
    
    @IsString()
    @IsNotEmpty()
    // @swaggerProperty({
    //     type: 'string',
    //     required: true,
    //     example: '1234',
    //     description: '用户名'
    // })
    public username!: string;
    
    @IsString()
    @IsNotEmpty()
    // @swaggerProperty({
    //     type: 'string',
    //     required: true,
    //     example: '123123',
    //     description: '密码'
    // })
    public password!: string;
}

@RequestMapping({
    prefix: '/login',
    methods: [RequestMappingMethod.POST]
})
// swagger 方法及路径配置
@request(RequestMappingMethod.POST, '/login')
// swagger 说明
@summary('login user auth jwt .')
// 请用 swagger
@body((LoginDao as any).swaggerDocument)
// 开启 jwt auth 验证
@security([{ api_key: [] }])
@tag
public login(
    @Body({ validate: true }) login: LoginDao
): ResponseDto {
    return PYIExecption(class extends PYIThrows<TestController> {
        public async throws(this: TestController) {
            return 'test ...';
        }
    });
}
```

### controllers
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
#### 路由继承于 routing-controllers [https://github.com/typestack/routing-controllers]
#### 提供所有 routing-controllers 包 中的修饰器, 均为自动注入
```
import { 
    Controller, PYIController, RequestMapping, 
    autoconnect, RequestMappingMethod, 
    Body, PYIExecption, PYIThrows 
} from 'pyi';
import { TestService } from '../services/test.service';
import { LoginDao } from '../dao/test/login.dao';
import { ResponseDto } from '../dto/response.dto';
import { tags, request, summary, body } from 'pyi-swagger';

const tag = tags(['TestController']);

@Controller
export class TestController extends PYIController {

    @autoconnect
    public service!: TestService;

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET]
    })
    public async test() {
        this.logger.error(1111);
        console.log(111);
        console.log(await this.service.findAll());
        throw new Error('测试');
        return 111;
    }

    @RequestMapping({
        prefix: '/error'
    })
    public error(): ResponseDto {
        return PYIExecption(class extends PYIThrows<TestController> {
            public async throws(this: TestController) {
                console.log(await this.service.test());
                return 'test ...';
            }
        });
    }

    @RequestMapping({
        prefix: '/login',
        methods: [RequestMappingMethod.POST]
    })
    @request(RequestMappingMethod.POST, '/login')
    @summary('login user auth jwt .')
    @body((LoginDao as any).swaggerDocument)
    @tag
    // 注意这里的 ResponseDto 会通过反射自动实例化
    // 返回结果为 ResponseDto { success: true, data: 'test ...' }
    // 发生错误自动调用 dto 的 throws 方法后 return dto 实例
    public login(
        @Body({ validate: true }) login: LoginDao
    ): ResponseDto {
        return PYIExecption(class extends PYIThrows<TestController> {
            public async throws(this: TestController) {
                return 'test ...';
            }
        });
    }
}
```

### Dto(Vo) ObjectView层 数据操作层
```
import { Dto, PYIDto } from 'pyi';

@Dto
export class ResponseDto extends PYIDto {
    public data: any;
    public success: boolean;
    public errcode?: number;
    public errmsg?: string;

    constructor(data: any) {
        super();
        this.data = data;
        this.success = true;
    }

    // 失败后自动回调
    // controller 可通过 returntype 和 PYIExecption 自动 try catch dto
    public throws(errors: Error) {
        this.success = false;
        switch (errors.name) {
            default:
                this.errcode = 1010;
                this.errmsg = errors.message;
                return this;
        }
    }
}
```

### model
#### 这里使用的是 sequelize-typescript [https://github.com/RobinBuschmann/sequelize-typescript]
```
import { Table, Column, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Model } from 'sequelize-typescript';

@Table({
    tableName: 'test'
})
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id!: number;

    @Column
    public name!: string;

    @CreatedAt
    public readonly created_at!: Date;

    @UpdatedAt
    public readonly updated_at!: Date;
}
```

### services
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
```
import { Service, PYIService, autoconnect } from 'pyi';
import { Database } from '../components/database';
import { User } from '../models/user';

@Service
export class TestService extends PYIService {

    @autoconnect
    public db!: Database;

    public async findAll() {
        return this.db.table(User).findAll({ raw: true });
    }

    public async test() {
        throw new Error('测试 Service Error ...');
        return await { name: 'Hello World ...' };
    }
}
```

### components
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
#### 自动化构建外部包
```
import { Component, PYIComponent, autoconnect } from 'pyi';
import { Sequelize, ModelCtor } from 'sequelize-typescript';
import { DataBaseConfiguration } from '../config/database.config';

@Component
export class Database extends PYIComponent<DataBaseConfiguration> {

    @autoconnect
    public props!: DataBaseConfiguration;

    public database: Sequelize;

    constructor() {
        super();
        this.database = new Sequelize(this.props);
    }

    public i() {
        return this.database;
    }

    public table(model: ModelCtor): ModelCtor {
        this.database.addModels([model]);
        return this.database.model(model);
    }

    public test() {
        return 'test component ...';
    }
}
```

### middlewares 中间件
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
#### 自动化构建外部包
```
import { PYIMiddleware, Middleware, KoaMiddlewareInterface } from 'pyi';
import { Context } from 'koa';

@Middleware({ type: 'before', priority: 0 })
export class JWTMiddleware extends PYIMiddleware implements KoaMiddlewareInterface {
    public async use(ctx: Context, next: () => any) {
        await next();
    }
}
```

### middlewares 中间件
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
#### 自动化构建外部包
```
import { PYIMiddleware, Middleware, KoaMiddlewareInterface } from 'pyi';
import { Context } from 'koa';

@Middleware({ type: 'before', priority: 0 })
export class JWTMiddleware extends PYIMiddleware implements KoaMiddlewareInterface {
    public async use(ctx: Context, next: () => any) {
        await next();
    }
}
```

### plugins 安装中间件插件
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
#### 自动化构建外部包
```
import { PYIPlugin, AutoPlugin, PYIPluginsAppInstall } from 'pyi';
import { SwaggerInjectService, Swagger } from 'pyi-swagger';

@AutoPlugin
export class SwaggerPlugins extends PYIPlugin implements PYIPluginsAppInstall {
    public async init() {
        SwaggerInjectService.register();
        return await Swagger.build('/swagger.io', this.app, {
            info: {
                description: 'PYI Swagger 测试用例',
                title: 'PYI Swagger 测试用例'
            },
            securityDefinitions: {
                api_key: {
                    type: 'apiKey',
                    name: 'authorization',
                    in: 'header'
                }
            }
        });
    }
}
```

### 启动项目
#### ts-node 启动
```
npm run start
```
### 启动发布
#### gulp 编译
```
npm run build
```
##### nodemon 开始运行项目, 热更新, 适合dev开发
##### Think You ...
### 特别鸣谢 [routing-controllers] https://github.com/typestack/routing-controllers.git
### 特别鸣谢 [koa] https://github.com/koajs/koa.git
### 特别鸣谢 [sequelize] https://github.com/RobinBuschmann/sequelize-typescript.git
