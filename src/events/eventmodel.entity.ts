import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
export class EventModel{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    organizing_body: string;
    @Column({type: 'timestamptz'})
    start: Date;
    @Column({type: 'timestamptz'})
    end: Date;
    @Column()
    loc?: string;
    @Column()
    event_type: 'cultural'|'sports'|'proshow'|'other';
    @Column()
    featured: boolean
}