/**
 * Define the events interface
 * 
 * @interface Events
 *  
 */


export interface IEvents {
    _id: string,
    name: string,
    organizing_body: string,
    image_url: string,
    start: Date,
    end: Date,
    loc: string,
    description: string,
    instructions: string,
    event_type: string,
    total_cost: string,
    seats: string,
    teams: string,
    team_max_members: string,
    is_team_event: boolean,
    featured: boolean,
}

export default IEvents;