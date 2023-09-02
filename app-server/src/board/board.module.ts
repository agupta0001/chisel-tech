import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Board from './board.model';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import Todo from 'src/todo/todo.model';
import { BoardUtility } from './board.utility';

@Module({
  imports: [SequelizeModule.forFeature([Board, Todo])],
  controllers: [BoardController],
  providers: [BoardService, BoardUtility],
})
export class BoardModule {}
