import { PYIController, RequestMapping, PYIExecption, Controller } from '../../../src';
import { TestDao } from './dao';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
@Controller
export default class extends PYIController {

    @RequestMapping
    public test(): TestDao {
        return PYIExecption(() => {
            return {};
        });
    }
}
