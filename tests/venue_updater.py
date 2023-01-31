import pandas as pd
import requests

def test():
    xls = pd.ExcelFile("venue.xlsx")
    df1 = pd.read_excel(xls, "meow")
    df1 = df1.reset_index()

    for i, row in df1.iterrows():

        datetime=row["STARTDATE"].split("T")
        startdate=datetime[0].split("-")
        fixedstartdate=startdate[2]+"-"+startdate[0]+"-"+startdate[1]+"T"+datetime[1]

        datetime=row["ENDDATE"].split("T")
        enddate=datetime[0].split("-")
        fixedenddate=enddate[2]+"-"+enddate[0]+"-"+enddate[1]+"T"+datetime[1]
        json = {
            "name": row["Event Name"],
            "start": fixedstartdate,
            "end": fixedenddate,
            "loc":row["Final Venue"]
        }
        r = requests.patch('http://localhost:3000/events/loc/bruh', data=json)
        print(r.json())


test()