import requests

blacklist={
    "blacklist": ["17842219672123871", "17844042448058089", "17848753033644348", "17842226224145815", "17895086245531533","17989324195115282","17871647240756474"]
}
r=requests.post("http://localhost:3000/hashtag/blacklist",data=blacklist)
print(r.text)