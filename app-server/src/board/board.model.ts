import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  PrimaryKey,
  Table,
  UpdatedAt,
  Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'boards',
})
export default class Board extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.NUMBER)
  id: number;

  @Column(DataType.STRING)
  title: string;

  @Column
  @CreatedAt
  created_at: Date;

  @Column
  @UpdatedAt
  updated_at: Date;

  @Column
  @DeletedAt
  deleted_at: Date;
}
