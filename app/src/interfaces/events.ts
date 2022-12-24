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
    start: Date,
    end: Date,
    loc: string,
    event_type: string,
    featured: boolean,
}

export default IEvents