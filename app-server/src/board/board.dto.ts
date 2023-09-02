import { IsString, MinLength } from 'class-validator';

export class CreateUpdateBoardDto {
  @IsString()
  @MinLength(3)
  title: string;
}
