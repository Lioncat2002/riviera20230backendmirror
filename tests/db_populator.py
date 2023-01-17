import pandas as pd
import requests
import random
xls = pd.ExcelFile("events.xlsx")
df1 = pd.read_excel(xls, "Individual Events")
df2 = pd.read_excel(xls, "Description")
df1 = df1[["Event Name", "Club/ Chapter/ Individual",
           "Category", "Internal Participants", "External participants", "Registration Fees", "Base Fees", "SGST(%9)", "CGST(%9)"]].copy()
df2 = df2[["Event Name", "Event Description"]].copy()
df1 = df1.merge(df2, how='left', on="Event Name")

df1 = df1.reset_index()

#for index, row in df1.iterrows():
#   category = row["Category"]
#   name = row["Event Name"]
#   organizing_body = row["Club/ Chapter/ Individual"]
#   description = row["Event Description"]
#   total_cost = row["Registration Fees"]
#   base_cost = row["Base Fees"]
#   sgst = row["SGST(%9)"]
#   cgst = row["CGST(%9)"]
#   seats = int(row["Internal Participants"])+int(row["External participants"])
#   json = {
#       "name": name,
#       "organizing_body": organizing_body,
#       "image_url": "https://picsum.photos/200",
#       "start": "12-30-2022",
#       "end": "12-30-2022",
#       "loc": "TBD",
#       "description": description,
#       "instructions": random.choice(["hello there", "towards left", "right", "upside", "down"]),
#       "event_type": category,
#       "total_cost": total_cost,
#       "seats": seats,
#       "is_team_event": "false",
#       "featured": random.choice(["true", "false"])
#   }
#   r = requests.put('http://localhost:3000/events/bruh', data=json)
#   print(r.json())
df3 = pd.read_excel(xls, "Team Events")
df3 = df3[["Event Name", "Club/ Chapter/ Individual",
           "Category", "Teams (Internal)", "Teams (External)", "Max Members/Team", "Total Event Cost", "Base Cost", "SGST(%9)", "CGST(%9)", "Total GST(%18)"]].copy()
df3 = df3.merge(df2, how='left', on="Event Name")

df3 = df3.reset_index()


for index, row in df3.iterrows():
    category = row["Category"]
    name = row["Event Name"]
    organizing_body = row["Club/ Chapter/ Individual"]
    description = row["Event Description"]
    total_cost = row["Total Event Cost"]
    base_cost = row["Base Cost"]
    team_size = row["Max Members/Team"]
    sgst = row["SGST(%9)"]
    cgst = row["CGST(%9)"]
    seats = (int(row["Teams (Internal)"]) +
             int(row["Teams (External)"]))*team_size

    json = {
        "name": name,
        "organizing_body": organizing_body,
        "image_url": "https://picsum.photos/200",
        "start": "12-30-2022",
        "end": "12-30-2022",
        "loc": "TBD",
        "description": description,
        "instructions": random.choice(["hello there", "towards left", "right", "upside", "down"]),
        "event_type": category,
        "total_cost": total_cost,
        "seats": seats,
        "team_max_members": team_size,
        "is_team_event": "true",
        "featured": random.choice(["true", "false"])
    }
    r = requests.put('http://localhost:3000/events/bruh', data=json)
    print(r.json())
