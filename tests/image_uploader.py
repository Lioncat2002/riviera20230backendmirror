import requests
import csv
import os
def upload_image_to_imgur(image_path):
    CLIENT_ID = "546c25a59c58ad7"
    HEADERS = {'Authorization': 'Client-ID ' + CLIENT_ID}
    URL = "https://api.imgur.com/3/image"
    with open(image_path, 'rb') as f:
        r = requests.post(URL, files={'image': f}, headers=HEADERS)
        return r.json()['data']['link']

def test():

    for path in os.listdir("images"):
        lnk=upload_image_to_imgur(f"images/{path}")

        json = {
            "name": path.split(".")[0],
            "image_url": lnk,
         }
        r = requests.patch('https://riviera.fly.dev/events/bruh', data=json)
        print(r.text)


test()
