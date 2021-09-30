import { PYIController, PYIExecption } from 'pyi';
import { TestDao } from './dao';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export default class extends PYIController {

    public test(): TestDao {
        return PYIExecption(() => {
            return {};
        });
    }
}
