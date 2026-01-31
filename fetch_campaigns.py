import urllib.request
import json

API_KEY = "sv3k0jiswla5r3re7zfukpthyj4c99k7"
URL = "https://api.getresponse.com/v3/campaigns"

headers = {
    "X-Auth-Token": f"api-key {API_KEY}",
    "Content-Type": "application/json"
}

try:
    req = urllib.request.Request(URL, headers=headers)
    with urllib.request.urlopen(req) as response:
        data = response.read()
        campaigns = json.loads(data)
        print(f"Found {len(campaigns)} campaigns:")
        for camp in campaigns:
            print(f"Name: {camp.get('name')} | ID: {camp.get('campaignId')}")
except Exception as e:
    print(f"Exception: {e}")
