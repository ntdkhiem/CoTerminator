import requests
import json
class statistics:
   def __init__(self):
       pass
   def request_api(self):
       self.response = requests.get("https://covid19-us-api.herokuapp.com/county")
       self.content = self.response.content
       self.content = json.loads(self.content)
   def parse_response(self):
       output = []
       message = self.content['message']
       for entry in message:
           if entry['state_name'] =='California':
               output.append(entry)
       return output
s = statistics()
s.request_api()
print(s.parse_response())

