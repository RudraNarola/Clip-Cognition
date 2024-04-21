import json
from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb+srv://lightningthunder2494:IQB9xZiN5l5jCztp@cluster0.havsrie.mongodb.net/')
db = client['test']

def update_user():
  result = db.quizes.find_one({
     "_id": "66247316b9ab4aba43b58137"
    })
  print("afaef",result)

if __name__ == "__main__":
    update_user()
    app.run(debug=True, port=5000)