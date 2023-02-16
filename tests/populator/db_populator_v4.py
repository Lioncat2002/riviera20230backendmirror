import requests
import pandas as pd
import csv
import json

fees = open('events_fees_1.csv', 'r') 
reader = csv.DictReader(fees)
fees_1 = [venue for venue in reader]

fees2 = open('events_fees_2.csv', 'r')
reader2 = csv.DictReader(fees2)
fees_2 = [venue for venue in reader2]

jsonfile = open('data3.json', 'r')
events_json = json.load(jsonfile)
events_list = [event for event in events_json]

new_events_list = []
i = 0
for event in events_list:
    if event['total_cost'] == "TBD":
        print(f"Cost missing for event {event['name']}.")
    for event2 in fees_1:
        if event2['Event Name'].lower().strip().replace(" ", "") == event['name'].lower().strip().replace(" ", ""):
            if event['total_cost'] != event2['Registration Fees']:
                print(f"Cost not matching for {event['name']}")
                print(f"Original => {event['total_cost']}")
                print(f"Incoming => {event2['Registration Fees']}")
                data = input("Press Enter to continue...")
                i+=1
                if not data:
                    event['total_cost'] = event2['Registration Fees']
                    print("Cost added to event.")
            break
    
    for event2 in fees_2:
        if event2['Event Name'].lower().strip().replace(" ", "")     == event['name'].lower().strip().replace(" ", ""):
            if event['total_cost'] != event2['Total Event Cost']:
                print(f"Cost not matching for {event['name']}")
                print(f"Original => {event['total_cost']}")
                print(f"Incoming => {event2['Total Event Cost']}")
                data = input("Press Enter to continue...")
                i+=1
                if not data:
                    event['total_cost'] = event2['Total Event Cost']
                    print("Cost added to event.")
            break
        
    new_events_list.append(event)

file = open("new_events.json", "w+")
json.dump(new_events_list, file, indent=6)
print(i)




