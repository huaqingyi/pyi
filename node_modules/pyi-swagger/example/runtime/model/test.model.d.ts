import { Model } from 'sequelize-typescript';
export declare class Test extends Model<Test> {
    id: number;
    name: string;
    readonly created_at: Date;
    readonly updated_at: Date;
}
