# pyi

This Typescript MVC Server Framework ...
轻量级 restful 快速开发

## Quick Start

### npm i pyi typescript --save && npm i -g pyi

#### Command
```
  Usage: pyi [options] [command]

  Commands:
    create   create new project ...
    help     Display help
    run      run appliaction ...
    version  Display version

  Options:
    -h, --help     Output usage information
    -v, --version  Output the version number

```

#### Create Application
```
pyi create pyi-test
cd pyi-test && npm i

pyi run src/application.ts
或
npm run serve 开发模式
npm run rserve runtime 开发模式
npm run prod production 模式
自定义模式
node runtime/application.js -h
或
ts-node src/application.ts -h

Usage: application.ts [options] [command]

Commands:
help     Display help
version  Display version

Options:
-h, --help          Output usage information
-m, --mode [value]  The application running type, default is development [development, production, ${your mode}] (defaults to "development")
-p, --port          The application listen port, default app config
-r, --runtime       The application runing build to es5, default app config .
-v, --version       Output the version number
-w, --watch         The application running watch, default app config
```

#### src/application.ts 程序入口

```
import { PYIBootstrap, PYIApplication } from 'pyi';

@PYIBootstrap
export class Application extends PYIApplication {
    public static main(args: string[]) {
        /**
         * 指定项目路径
         */
        Application.runtime(__dirname);
    }
}
```

##### ts-node src/application.ts -h || node -r ts-node/register src/application.ts -h

```
  Usage: application.ts [options] [command]

  Commands:
    help     Display help
    version  Display version

  Options:
    -h, --help          Output usage information 帮助
    -m, --mode [value]  The application running type, default is development [development, production, ${your mode}] (defaults to "development") 开发模式, 自动更具开发模式自动注入 configuration 类 . 默认模式为 development 开发模式
    -p, --port <n>      The application listen port, default app config or 4003 (defaults to 4003) 监听端口, 默认 4003, 也可以在configuration 中设置, 取用顺序 command port > configuration port > default port
    -r, --runtime       The application runing build to es5 . (disabled by default) 是否编译成 es5 后再以 es5 直接启动, 可在 configuration 中设置
    -v, --version       Output the version number 版本号
    -w, --watch         The application running watch, default false (disabled by default) 是否热更新, 可在 configuration 中设置
```

## Configuration 含有 PYIAutoAppConfiguration[自动反射系统配置] 和 PYIAutoConfiguration[自动反射应用配置]

### PYIAutoAppConfiguration 自动反射当前 mode 对应的 系统配置, 参考如下配置

#### src/config/app/app.config.ts

```
import { AppConfigOption, Configuration, autowired, PYIAutoAppConfiguration } from 'pyi';
import { Development } from './development';
import { Production } from './production';
import { join } from 'path';

/**
 * 这里可以通过注解注入
 * 也可以直接赋值
 */
@Configuration
export class AppConfiguration extends PYIAutoAppConfiguration<any> {
    /**
     * 注解注入
     */
    @autowired
    public development!: Development;
    @autowired
    public production!: Production;

    /**
     * 赋值注入
     */
    // public usemode: AppConfigOption;

    constructor(config: AppConfigOption, props: any) {
        super(config, props);

        this.development.output = join(config.entry, '../runtime');
        this.production.output = join(config.entry, '../runtime');

        /**
         * 赋值注入
         */
        // this.usemode = new AppConfigOption();
    }
}
```

#### src/config/app/development.ts

#### src/config/app/production.ts

```
import { AppConfigOption, Configuration } from 'pyi';

@Configuration
export class Development extends AppConfigOption {
    constructor() {
        super();
        this.server.port = 4004;
    }
}
```

##### @autowired 注入下会自动返回当前 mode 模式所用的 config, 如 mode 为 production 则使用 AppConfiguration 的 production

### PYIAutoConfiguration @autowired 时自动反射当前 mode 对应的 应用配置

#### src/config/database/database.config.ts

```
import { Configuration, PYIAutoConfiguration } from 'pyi';
import { SequelizeOptions } from 'sequelize-typescript';

@Configuration
export class DataBaseConfiguration extends PYIAutoConfiguration<any> {

    public default: SequelizeOptions;

    constructor() {
        super();
        this.default = {};
        this.default.dialect = 'mysql';
        this.default.replication = {
            read: [
                { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
            ],
            write: { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
        };
        this.default.pool = {
            max: 20,
            idle: 60 * 1000
        };
    }
}
```

### 如果配置中没有对应 mode 下的配置, 将会直接启用 default

## Component 一些辅助库, 如 sequelize 等

### PYIComponent 当修饰器 Component 中传入 option 时, 会自动注入到 PYIComponent 的 props 以及 constructor 中

#### src/components/database.ts

```
import { Component, PYIComponent, autowired } from 'pyi';
import { Sequelize, SequelizeOptions, ModelCtor } from 'sequelize-typescript';
import { DataBaseConfiguration } from '../config/database/database.config';

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
export class DataBase extends PYIComponent<DataBaseConfiguration> {

    @autowired
    public props!: DataBaseConfiguration;

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

### 可以扩展任何你需要的包

## Controller

### 继承于 routing-controllers [https://github.com/typestack/routing-controllers]

#### src/controller/test.controller.ts

```
import { Controller, RequestMapping, RequestMappingMethod, autowired, PYIController } from 'pyi';
import { TestService } from '../service/test.service';
import { Nest } from '../components/nest';

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @autowired
    public nest!: Nest;

    @RequestMapping({
        prefix: '/'
    })
    public async index() {
        console.log(this.service);
        console.log(this.nest.merge());
        return await 'Hello World ...';
    }

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET, RequestMappingMethod.POST]
    })
    public async test() {

        const data = await this.service.testFindAll();
        console.log(`findAll: `, data);

        const data1 = await this.service.testQuery();
        console.log(`test query: `, data1);

        return await 'Hello World For Test ...';
    }
}
```

### Vo 层自动捕获

#### src/vo/test.vo.ts

```
import { PYIVo, Vo } from 'pyi';

@Vo
export class TestVo extends PYIVo {
    public err!: boolean;
    public data!: any;
}
```

#### src/vo/test.vo.ts 字段自定义

```
import { PYIVo, Vo } from 'pyi';

@Vo
export class TestVo extends PYIVo {
    public error!: boolean;
    public result!: any;
    public errorMsg!: any;

    constructor(data?: any) {
        super();
        this.error = false;
        this.result = data || {};
    }

    public async throws(err: Error, errno?: number, errmsg?: string) {
        this.error = true;
        this.errno = errno || 1003;
        if (errmsg) {
            this.errorMsg = errmsg;
            console.error(err);
        } else {
            this.errorMsg = `${err.name}${err.message}${err.stack ? `(${err.stack})` : ''}`;
        }
        this.result = {};
        return this;
    }
}
```

#### src/controller/test.controller.ts

```
import {
    RequestMappingMethod, autowired,
    Controller, RequestMapping,
    Ctx, Req, Res, Params, Body,
    PYIExecption, PYIThrows,
    PYIController
} from 'pyi';
import { TestService } from '../service/test.service';
import { Nest } from '../components/nest';
import { TestVo } from './../vo/test.vo';
import { Context, Request, Response } from 'koa';

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @autowired
    public nest!: Nest;

    @RequestMapping({
        prefix: '/'
    })
    public async index() {
        // tslint:disable-next-line:max-classes-per-file
        return TestController.Execption(class extends TestController implements PYIThrows {
            public async throws() {
                console.log(this.service);
                console.log(this.nest.merge());
                return await 'Hello World ...';
            }
        }, TestVo);
    }

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET, RequestMappingMethod.POST]
    })
    public test(
        @Ctx() ctx: Context,
        @Req() req: Request,
        @Res() res: Response,
        @Params() params: any,
        @Body() body: any
    ): TestVo {
        // tslint:disable-next-line:max-classes-per-file
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                this.errno = 1004;
                this.errmsg = 'service query findAll sql err.';
                let data = await this.service.testFindAll();
                console.log('all', data);
                this.errno = 1005;
                this.errmsg = 'service query test sql err.';
                data = await this.service.testQuery();
                this.errno = 1006;
                this.errmsg = 'service query test sql success try err.';
                throw new Error('test ...');
                return data;
            }
        });
    }
}
```

#### 自动生成 ViewObjec 类型数据, 并且自动捕获异常, 异常可以自定义 code 与 message

```
自动捕获返回的异常
{"err":true,"data":{},"errno":1005,"errmsg":"service query test sql err."}
自动map的viewobject
{"err":false,"data":"Hello World ..."}
```

### 支持所有 routing-controllers 包扩展 . Middleware 修饰的基类为 PYIMiddleware, Interceptor 修饰器基类为 PYIInterceptor

## Model

### 使用 sequelize [https://sequelize.org/master/manual/typescript.html]

#### src/model/test.model.ts

```
import { Table, Column, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Model } from 'sequelize-typescript';

@Table({
    tableName: 'test'
})
export class Test extends Model<Test> {

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

### 完全使用 sequelize 也可自行更换

## Service

#### src/service/test.service.ts

```
import { Service, autowired, PYIService } from 'pyi';
import { DataBase } from '../components/database';
import { Test } from '../model/test.model';

@Service
export class TestService extends PYIService {

    @autowired
    public db!: DataBase;

    public async testFindAll() {
        return await this.db.table(Test).findAll().then((row) => {
            return row.map((resp) => resp.toJSON());
        });
    }

    public async testQuery() {
        const [data] = await this.db.instance().query(`SELECT * FROM test`);
        return data;
    }
}
```

#### src/service/test.service.ts 自动捕获 1

```
import { Service, autowired, PYIService, PYIThrows } from 'pyi';
import { DataBase } from '../components/database';
import { Test } from '../model/test.model';

@Service
export class TestService extends PYIService {

    @autowired
    public db!: DataBase;

    public async testFindAll() {
        // tslint:disable-next-line:max-classes-per-file
        return TestService.Execption(class extends TestService implements PYIThrows {
            public async throws() {
                throw new Error('不开心 ...');
                return await this.db.table(Test).findAll().then((row) => {
                    return row.map((resp) => resp.toJSON());
                });
            }
        });
        return await this.db.table(Test).findAll().then((row) => {
            return row.map((resp) => resp.toJSON());
        });
    }

    public async testQuery() {
        let data: any = {};
        [data] = await this.db.instance().query(`SELECT * FROM test1`);
        return data;
    }
}
```

#### src/service/test.service.ts 自动捕获 2

```
import { Service, autowired, PYIService, PYIThrows, PYIExecption, throws } from 'pyi';
import { DataBase } from '../components/database';
import { Test } from '../model/test.model';

@Service
export class TestService extends PYIService {

    @autowired
    public db!: DataBase;

    @throws
    public async testFindAll() {
        // tslint:disable-next-line:max-classes-per-file
        return PYIExecption(class extends TestService implements PYIThrows {
            public async throws() {
                throw new Error('不开心 ...');
                return await this.db.table(Test).findAll().then((row) => {
                    return row.map((resp) => resp.toJSON());
                });
            }
        });
        return await this.db.table(Test).findAll().then((row) => {
            return row.map((resp) => resp.toJSON());
        });
    }

    public async testQuery() {
        let data: any = {};
        [data] = await this.db.instance().query(`SELECT * FROM test1`);
        return data;
    }
}

```

#### 捕获结果

```
{"err":true,"data":{},"errno":1004,"errmsg":"service query findAll sql err."}
```

### 这里可以当成数据层或者服务

## 项目运行

```
pyi run ${project}/application.ts -r -w -p 1234 -m test
```

## 代码手动运行

```
import { Application } from './${project}/application';

const app = new Application();
app.runtime(({ starter, watcher, config }) => {
    // edit watcher
    // edit config
    starter(config);
});
```

## example 运行 ts-node example/\${demo}/starter.ts

### 编译项目 pyi run example/${demo}/src/${app entry class}.ts -r [runtime 模式] -w [监听模式] -p [端口设置] -m [开发模式] -h [help 文档]
