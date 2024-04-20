import json
from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)


def update_user():
   print("Afasd")
   with open("quiz.json") as f:
      data = json.load(f)
      print(data)
    #   collection.insert_one(data)

if __name__ == "__main__":
    update_user()
    app.run(debug=True, port=5000)