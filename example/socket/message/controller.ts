import { PYITCPController, PYIExecption, TCPController } from '../../../src';
import { TestDao } from './dao';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
@TCPController
export default class extends PYITCPController {

    public test(): TestDao {
        return PYIExecption(() => {
            return {};
        });
    }
}