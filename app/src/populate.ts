import eventsData from "./data.json";
import Events from "./models/event_v2.model";
import App from "./providers/App";


App.loadDatabase();

for (const eventData of eventsData) {
  const event = new Events(eventData);
  event.save((err: any) => {
    if (err) {
      console.log(err);
    }
  });
}
console.log("Events populated");