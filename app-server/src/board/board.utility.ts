import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Board from './board.model';
import Todo from 'src/todo/todo.model';
import { CreateTodoDto } from 'src/todo/types/todo.dto';

@Injectable()
export class BoardUtility {
  constructor(
    @InjectModel(Board) private boardModel: typeof Board,
    @InjectModel(Todo) private todoModel: typeof Todo,
  ) {}

  async createTodoForBoard(boardId: number, payload: CreateTodoDto) {
    const board = await this.boardModel.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new NotFoundException('Board Not Found');
    }

    const todo = await this.todoModel.create({ ...payload, board_id: boardId });

    return todo;
  }
}
