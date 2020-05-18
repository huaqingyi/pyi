import { Dao, PYIDao } from '../../../../src';
import { IsString, IsNotEmpty } from 'class-validator';
import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator';

@Dao
@swaggerClass()
export class LoginDao extends PYIDao {
    
    @IsString()
    @IsNotEmpty()
    @swaggerProperty({
        type: 'string',
        required: true,
        example: '1234',
        description: '用户名'
    })
    public username!: string;
    
    @IsString()
    @IsNotEmpty()
    @swaggerProperty({
        type: 'string',
        required: true,
        example: '123123',
        description: '密码'
    })
    public password!: string;
}
