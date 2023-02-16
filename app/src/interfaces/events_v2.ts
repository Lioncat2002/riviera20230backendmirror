/**
 * Define the events interface
 * 
 * @interface Events_v2
 *  
 */

export interface IDate {
    start_timestamp: Date,
    end_timestamp: Date,
}
export interface IEvents_v2 {
    _id: string,
    name: string,
    organizing_body: string,
    image_url: string,
    date: IDate[],
    loc: string,
    description: string,
    instructions: string,
    event_type: string,
    total_cost: string,
    seats: string,
    teams: string,
    team_max_members: string,
    coordinator_name: string,
    coordinator_email: string,
    coordinator_phone: string,
    is_team_event: boolean,
    featured: boolean,
}

export default IEvents_v2;