import urllib.request
import json
import sys

API_KEY = "aj7l5zzk5la8ou5wc7mrk3snoqpo8kum"
URL = "https://api.getresponse.com/v3/campaigns"

def get_campaigns():
    req = urllib.request.Request(URL)
    req.add_header('X-Auth-Token', f'api-key {API_KEY}')
    req.add_header('Content-Type', 'application/json')
    
    try:
        with urllib.request.urlopen(req) as response:
            data = response.read()
            return json.loads(data)
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
        print(e.read().decode('utf-8'))
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

campaigns = get_campaigns()
print(f"Found {len(campaigns)} campaigns:")
with open("campaigns.txt", "w", encoding="utf-8") as f:
    for c in campaigns:
        line = f"ID: {c['campaignId']} | Name: {c['name']}"
        print(line)
        f.write(line + "\n")
