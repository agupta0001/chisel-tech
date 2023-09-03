import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Board from './board.model';
import Todo from 'src/todo/todo.model';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board) private boardModel: typeof Board) {}

  async findAll(): Promise<Board[]> {
    return this.boardModel.findAll();
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardModel.findOne({
      where: {
        id,
      },
      include: [Todo],
    });

    if (!board) {
      throw new NotFoundException('Board Not Found');
    }

    return board;
  }

  async create(payload: { title: string }): Promise<Board> {
    return this.boardModel.create(payload);
  }

  async update(id: number, payload: { title: string }): Promise<Board> {
    const board = await this.boardModel.findOne({
      where: {
        id,
      },
    });

    if (!board) {
      throw new NotFoundException('Board Not Found');
    }

    return board.update(payload);
  }
}
