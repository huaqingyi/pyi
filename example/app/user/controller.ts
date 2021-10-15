import { PYIController, RequestMapping, PYIExecption, Controller, autowired } from '../../../src';
import { TestDao } from './dao';
import { Database } from '../../components/database';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
@Controller
export default class extends PYIController {

    @autowired
    public database!: Database;

    @RequestMapping
    public test(): TestDao {
        console.log(this.database);
        return PYIExecption(() => {
            return {};
        });
    }
}
