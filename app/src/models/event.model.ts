import IEvents from "../interfaces/events";
import mongoose from "../providers/Database";


export const EventsSchema = new mongoose.Schema<IEvents>({
  name: { type: String},
  organizing_body: { type: String},
  image_url: {type: String},
  start: {type: Date},
  end: {type: Date},
  loc: { type: String },
  event_type: { type: String},
  featured: {type: Boolean}
}, {
  timestamps: false,
  versionKey: false
});

const EventsModel = mongoose.model<IEvents>("Events", EventsSchema);

export default EventsModel;