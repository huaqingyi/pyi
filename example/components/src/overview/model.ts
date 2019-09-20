import { Table, Column, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, Model as TModel } from 'sequelize-typescript';

@Table({
    tableName: 'test'
})
export class Model extends TModel<Model> {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id!: number;

    @Column
    public name!: string;

    @CreatedAt
    public readonly created_at!: Date;

    @UpdatedAt
    public readonly updated_at!: Date;
}
