import requests


def test():
    js = {
        "name": "Flutter festival",
        "organizing_body": "Someone",
        "image_url": "",
        "start": "12-12-2022",
        "end": "12-12-2022",
        "loc": "bruh",
        "event_type": "proshow",
        "description": "Learn flutter with us",
        "instructions": "Register on the website",
        "featured": "true"
    }
    r = requests.put('http://localhost:3000/events/bruh', data=js)
    print(r.json())


test()
