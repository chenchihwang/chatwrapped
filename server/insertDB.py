import os
import datetime
from pymongo import MongoClient

def extract_message_info(data):
    def parse_duration(duration_str):
        if "day" in duration_str:
            days_part, time_part = duration_str.split(", ")
            days = int(days_part.split()[0])
        else:
            days = 0
            time_part = duration_str
        if "." in time_part:
            t = datetime.datetime.strptime(time_part, "%H:%M:%S.%f")
        else:
            t = datetime.datetime.strptime(time_part, "%H:%M:%S")
        return datetime.timedelta(days=days, hours=t.hour, minutes=t.minute, seconds=t.second, microseconds=t.microsecond)
    result = {}
    result["total_messages"] = data["Message Counts and Types"]["total_messages"]
    result["avg_messages_per_day"] = data["Activity Metrics"]["average_messages_per_day"]
    longest_active_conv_str = data["Activity Metrics"]["longest_active_conversation"]
    result["longest_active_conv"] = parse_duration(longest_active_conv_str)
    longest_period_str = data["Activity Metrics"]["longest_period_without_messages"]
    result["longest_period"] = parse_duration(longest_period_str)
    result["dryness"] = data["Dryness Score"]
    result["humor"] = data["Humor Score"]
    result["messages_with_emoji"] = data["Emoji Usage (in text and reactions)"]["messages_with_at_least_one_emoji"]
    most_used = data["Most Used Emoji"]
    result["most_used_emoji_count"] = (most_used["count"], most_used["imageUrl"])
    result["avg_words_per_message"] = data["Word Usage Statistics"]["average_words_per_message"]
    result["total_meaningful_words"] = data["Word Usage Statistics"]["total_meaningful_words"]
    result["unique_words_used"] = data["Word Usage Statistics"]["unique_words_used"]
    most_active_day_str, count = data["Time-Related Details"]["most_active_day"]
    if most_active_day_str != "N/A":
        active_date = datetime.datetime.strptime(most_active_day_str, "%Y-%m-%d").date()
    else:
        active_date = None
    result["most_active_day_count"] = (active_date, count)

    return result

def insert_into_mongodb(data, username, embedding, connection_string=None, database_name="my_database", collection_name="messages"):
    if connection_string is None:
        MONGODB_USERNAME = os.environ.get("MONGODB_USERNAME", "chenchih")
        MONGODB_PASSWORD = os.environ.get("MONGODB_PASSWORD", "MqmftQ8wn0C4mKA1")
        connection_string = f"mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@chatwrapped.2o77p.mongodb.net/?retryWrites=true&w=majority&appName=chatwrapped"


    extracted = extract_message_info(data)
    emoji_count, emoji_image_url = extracted.pop("most_used_emoji_count")
    extracted["most_used_emoji_count"] = emoji_count
    extracted["most_used_emoji_image_url"] = emoji_image_url
    active_day, day_count = extracted.pop("most_active_day_count")
    if active_day is not None:
        extracted["most_active_day"] = active_day.isoformat()
    else:
        extracted["most_active_day"] = "N/A"
    extracted["most_active_day_count"] = day_count
    extracted["longest_active_conv"] = str(extracted["longest_active_conv"])
    extracted["longest_period"] = str(extracted["longest_period"])
    extracted["username"] = username
    extracted["embedding"] = embedding.tolist()
    client = MongoClient(connection_string)
    db = client[database_name]
    collection = db[collection_name]

    result = collection.insert_one(extracted)