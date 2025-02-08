import numpy as np
from datetime import datetime
from dateutil import parser

from topicModeling import find_favorite_topic
from jsonParsing import parse_messages
from generateEmbedding import getEmbedding
from saveDoc import save_document

username = "samuelsimoes"
chat_history_file = "chat_history_large.json"

topic_info = find_favorite_topic(username, chat_history_file)
favorite_label = topic_info["label"]
favorite_keywords = topic_info["keywords"]

stats = parse_messages(chat_history_file, username)

# -------------------------------------------------------------
# 1) Extract the numeric fields you need
# -------------------------------------------------------------
# Example structure (adjust these key paths to match your actual data):
total_messages = float(
    stats["Message Counts and Types"].get("total_messages", 0)
)
avg_messages_per_day = float(
    stats["Activity Metrics"].get("average_messages_per_day", 0)
)

dryness = float(stats.get("Dryness Score", 0))
humor = float(stats.get("Humor Score", 0))

messages_with_emoji = float(
    stats["Emoji Usage (in text and reactions)"].get("messages_with_at_least_one_emoji", 0)
)

avg_words_per_message = float(
    stats["Word Usage Statistics"].get("average_words_per_message", 0)
)
total_meaningful_words = float(
    stats["Word Usage Statistics"].get("total_meaningful_words", 0)
)
unique_words_used = float(
    stats["Word Usage Statistics"].get("unique_words_used", 0)
)

# -------------------------------------------------------------
# 2) Convert "longest_active_conversation" and "longest_period_without_messages" to timestamps
#    (They must go into the numeric stats_vector, but you also want them in date/time format.)
# -------------------------------------------------------------
longest_active_str = stats["Activity Metrics"].get("longest_active_conversation", "")
longest_period_str = stats["Activity Metrics"].get("longest_period_without_messages", "")

try:
    longest_active_dt = parser.parse(longest_active_str)
except:
    longest_active_dt = datetime(1970, 1, 1)  # fallback if parsing fails

try:
    longest_period_dt = parser.parse(longest_period_str)
except:
    longest_period_dt = datetime(1970, 1, 1)

# Convert to numeric timestamps for the NumPy array
longest_active_num = float(longest_active_dt.timestamp())
longest_period_num = float(longest_period_dt.timestamp())

# -------------------------------------------------------------
# 3) Most Used Emoji => tuple + numeric in array
# -------------------------------------------------------------
emoji_dict = stats.get("Most Used Emoji", {})
most_used_emoji_url = emoji_dict.get("imageUrl", "")
most_used_emoji_count_val = float(emoji_dict.get("count", 0))

# -------------------------------------------------------------
# 4) Most Active Day => tuple + numeric in array
# -------------------------------------------------------------
time_details = stats.get("Time-Related Details", {})
most_active_day_str = time_details.get("most_active_day", "")
most_active_day_count_val = float(time_details.get("most_active_day_count", 0))

# -------------------------------------------------------------
# 5) Build your stats_vector (float32) with numeric data only
# -------------------------------------------------------------
stats_vector = np.array([
    total_messages,
    avg_messages_per_day,
    longest_active_num,      # date/time stored as timestamp
    longest_period_num,      # date/time stored as timestamp
    dryness,
    humor,
    messages_with_emoji,
    most_used_emoji_count_val,   # numeric count only
    avg_words_per_message,
    total_meaningful_words,
    unique_words_used,
    most_active_day_count_val    # numeric count only
], dtype=np.float32)

# -------------------------------------------------------------
# 6) Construct updated_stats as a dictionary
#    Place your original date/time strings and any required tuples here.
# -------------------------------------------------------------
updated_stats = {
    "stats_vector": stats_vector,
    "longest_active_conversation_datetime": longest_active_dt.isoformat(),
    "longest_period_without_messages_datetime": longest_period_dt.isoformat(),
    "most_used_emoji_tuple": (most_used_emoji_url, int(most_used_emoji_count_val)),
    "most_active_day_tuple": (most_active_day_str, int(most_active_day_count_val))
}

# -------------------------------------------------------------
# 7) Continue with your existing workflow
# -------------------------------------------------------------
embedding = getEmbedding(favorite_label, stats)

print("Favorite label:", favorite_label)
print("Favorite keywords:", favorite_keywords)
print("Updated stats:", updated_stats)

# Optionally save the data to the database
data_to_save = {
    "username": username,
    "favorite_label": favorite_label,
    "favorite_keywords": favorite_keywords,
    "updated_stats": updated_stats  # or .tolist() if storing numeric arrays directly
}

print(data_to_save)
# save_document(data_to_save)