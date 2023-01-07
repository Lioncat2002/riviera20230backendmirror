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
    base_cost: string,
    sgst: string,
    cgst: string,
    total_cgst: string,
    seats: string,
    featured: boolean,
}

export default IEvents;