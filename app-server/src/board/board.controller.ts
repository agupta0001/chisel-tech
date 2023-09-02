import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import Board from './board.model';
import { BoardService } from './board.service';
import { CreateUpdateBoardDto } from './board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateUpdateBoardDto): Promise<Board> {
    return this.boardService.create(payload);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateUpdateBoardDto,
  ): Promise<Board> {
    return this.boardService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardService.delete(id);
  }
}
