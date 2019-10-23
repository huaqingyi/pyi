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
import { PYIBootstrap, PYIApplication, PYIApplicationImpl, autowired } from 'pyi';
import { join } from 'path';
import { ScheduleComponent } from './components/schedule.component';
import { SwaggerInjectService, Swagger } from 'pyi-swagger';

@PYIBootstrap
export class Application extends PYIApplication implements PYIApplicationImpl {

    @autowired
    public schedule!: ScheduleComponent;

    constructor() {
        super();
        this.run([
            join(__dirname, '**/**.ts'),
            join(__dirname, '**/**.js')
        ]);
    }

    public async onInit() {
        SwaggerInjectService.register();
        console.log('onInit ...');
    }

    public async didLoad() {
        console.log('didLoad ...');
    }

    public async onInitComponent() {
        console.log('onInitComponent ...');
    }

    public async didInitComponent() {
        console.log('didInitComponent ...');
    }

    public async didMakeConfig() {
        console.log('didMakeConfig ...');
        Swagger.build('/swagger.io', this, {
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

    public async didRuntime() {
        console.log('didRuntime ...');
        await this.schedule.test();
    }
}

```

### validation 入参验证
```
import { IsString, MinLength, MaxLength, validateSync, IsNotEmpty } from 'class-validator';
import { Validation, PYIValidation } from 'pyi';
import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator';

@Validation
@swaggerClass()
export class LoginValidation extends PYIValidation {
    @IsString({ message: '请传入字符串 .' })
    @IsNotEmpty({ message: '用户名不能为空 .' })
    @MinLength(4, { message: '用户名最小长度大于4.' })
    @MaxLength(10, { message: '用户名最大长度10.' })
    @swaggerProperty({
        type: 'string',
        required: true,
        example: '1234',
        description: '用户名'
    })
    public username!: string;

    @IsString({ message: '请传入字符串 .' })
    @IsNotEmpty({ message: '密码不能为空 .' })
    @MinLength(6, { message: '密码最小长度大于6.' })
    @MaxLength(20, { message: '密码最大长度20.' })
    @swaggerProperty({
        type: 'string',
        required: true,
        example: '123123',
        description: '密码'
    })
    public password!: string;
}

```

### controllers
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
#### 路由继承于 routing-controllers [https://github.com/typestack/routing-controllers]
#### 提供所有 routing-controllers 包 中的修饰器, 均为自动注入
```
import {
    Controller, RequestMapping, RequestMappingMethod,
    PYIController, autowired, PYIExecption, PYIThrows,
    Res, QueryParams, Body, Ctx
} from 'pyi';
import { TestService } from '../services/test.service';
import { TestDto } from '../dto/test.dto';
import { Response, Context } from 'koa';
import { tags, request, summary, body, security } from 'pyi-swagger';
import send from 'koa-send';
import { join } from 'path';
import { LoginValidation } from '../validation/login.validation';
import { UserDto } from '../dto/user.info';

const tag = tags(['TestController']);
const userSchema = {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true }
};

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @RequestMapping({
        prefix: '/resource/*'
    })
    public async resource(@Ctx() ctx: Context) {
        this.dto = true;
        return await send(ctx, ctx.path, { root: join(__dirname, '../') });
    }

    @RequestMapping({
        prefix: '/favicon.ico'
    })
    public async favicon(@Ctx() ctx: Context) {
        this.dto = true;
        return await send(ctx, ctx.path, { root: join(__dirname, '../resource/static') });
    }

    @RequestMapping({
        prefix: '/login',
        methods: [RequestMappingMethod.POST]
    })
    @request(RequestMappingMethod.POST, '/login')
    @summary('login user auth jwt .')
    @body(LoginValidation.swaggerDocument)
    @tag
    public login(
        @Body({ validate: true }) loginForm: LoginValidation,
        @Res() response: Response,
        @Ctx() ctx: Context
    ): UserDto {
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                const result = {
                    id: 1,
                    username: 'test',
                    age: '1',
                    nikename: 'test',
                    email: 'test@email.com'
                };
                const { secret, token } = this.tokenConfig;
                response.append('token', this.token.sign(result, secret, token));
                return await result;
            }
        });
    }

    @RequestMapping({
        prefix: '/'
    })
    @request(RequestMappingMethod.GET, '/')
    @summary('test get index')
    @tag
    public index(): TestDto {
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                return await 'Hello PYI ...';
            }
        });
    }

    @RequestMapping({
        prefix: '/error'
    })
    public err(): TestDto {
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                this.errno = 1000;
                this.errmsg = 'test error ...';
                throw new Error('test error');
                return await 'Hello PYI ...';
            }
        });
    }

    @RequestMapping({
        prefix: '/info',
        methods: [RequestMappingMethod.POST]
    })
    @request(RequestMappingMethod.POST, '/info')
    @security([{ api_key: [] }])
    @summary('test token')
    @tag
    public info(
        @Ctx() ctx: Context
    ): UserDto {
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                return ctx.state;
            }
        });
    }

    @RequestMapping({
        prefix: '/test',
        // methods: [RequestMappingMethod.GET]
    })
    public async test(
        @QueryParams() gets: any
    ) {
        // console.log(await this.service.findAllUsers());
        return await 'Hello World ...';
    }
}
```

### Dto(Vo) ObjectView层 数据操作层
```
import { Dto, PYIDto } from 'pyi';

export interface UserInfo {
    id: number;
    username: string;
    age: string;
    nikename: string;
    email: string;
}

@Dto
export class UserDto extends PYIDto {
    public err!: boolean;
    public data!: UserInfo;
}
```

### model
#### 这里使用的是 sequelize-typescript [https://github.com/RobinBuschmann/sequelize-typescript]
```
iimport { Table, Column, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Model } from 'sequelize-typescript';

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
import { Service, PYIService, autowired } from 'pyi';
import { DBComponent } from '../components/db.component';
import { User } from '../models/user.model';

@Service
export class TestService extends PYIService {

    @autowired
    public db!: DBComponent;

    public async findAllUsers() {
        return await this.db.table(User).findAll().then((row: any) => {
            return row.map((resp: any) => resp.toJSON());
        });
    }

    public async findUser() {
        let data: any = {};
        [data] = await this.db.instance().query(`SELECT * FROM test1`);
        return data;
    }
}
```

### components
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
#### 自动化构建外部包
```
import { Component, PYIComponent, autowired } from 'pyi';
import { Sequelize, SequelizeOptions, ModelCtor } from 'sequelize-typescript';
import { DBConfiguration } from '../config/database.config';

// @Component<SequelizeOptions>({
//     dialect: 'mysql',
//     replication: {
//         read: [
//             { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
//         ],
//         write: { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
//     },
//     pool: {
//         max: 20,
//         idle: 60 * 1000
//     }
// })

@Component
export class DBComponent extends PYIComponent<DBConfiguration> {

    @autowired
    public props!: DBConfiguration;

    public db: Sequelize;

    constructor(props: SequelizeOptions) {
        super(props);
        this.db = new Sequelize(props);
    }

    public instance() {
        return this.db;
    }

    public table(model: ModelCtor): ModelCtor {
        this.db.addModels([model]);
        return this.db.model(model);
    }
}
```

### 启动项目
#### ts-node 启动
```
npm run start
```
##### nodemon 开始运行项目, 热更新, 适合dev开发
##### Think You ...

