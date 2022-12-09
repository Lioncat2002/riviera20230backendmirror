import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventModel } from './eventmodel.entity';
import { Repository } from 'typeorm';
import { EventDTO } from './events.dto';
@Injectable()
export class EventsService {
    constructor(@InjectRepository(EventModel) private repo: Repository<EventModel>) { }

    create(body: EventDTO) {
        const event = this.repo.create(body);
        return this.repo.save(event);
    }
    findAll(event_type?: 'event' | 'proshow' | 'featured') {
        return this.repo.find({
            where: {
                event_type: event_type
            }
        });
    }
}
