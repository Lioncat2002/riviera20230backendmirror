import requests
import pandas as pd
import csv
import json

venues = open('contacts.csv', 'r') 
reader = csv.DictReader(venues)
venues_list = [venue for venue in reader]

jsonfile = open('data2.json', 'r')
events_json = json.load(jsonfile)
events_list = [event for event in events_json]

new_events_list = []
i = 0
for event in events_list:
    for event2 in venues_list:
        if event2['Event Name'].lower().strip().replace(" ", "") == event['name'].lower().strip().replace(" ", ""):
            event['coordinator_name'] = event2['Event Coordinator 1 - Name:']
            event['coordinator_email'] = event2['Event Coordinator 1 - VIT mail ID:']
            event['coordinator_phone'] = event2['Event Coordinator 1 - Whatsapp Number:']
            i+=1
            print(f"Coordinator information added to event {event['name']}.")
            break
    new_events_list.append(event)

file = open("new_events.json", "w+")
json.dump(new_events_list, file, indent=6)
print(i)




