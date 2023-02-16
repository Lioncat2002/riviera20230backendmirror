import {IEvents_v2} from "../interfaces/events_v2";
import mongoose from "../providers/Database";

export const EventsSchema_v2 = new mongoose.Schema<IEvents_v2>({
  name: { type: String },
  organizing_body: { type: String },
  image_url: { type: String },
  date: [
    {
      start_timestamp: { type: Date },
      end_timestamp:  { type: Date }
    }
  ],
  loc: { type: String },
  description: { type: String },
  instructions: { type: String },
  event_type: { type: String },
  total_cost: { type: String },
  seats: { type: String },
  teams: { type: String },
  team_max_members: { type: String },
  coordinator_name: { type: String },
  coordinator_email: { type: String },
  coordinator_phone: { type: String },
  is_team_event: { type: Boolean },
  featured: { type: Boolean }
}, {
  timestamps: false,
  versionKey: false
});

export default mongoose.model<IEvents_v2>("Events_v2", EventsSchema_v2);