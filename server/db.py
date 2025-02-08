from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
db_username = os.getenv("MONGODB_USERNAME")
db_password = os.getenv("MONGODB_PASSWORD")

client = MongoClient(f"mongodb+srv://{db_username}:{db_password}@cluster0.iwabec8.mongodb.net/?retryWrites=true&w=majority")

db = client.get_database('tartanspace-v1')
collection = db['prod']

def save_document(user_data: dict):
    insert_result = collection.insert_one(user_data)
    if insert_result.acknowledged:
        print(f"Successfully inserted with id: {insert_result.inserted_id}")

def get_all_submissions():
    cursor = collection.find({}, {"_id": 0, "first_name": 1, "last_name": 1, "embedding": 1})
    return list(cursor)
