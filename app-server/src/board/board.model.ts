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
  HasMany,
} from 'sequelize-typescript';
import Todo from 'src/todo/todo.model';

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

  @HasMany(() => Todo)
  todos: Todo[];
}
