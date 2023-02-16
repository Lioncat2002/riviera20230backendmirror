import requests
import pandas as pd
import csv
import json
from datetime import datetime, timedelta

jsonfile = open('data4.json', 'r')
events_json = json.load(jsonfile)
events_list = [event for event in events_json]

new_events_list = []
i = 0
for event in events_list:
    if not 'date' in event.keys():
        print(f"Date information missing for event {event['name']}.")
        i+=1
        continue
    for date in event['date']:
        start_date = datetime.strptime(date['start_timestamp'], '%Y-%m-%dT%H:%M:%S.%fZ')
        end_date = datetime.strptime(date['end_timestamp'], '%Y-%m-%dT%H:%M:%S.%fZ')
        if end_date < start_date:
            print(f"End date is before start date for event {event['name']}.")

print(i)




