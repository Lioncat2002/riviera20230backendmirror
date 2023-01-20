import pandas as pd
import requests

def test():
    xls = pd.ExcelFile("venue.xlsx")
    df1 = pd.read_excel(xls, "meow")
    df1 = df1.reset_index()

    for index, row in df1.iterrows():

        json = {
            "name": row["Event Name"],
                "start": row["STARTDATE"].split("T")[0],
                "end": row["ENDDATE"].split("T")[0],
                "loc":row["Final Venue"]
            
        
        }
        r = requests.patch('http://localhost:3000/events/bruh', data=json)
        print(r.json())


test()