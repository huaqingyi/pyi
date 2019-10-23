import { IsString, MinLength, MaxLength, validateSync, IsNotEmpty } from 'class-validator';
import { Validation, PYIValidation } from '../../../src';
import { swaggerClass, swaggerProperty } from 'koa-swagger-decorator';

@Validation
@swaggerClass()
export class LoginValidation extends PYIValidation {
    @IsString({ message: '请传入字符串 .' })
    @IsNotEmpty({ message: '用户名不能为空 .' })
    @MinLength(4, { message: '用户名最小长度大于4.' })
    @MaxLength(10, { message: '用户名最大长度10.' })
    @swaggerProperty({
        type: 'string',
        required: true,
        example: '1234',
        description: '用户名'
    })
    public username!: string;

    @IsString({ message: '请传入字符串 .' })
    @IsNotEmpty({ message: '密码不能为空 .' })
    @MinLength(6, { message: '密码最小长度大于6.' })
    @MaxLength(20, { message: '密码最大长度20.' })
    @swaggerProperty({
        type: 'string',
        required: true,
        example: '123123',
        description: '密码'
    })
    public password!: string;
}
