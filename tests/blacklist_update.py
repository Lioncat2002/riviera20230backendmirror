#! /usr/bin/python
import requests

blacklist={
    "blacklist": ["17881026836750864",
                  "18003291259604677",
                  "17989065430779351",
                  "17842226224145815",
                  "17989324195115282",
                  "17842219672123871",
                  "17844042448058089",
                  "17848753033644348",
                  "17895086245531533",
                  "17883871369437100",
                  "17871647240756474",
                  "17856624830798449",
                  "17933440709613373",
                  "17933440709613373",
                  "17941356518311805",
                  "18214363120167333",
                  "18332264485037230",
                  "18204814516172741",
                  "17986797520743126",
                  "17958689471493249",
                  "17989490467683856",
                  "17978183521768137",
                  "18319450729035589",
                  "17969917834850856",
                  "18253691191117911",
                  "18234398068180690",
                  "17963026517057116",
                  ]
}
r=requests.post("https://riviera.vit.ac.in/api/hashtag/blacklist",data=blacklist)
print(r.text)