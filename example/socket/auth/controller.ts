import { PYITCPController, TCPRequestMapping, PYIExecption, TCPController } from '../../../src';
import { TestDao } from './dao';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
@TCPController
export default class extends PYITCPController {


    @TCPRequestMapping(10000)
    public test(): TestDao {
        return PYIExecption(() => {
            return {};
        });
    }
}