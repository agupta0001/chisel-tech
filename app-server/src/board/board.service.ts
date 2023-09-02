import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Board from './board.model';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board) private boardModel: typeof Board) {}

  async findAll(): Promise<Board[]> {
    return this.boardModel.findAll();
  }
}
