# pyi
This Typescript MVC Server Framework ...
轻量级 restful 快速开发

## Quick Start
### npm i pyi typescript --save
### 编译部署工具可选用 gyi 或 pm2 和 nodemon
#### src/application.ts 程序入口
```
import { PYIBootstrap, PYIApplication } from 'pyi';
import { join } from 'path';

@PYIBootstrap
export class Application extends PYIApplication {
    public static async main() {
        this.run(join(__dirname, '**/**.ts'));
    }
}
```
### controllers
#### 自动注入目录结构自定义, 推荐使用demo项目的目录结构
#### 路由继承于 routing-controllers [https://github.com/typestack/routing-controllers]
#### 提供所有 routing-controllers 包 中的修饰器, 均为自动注入
```
import {
    Controller, RequestMapping, RequestMappingMethod,
    PYIController, autowired, PYIExecption,
    PYIThrows
} from '../../../src';
import { TestService } from '../services/test.service';
import { TestDto } from '../dto/test.dto';
import { Req, Res, QueryParams, Body } from 'routing-controllers';
import { Request, Response } from 'koa';
import { tags, request, summary } from 'pyi-swagger';

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
        prefix: '/'
    })
    @request(RequestMappingMethod.GET, '/')
    @summary('test get index')
    @tag
    public index(): TestDto {
        // tslint:disable-next-line:max-classes-per-file
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
    public error(): TestDto {
        // tslint:disable-next-line:max-classes-per-file
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
        prefix: '/test',
        // methods: [RequestMappingMethod.GET]
    })
    public async test(
        @Res() response: Response,
        @QueryParams() gets: any,
        @Body() body: any
    ) {
        // console.log(await this.service.findAllUsers());
        return await 'Hello World ...';
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
cross NODE_ENV=production ts-node starter.ts
```

#### nodemon 启动 dev 模式
##### 跟目录定义 nodemon.json
```
{
    'watch': ['src'],
    'ext': 'ts',
    'exec': 'ts-node starter.ts'
}
```
##### nodemon 开始运行项目, 热更新, 适合dev开发

#### gyi 启动
##### 更目录定义 gulpfile.ts
```
import { GFile, Task, TSC, Gulp } from 'gyi';
import { series } from 'gulp';
import { join } from 'path';
import { fork } from 'child_process';

@GFile
export class GulpFile {

    @Task({
        src: join(__dirname, 'src/**/*.ts'),
        dest: join(__dirname, 'dist')
    })
    public async build(tsc: TSC) {
        tsc.runtime();
    }

    @Task()
    public async dev(gulp: Gulp) {
        console.log('build');
        let proc = fork('dist/application.js', [], {
            stdio: 'inherit'
        });
        proc.once('exit', (code: any) => {
            process.exit(code);
        });
        process.once('exit', () => {
            proc.kill();
        });
        gulp.watch(join(__dirname, 'src/**/*.ts'), series('build'));
    }
}
```
##### Think You ...

