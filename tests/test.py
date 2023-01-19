import requests
import csv


def test():

    json = {
        "name": "Skills N Thrills",
        "image_url": "https://i.imgur.com/tfwhkf1.jpg",
    }
    r = requests.patch('http://localhost:3000/events/bruh', data=json)
    print(r.json())


test()
