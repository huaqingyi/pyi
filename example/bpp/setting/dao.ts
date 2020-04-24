import { Dao, PYIDao } from '/Users/yihuaqing/Desktop/yihq/pyi/src';
import { IsString, IsNotEmpty } from 'class-validator';

@Dao
export class LoginDao extends PYIDao {
    
    @IsString()
    @IsNotEmpty()
    public username!: string;
    
    @IsString()
    @IsNotEmpty()
    public password!: string;
}
