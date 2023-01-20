import pandas as pd
import requests

def test():
    xls = pd.ExcelFile("venue.xlsx")
    df1 = pd.read_excel(xls, "meow")
    df1 = df1.reset_index()

    for index, row in df1.iterrows():

        json = {
            "name": "Maulana Abul Kalam Aazad Debate Tournament",
            "image_url":"https://i.imgur.com/2D7Q2v7.jpg"
               # "start": row["STARTDATE"].split("T")[0],
               # "end": row["ENDDATE"].split("T")[0],
               # "loc":row["Final Venue"]
            
        
        }
        r = requests.patch('http://localhost:3000/events/bruh', data=json)
        print(r.json())


test()