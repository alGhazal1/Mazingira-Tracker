#script to fetch a dataset and dump them in a mysql table

import requests

apiEndpoint = 'https://api.gbif.org/v1/occurrence/search?limit=10'
response = requests.get(apiEndpoint)
if response.status_code == 200:
    data = response.json()  #  the response should be in JSON format
else:
    print(f"Failed to retrieve data: {response.status_code}")
    