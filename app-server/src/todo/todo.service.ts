import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Todo from './todo.model';
import { UpdateTodoDto } from './types/todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoModel.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }

    return todo;
  }

  async update(id: number, { title, status }: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoModel.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }

    if (status && status === todo.status) {
      throw new BadRequestException(
        `Cannot change of todo as it is already ${todo.status}`,
      );
    }

    return todo.update({ title, status });
  }

  async delete(id: number): Promise<void> {
    const todo = await this.todoModel.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }

    await todo.destroy();
  }
}
