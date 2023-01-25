import pandas as pd
import requests
import random
xls = pd.ExcelFile("events-sports2.xlsx")
df1 = pd.read_excel(xls, "Individual Events")
df2 = pd.read_excel(xls, "All Events Description")
df1 = df1[["Event Name", "Club/ Chapter/ Individual",
           "Category", "Total Participant Limit", "Registration Fees", "Base Fees", "Fees SGST(%9)", "Fees CGST(%9)"]].copy()
df2 = df2[["Event Name", "Event Description", "Date & Time", "Venue"]].copy()
df1 = df1.merge(df2, how='left', on="Event Name")

df1 = df1.reset_index()

for index, row in df1.iterrows():
   category = row["Category"]
   name = row["Event Name"]
   organizing_body = row["Club/ Chapter/ Individual"]
   description = row["Event Description"]
   total_cost = row["Registration Fees"]
   date = row['Date & Time']
   start = f"{date[6:10]}-{date[0:2]}-{date[3:5]}T{date[11:]}"
   # 02-23-2023T12:00:00.000Z
   # 02-12-2023T10:30:00.000Z
   end = start[:11] + "14:40:00.000Z"
   location = row['Venue']
   base_cost = row["Base Fees"]
   sgst = row["Fees SGST(%9)"]
   cgst = row["Fees CGST(%9)"]
   seats = int(row["Total Participant Limit"])
   json = {
       "name": name,
       "organizing_body": organizing_body,
       "image_url": "https://picsum.photos/200",
       "start": start,
       "end": end,
       "loc": location,
       "description": description,
       "instructions": random.choice(["hello there", "towards left", "right", "upside", "down"]),
       "event_type": category,
       "total_cost": total_cost,
       "seats": seats,
       "is_team_event": "false",
       "featured": random.choice(["true", "false"])
   }
   r = requests.put('http://localhost:3000/events/test', data=json)
   print(r.json())
   input("type something to continue")
#df3 = pd.read_excel(xls, "Team Events")
#df3 = df3[["Event Name", "Club/ Chapter/ Individual",
#           "Category", "Teams (Internal)", "Teams (External)", "Max Members/Team", "Total Event Cost", "Base Cost", "SGST(%9)", "CGST(%9)", "Total GST(%18)"]].copy()
#df3 = df3.merge(df2, how='left', on="Event Name")
#
#df3 = df3.reset_index()
#
#
#for index, row in df3.iterrows():
#    category = row["Category"]
#    name = row["Event Name"]
#    organizing_body = row["Club/ Chapter/ Individual"]
#    description = row["Event Description"]
#    total_cost = row["Total Event Cost"]
#    base_cost = row["Base Cost"]
#    team_size = row["Max Members/Team"]
#    sgst = row["SGST(%9)"]
#    cgst = row["CGST(%9)"]
#    seats = (int(row["Teams (Internal)"]) +
#             int(row["Teams (External)"]))*team_size
#
#    json = {
#        "name": name,
#        "organizing_body": organizing_body,
#        "image_url": "https://picsum.photos/200",
#        "start": "02-24-2023",
#        "end": "02-27-2023",
#        "loc": "TBD",
#        "description": description,
#        "instructions": random.choice(["hello there", "towards left", "right", "upside", "down"]),
#        "event_type": category,
#        "total_cost": total_cost,
#        "seats": seats,
#        "team_max_members": team_size,
#        "is_team_event": "true",
#        "featured": random.choice(["true", "false"])
#    }
#    r = requests.put('http://localhost:3000/events/bruh', data=json)
#    print(r.json())