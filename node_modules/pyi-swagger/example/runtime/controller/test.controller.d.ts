/// <reference types="koa-bodyparser" />
import { PYIController } from 'pyi';
import { TestService } from '../service/test.service';
import { Nest } from '../components/nest';
import { TestVo } from './../vo/test.vo';
import { Context, Request, Response } from 'koa';
export declare class TestController extends PYIController {
    service: TestService;
    nest: Nest;
    index(): TestVo;
    test(ctx: Context, req: Request, res: Response, params: any, body: any): TestVo;
    show(): string;
}
