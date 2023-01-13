import requests
import csv


def test():

    json = {
        "name": "test event",
        "organizing_body": "organizing_body",
        "image_url": "https://picsum.photos/200",
        "start": "12-30-2022",
        "end": "12-30-2022",
        "loc": "bruh",
        "description": "helo there",
        "instructions": "down",
        "event_type": "Informal",
        "total_cost": "100",
        "base_cost": "0",
        "sgst": "0",
        "cgst": "0",
        "total_cgst": "0",
        "seats": "1000",
        "individual": "true",
        "featured": "false"
    }
    r = requests.put('http://localhost:3000/events/bruh', data=json)
    print(r.json())


test()
