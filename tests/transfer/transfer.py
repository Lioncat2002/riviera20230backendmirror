import json

jsonfile = open('data.json', 'r')
events_json = json.load(jsonfile)
events_list = [event for event in events_json]

events = []
i = 0
for event in events_list:
    i+=1
    date = event.pop('date', None)
    if not date:
        event['start'] = ""
        event['end'] = ""
        events.append(event)
        continue
    
    start = date[0]['start_timestamp']
    end = date[len(date)-1]['end_timestamp']
    event['start'] = start
    event['end'] = end
    events.append(event)

print(f"{i} {len(events)}")
file = open("new_events.json", "w+")
json.dump(events, file, indent=6)