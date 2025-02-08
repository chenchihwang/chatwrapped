from topicModeling import find_favorite_topic
from jsonParsing import parse_messages
from generateEmbedding import getEmbedding
from pca import pca_to_3
from insertDB import extract_message_info, insert_into_mongodb

username = "fnweeaboo"
chat_history_file = "chat_history.json"

topic_info = find_favorite_topic(username, chat_history_file)
favorite_label = topic_info["label"]
favorite_keywords = topic_info["keywords"]

stats = parse_messages(chat_history_file, username)

embedding = getEmbedding(favorite_label, stats)

insert_into_mongodb(data = stats, username = username, embedding = embedding)
