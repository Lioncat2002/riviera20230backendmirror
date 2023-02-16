import requests
import pandas as pd
import csv
import json

jsonfile = open('data3.json', 'r')
events_json = json.load(jsonfile)
events_list = [event for event in events_json]

new_events_list = []
i = 0
for event in events_list:
    if not 'coordinator_name' in event.keys():
        print(f"Coordinator information missing for event {event['name']}.")
        event['coordinator_name'] = ''
        event['coordinator_email'] = ''
        event['coordinator_phone'] = ''
        i+=1
    new_events_list.append(event)


file = open("new_events.json", "w+")
json.dump(new_events_list, file, indent=6)
print(i)




