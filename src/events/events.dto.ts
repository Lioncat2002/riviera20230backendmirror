import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EventDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    organizing_body: string;
    @IsNotEmpty()
    @IsNumber()
    start: number;
    @IsNotEmpty()
    @IsNumber()
    end: number;
    @IsNotEmpty()
    @IsString()
    loc?: string;
    @IsNotEmpty()
    event_type: 'event' | 'proshow' | 'featured';
}