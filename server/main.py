import os
import datetime
import sqlite3
import json

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

def insert_into_sqlite(data, username, embedding, keywords, label, db_file="chatwrapped.db"):
    # First, extract and massage the data
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
    # Convert embedding (a list or a numpy array) to a JSON string for storage.
    try:
        extracted["embedding"] = json.dumps(embedding.tolist())
    except AttributeError:
        extracted["embedding"] = json.dumps(embedding)
    extracted["topic"] = label
    extracted["keywords"] = json.dumps(keywords)
    
    # Connect to SQLite and ensure the table exists.
    conn = sqlite3.connect(db_file)
    c = conn.cursor()
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        total_messages INTEGER,
        avg_messages_per_day REAL,
        longest_active_conv TEXT,
        longest_period TEXT,
        dryness REAL,
        humor REAL,
        messages_with_emoji INTEGER,
        most_used_emoji_count INTEGER,
        most_used_emoji_image_url TEXT,
        avg_words_per_message REAL,
        total_meaningful_words INTEGER,
        unique_words_used INTEGER,
        most_active_day TEXT,
        most_active_day_count INTEGER,
        embedding TEXT,
        topic TEXT,
        keywords TEXT
    )
    """
    c.execute(create_table_sql)
    
    # Insert the record.
    insert_sql = """
    INSERT INTO messages (
        username, total_messages, avg_messages_per_day, longest_active_conv, longest_period,
        dryness, humor, messages_with_emoji, most_used_emoji_count, most_used_emoji_image_url,
        avg_words_per_message, total_meaningful_words, unique_words_used, most_active_day,
        most_active_day_count, embedding, topic, keywords
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    values = (
        extracted.get("username"),
        extracted.get("total_messages"),
        extracted.get("avg_messages_per_day"),
        extracted.get("longest_active_conv"),
        extracted.get("longest_period"),
        extracted.get("dryness"),
        extracted.get("humor"),
        extracted.get("messages_with_emoji"),
        extracted.get("most_used_emoji_count"),
        extracted.get("most_used_emoji_image_url"),
        extracted.get("avg_words_per_message"),
        extracted.get("total_meaningful_words"),
        extracted.get("unique_words_used"),
        extracted.get("most_active_day"),
        extracted.get("most_active_day_count"),
        extracted.get("embedding"),
        extracted.get("topic"),
        extracted.get("keywords")
    )
    c.execute(insert_sql, values)
    conn.commit()
    inserted_id = c.lastrowid
    conn.close()
    
    print("Inserted record:", extracted)
    return inserted_id

# -------------------------------------------------
# Processing the chat history.
# -------------------------------------------------
from topicModeling import find_favorite_topic
from jsonParsing import parse_messages
from generateEmbedding import getEmbedding
from pca import pca_to_3

def process_chat_history(username, chat_history_filename):
    topic_info = find_favorite_topic(username, chat_history_filename)
    favorite_label = topic_info["label"]
    favorite_keywords = topic_info["keywords"]

    stats = parse_messages(chat_history_filename, username)
    embedding = getEmbedding(favorite_label, stats)

    inserted_id = insert_into_sqlite(data=stats,
                                     username=username,
                                     embedding=embedding,
                                     keywords=favorite_keywords,
                                     label=favorite_label)
    return inserted_id

def getStats(username, chat_history_filename):
    stats = parse_messages(chat_history_filename, username)
    return stats

# -------------------------------------------------
# When run as a script, process the first found chat history.
# -------------------------------------------------
if __name__ == '__main__':
    import glob
    uploads_dir = os.path.join(os.path.dirname(__file__), '..', 'uploads')
    chat_history_files = glob.glob(os.path.join(uploads_dir, "*.json"))
    if chat_history_files:
        chat_history_file = chat_history_files[0]
        # Read the username from a text file.
        with open(os.path.join(uploads_dir, 'username.txt'), 'r') as f:
            username = f.read().strip()
        process_chat_history(username, chat_history_file)
