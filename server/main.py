from topicModeling import find_favorite_topic, embedder
from jsonParsing import parse_messages
from generateEmbedding import getEmbedding
from pca import pca_to_3

username = "samuelsimoes"
chat_history_file = "chat_history_large.json"

topic_info = find_favorite_topic(username, chat_history_file)
favorite_label = topic_info["label"]

stats = parse_messages(chat_history_file, username)

embedding = getEmbedding(favorite_label, stats)



