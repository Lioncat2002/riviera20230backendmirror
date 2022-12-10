import { IsNotEmpty, IsString, IsDateString, IsBooleanString} from "class-validator";

export class EventDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    organizing_body: string;
    @IsNotEmpty()
    @IsDateString()
    start: Date;
    @IsNotEmpty()
    @IsDateString()
    end: Date;
    @IsString()
    loc?: string;
    @IsNotEmpty()
    @IsString()
    event_type: 'cultural'|'sports'|'proshow'|'other';
    @IsNotEmpty()
    @IsBooleanString()
    featured: boolean;
}