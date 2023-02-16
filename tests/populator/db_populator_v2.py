import requests
import pandas as pd
import csv
import json

venues = open('venues.csv', 'r') 
reader = csv.DictReader(venues)
venues_list = [venue for venue in reader]

jsonfile = open('data.json', 'r')
events_json = json.load(jsonfile)
events_list = [event for event in events_json]

new_events_list = []
i = 0
for event in events_list:
    for event2 in venues_list:
        if event2['Event Name'].lower().strip() == event['name'].lower().strip():
            if not event['loc'].lower().strip().replace(" ", "") == event2['venue'].lower().strip().replace(" ", ""):
                if event['loc'] == "TBD":
                    print(f"{event['name']} has no venue")
                    event['loc'] = event2['venue']
                    print(f"Incoming => {event2['venue']}")
                    print("Venue added to event.")
                    i+=1
                else:
                    i+=1
                    print(f"Venues not matching for {event['name']}")
                    print(f"Original => {event['loc']}")
                    print(f"Incoming => {event2['venue']}")
                    data = input("Press Enter to continue...")
                    if not data:
                        event['loc'] = event2['venue']
                        print("Venue added to event.")

                #print(f"Venues not matching for {event['name']}")
                break
            #print(f"Venues matching for {event['name']}")
            break
    new_events_list.append(event)

file = open("new_events.json", "w+")
json.dump(new_events_list, file, indent=6)
print(i)




