import { IsString, MinLength, MaxLength, validateSync, IsNotEmpty } from 'class-validator';
import { Validation, PYIValidation } from '../../../src';

@Validation
export class LoginValidation extends PYIValidation {
    @IsString({ message: '请传入字符串 .' })
    @IsNotEmpty({ message: '用户名不能为空 .' })
    @MinLength(4, { message: '用户名最小长度大于4.' })
    @MaxLength(10, { message: '用户名最大长度10.' })
    public username!: string;

    @IsString({ message: '请传入字符串 .' })
    @IsNotEmpty({ message: '密码不能为空 .' })
    @MinLength(6, { message: '密码最小长度大于6.' })
    @MaxLength(20, { message: '密码最大长度20.' })
    public password!: string;
}
