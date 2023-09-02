import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoardModule } from './board/board.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'chisel-lab',
      password: 'chisel-lab',
      database: 'chisel-lab',
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
    }),
    BoardModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
