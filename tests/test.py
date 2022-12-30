import requests


def test():
    js = {
        "name": "Test Event",
        "organizing_body": "helow there",
        "image_url": "",
        "start": "12-30-2022",
        "end": "12-30-2022",
        "loc": "none",
        "description": "bruhh",
        "instructions": "helow",
        "event_type": "other",
        "featured": "false"
    }
    r = requests.put('http://localhost:3000/events/bruh', data=js)
    print(r.json())


test()
