import json


env = json.load((open('./api.json')))
print(env["MONGODB_URL"])
