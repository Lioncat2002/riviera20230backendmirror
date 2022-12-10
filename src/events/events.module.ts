import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModel } from './eventmodel.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventModel])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
