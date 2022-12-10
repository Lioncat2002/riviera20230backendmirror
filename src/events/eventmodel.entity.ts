import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EventModel{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    organizing_body: string;
    @Column()
    start: number;
    @Column()
    end: number;
    @Column()
    loc?: string;
    @Column()
    event_type: 'event'|'proshow'|'featured';
}