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
import { CreateTodoDto } from '../todo/types/todo.dto';
import Todo from 'src/todo/todo.model';
import { BoardUtility } from './board.utility';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly boardUtility: BoardUtility,
  ) {}

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

  @Post('/:id/todo')
  async createTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateTodoDto,
  ): Promise<Todo> {
    return this.boardUtility.createTodoForBoard(id, payload);
  }
}
