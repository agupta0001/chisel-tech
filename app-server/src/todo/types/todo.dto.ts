import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TodoStatus } from '.';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;
}

export class UpdateTodoDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;
}
