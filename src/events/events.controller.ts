import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(private eventService: EventsService) { }
    @Post()
    create(@Body() body: any) {
        return this.eventService.create(body);
    }
    @Get()
    findAll() {
        return this.eventService.findAll();
    }
    @Get(":event_type")
    findAllByType(event_type: 'event' | 'proshow' | 'featured') {
        return this.eventService.findAll(event_type);
    }
}
