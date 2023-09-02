import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Board from './board.model';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [SequelizeModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
