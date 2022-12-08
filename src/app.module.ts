import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './events/event/event.controller';

@Module({
  imports: [],
  controllers: [AppController, EventController],
  providers: [AppService],
})
export class AppModule {}
