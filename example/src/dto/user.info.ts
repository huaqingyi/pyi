import { Dto, PYIDto } from '../../../src';

export interface UserInfo {
    id: number;
    username: string;
    age: string;
    nikename: string;
    email: string;
}

@Dto
export class UserDto extends PYIDto {
    public err!: boolean;
    public data!: UserInfo;
}
