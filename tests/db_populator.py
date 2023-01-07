import pandas as pd
import requests
import random
xls = pd.ExcelFile("events.xlsx")
df1 = pd.read_excel(xls, "Event")
df2 = pd.read_excel(xls, "Description")
df3 = pd.read_excel(xls, "Fees")
df2_filtered = df2["Event Description"].copy()
df3_filtered = df3[["Total Event Cost",
                   "Maximum Limit", "Base Cost", "SGST(%9)", "CGST(%9)", "Total GST(%18)"]].copy()

df4 = pd.concat([df1, df2_filtered, df3_filtered], axis=1)
df4 = df4.reset_index()


for index, row in df4.iterrows():
    category = row["Category"]
    name = row["Event Name"]
    organizing_body = row["Club/ Chapter/ Individual"]
    description = row["Event Description"]
    total_cost = row["Total Event Cost"]
    base_cost = row["Base Cost"]
    sgst = row["SGST(%9)"]
    cgst = row["CGST(%9)"]
    total_gst = row["Total GST(%18)"]
    seats = row["Maximum Limit"]

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
        "total_cost": total_cost,
        "base_cost": base_cost,
        "sgst": sgst,
        "cgst": cgst,
        "total_cgst": total_gst,
        "seats": seats,
        "featured": random.choice(["true", "false"])
    }
    r = requests.put('http://localhost:3000/events/bruh', data=json)
    print(r.json())
