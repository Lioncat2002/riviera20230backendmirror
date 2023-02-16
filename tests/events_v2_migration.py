import json
from datetime import datetime, timedelta
import requests
f=open("old_events.json")
r=f.read()
f.close()

events=json.loads(r)
date_format='%Y-%m-%d %H:%M:%S'
dump_date_format = '%Y-%m-%dT%H:%M:%S.000Z'
for i in range(len(events)):
    try:
        start=events[i]["start"].replace("T", " ")
        start = start[:start.index(".")]
        start = datetime.strptime(start, date_format)
        end = events[i]["end"].replace("T", " ")
        end = end[:end.index(".")]
        end = datetime.strptime(end, date_format)
        
        events[i].pop("start",None)
        events[i].pop("end",None)

        events[i]["coordinator_name"]=""
        events[i]["coordinator_email"]=""
        events[i]["coordinator_phone"]=""
        
        days = end.day - start.day
        if days == 0:
            events[i]["date"] = [{
                "start_timestamp": start.strftime(dump_date_format),
                "end_timestamp": end.strftime(dump_date_format)
            }]
        if days > 0:
            date_list = []
            for j in range(days+1):
                date_list.append({
                    "start_timestamp": (start+timedelta(days=j)).strftime(dump_date_format),
                    "end_timestamp": (end-timedelta(days=days-j)).strftime(dump_date_format)
                })
            events[i]["date"] = date_list
        if days < 0:
            print(f"Ends before it starts?!: {events[i]['name']}")
    except Exception as e:
        print(f"No start/end params: {events[i]['name']}")
        events[i]["date"] = []
        
f=open("new_events.json",'w+')
json.dump(events,f,indent=6)
f.close()

