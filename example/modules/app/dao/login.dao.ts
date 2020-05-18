import { Dao, PYIDao } from '../../../../src';
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
