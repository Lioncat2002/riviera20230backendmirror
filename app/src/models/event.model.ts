import IEvents from "../interfaces/events";
import mongoose from "../providers/Database";


export const EventsSchema = new mongoose.Schema<IEvents>({
  name: { type: String },
  organizing_body: { type: String },
  image_url: { type: String },
  start: { type: Date },
  end: { type: Date },
  loc: { type: String },
  description: { type: String },
  instructions: { type: String },
  event_type: { type: String },
  total_cost: { type: String },
  base_cost: { type: String },
  sgst: { type: String },
  cgst: { type: String },
  total_cgst: { type: String },
  seats: { type: String },
  featured: { type: Boolean }
}, {
  timestamps: false,
  versionKey: false
});

const EventsModel = mongoose.model<IEvents>("Events", EventsSchema);

export default EventsModel;