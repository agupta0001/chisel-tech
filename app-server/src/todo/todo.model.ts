import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Board from 'src/board/board.model';
import { TodoStatus } from './types';

@Table({
  tableName: 'todos',
})
export default class Todo extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.NUMBER)
  id: number;

  @Column(DataType.TEXT)
  title: string;

  @Default(TodoStatus.OPEN)
  @Column(DataType.ENUM(TodoStatus.OPEN, TodoStatus.COMPLETED))
  status: TodoStatus;

  @Column
  @CreatedAt
  created_at: Date;

  @Column
  @UpdatedAt
  updated_at: Date;

  @Column
  @DeletedAt
  deleted_at: Date;

  @ForeignKey(() => Board)
  @Column(DataType.NUMBER)
  board_id: number;

  @BelongsTo(() => Board)
  board: Board;
}
