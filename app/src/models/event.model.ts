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
  seats: { type: String },
  teams: { type: String },
  team_max_members: { type: String },
  is_team_event: { type: Boolean },
  featured: { type: Boolean }
}, {
  timestamps: false,
  versionKey: false
});

export default mongoose.model<IEvents>("Events", EventsSchema);