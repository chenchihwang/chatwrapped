from .topicModeling import find_favorite_topic
from .jsonParsing import parse_messages
from .generateEmbedding import getEmbedding
from .pca import pca_to_3
from .insertDB import extract_message_info, insert_into_mongodb
import os
import glob

def process_chat_history(username, chat_history_filename):
    topic_info = find_favorite_topic(username, chat_history_filename)
    favorite_label = topic_info["label"]
    favorite_keywords = topic_info["keywords"]

    stats = parse_messages(chat_history_filename, username)

    embedding = getEmbedding(favorite_label, stats)

    insert_into_mongodb(data=stats, username=username, embedding=embedding)

if __name__ == '__main__':
    uploads_dir = os.path.join(os.path.dirname(__file__), '..', 'uploads')
    chat_history_files = glob.glob(os.path.join(uploads_dir, "*.json"))

    if chat_history_files:
        chat_history_file = chat_history_files[0]
        
        # Read the username from the text file
        with open(os.path.join(uploads_dir, 'username.txt'), 'r') as f:
            username = f.read().strip()
        
        process_chat_history(username, chat_history_file)
