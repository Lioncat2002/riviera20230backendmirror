import requests
import csv


def test():
    reader = csv.reader(open("events.csv"))
    for row in reader:
        print(row)
        category = row[1]
        organizing_body = row[2]
        name = row[3]
        if category == "":
            category = "null"

        json = {
            "name": name,
            "organizing_body": organizing_body,
            "image_url": "",
            "start": "12-30-2022",
            "end": "12-30-2022",
            "loc": "none",
            "description": "bruhh",
            "instructions": "helow",
            "event_type": category,
            "featured": "false"
        }
        r = requests.put('http://localhost:3000/events/bruh', data=json)
        print(r.json())


test()
