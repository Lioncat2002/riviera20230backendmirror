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
    event_type: string,
    featured: boolean,
}

export default IEvents