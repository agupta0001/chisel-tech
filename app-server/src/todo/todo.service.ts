import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Todo from './todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }
}
