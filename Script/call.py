import requests
import os 
# You might also need the 'json' library for clean writing
import json



# Example: Get all cars

response = requests.get("http://localhost:8000/cars/year/2000")
if response.status_code == 200:
    print("Success !!! ", response.status_code, response.json())
elif response.status_code == 404:
    print("Not Found!!! ", response.status_code)


