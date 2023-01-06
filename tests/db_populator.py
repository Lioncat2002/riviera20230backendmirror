import pandas as pd
import requests
import random
xls = pd.ExcelFile("events.xlsx")
df1 = pd.read_excel(xls, "Event")
df2 = pd.read_excel(xls, "Description")
df3 = pd.read_excel(xls, "Fees")
df2_filtered = df2["Event Description"].copy()
df3_filtered = df3["Total Event Cost"].copy()

df4 = pd.concat([df1, df2_filtered, df3_filtered], axis=1)
df4 = df4.reset_index()


for index, row in df4.iterrows():
    category = row["Category"]
    name = row["Event Name"]
    organizing_body = row["Club/ Chapter/ Individual"]
    description = row["Event Description"]
    cost = row["Total Event Cost"]
    if category == "":
        category = "null"

    json = {
        "name": name,
        "organizing_body": organizing_body,
        "image_url": "https://picsum.photos/200",
        "start": "12-30-2022",
        "end": "12-30-2022",
        "loc": random.choice(["SJT", "TT", "Ground", "Greenos", "PRP"]),
        "description": description,
        "instructions": random.choice(["hello there", "towards left", "right", "upside", "down"]),
        "event_type": category,
        "cost": cost,
        "featured": random.choice(["true", "false"])
    }
    r = requests.put('http://localhost:3000/events/bruh', data=json)
    print(r.json())
