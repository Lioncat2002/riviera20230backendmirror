import { Controller, Get } from '@nestjs/common';
import { EventDTO } from './event.dto';
import { events } from './events-mock';

@Controller('event')
export class EventController {
    @Get()
    getEvent(): EventDTO[]{
        return events;
    }
}
