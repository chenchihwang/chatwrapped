from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sqlite3
import json
import numpy as np
import glob
from sentence_transformers import SentenceTransformer
from keybert import KeyBERT
import openai
from topicModeling import find_favorite_topic
from pymongo import MongoClient

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/upload', methods=['POST'])
def handle_upload():
    if 'file' not in request.files or 'username' not in request.form:
        return jsonify({'message': 'No file part or username'}), 400
    file = request.files['file']
    username = request.form.get('username', None)
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        
        # Save the username to a text file
        with open(os.path.join(app.config['UPLOAD_FOLDER'], 'username.txt'), 'w') as f:
            f.write(username)
        
        # Check if data already exists in MongoDB
        MONGODB_USERNAME = os.environ.get("MONGODB_USERNAME", "chenchih")
        MONGODB_PASSWORD = os.environ.get("MONGODB_PASSWORD", "MqmftQ8wn0C4mKA1")
        connection_string = f"mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@chatwrapped.2o77p.mongodb.net/?retryWrites=true&w=majority&appName=chatwrapped"
        
        client = MongoClient(connection_string)
        db = client["my_database"]
        collection = db["messages"]

        existing_data = collection.find_one({"username": username})
        if existing_data:
            # Remove the MongoDB ObjectId from the response
            existing_data.pop('_id', None)
            update_content_js(existing_data)
            return jsonify({'message': 'Data already exists for the given username', 'user_data': existing_data})

        # Process chat history and get the inserted ID
        from main import process_chat_history
        inserted_id = process_chat_history(username, filepath)
        
        # Fetch the updated data from MongoDB using the username
        user_data = collection.find_one({"_id": inserted_id})  # Fetch user data from MongoDB using the inserted ID
        if not user_data:
            return jsonify({'message': 'No data found for the given username'}), 404

        # Remove the MongoDB ObjectId from the response
        user_data.pop('_id', None)
        
        update_content_js(user_data)
        
        return jsonify({'message': 'File uploaded and processed successfully', 'filename': file.filename, 'user_data': user_data})

def update_content_js(user_data):
    with open('/C:/Users/georg/Documents/GitHub/chatwrapped/frontend/src/components/content.js', 'w') as f:
        f.write(f"""
let content = [
  {{
    title: "Favorite Label",
    text: "{user_data['favorite_label']}",
    subtext: "This is your favorite label."
  }},
  {{
    title: "Favorite Keywords",
    text: "{', '.join(user_data['favorite_keyword'])}",
    subtext: "These are your favorite keywords."
  }},
  {{
    title: "Average Messages Per Day",
    text: "{user_data['avg_messages_per_day']}",
    subtext: "This is your average messages per day."
  }},
  {{
    title: "Average Words Per Message",
    text: "{user_data['avg_words_per_message']}",
    subtext: "This is your average words per message."
  }},
  {{
    title: "Dryness Score",
    text: "{user_data['dryness']}",
    subtext: "This is your dryness score."
  }},
  {{
    title: "Humor Score",
    text: "{user_data['humor']}",
    subtext: "This is your humor score."
  }},
  {{
    title: "Longest Active Conversation",
    text: "{user_data['longest_active_conv']}",
    subtext: "This is your longest active conversation."
  }},
  {{
    title: "Most Active Day",
    text: "{user_data['most_active_day']}",
    subtext: "This is your most active day."
  }},
  // Add more fields as needed
];

export default content;
""")

@app.route('/get-points', methods=['GET'])
def get_points():
    submissions = get_all_submissions()
    embeddings = []
    names_to_points = {}

    for data_dict in submissions:
        embeddings.append(data_dict["embedding"])
    points = reduce_dimensions(embeddings)

    for i, data_dict in enumerate(submissions):
        names_to_points[f"{data_dict['first_name']} {data_dict['last_name']}"] = list(points[i])
    
    return jsonify(names_to_points)

@app.route('/test-endpoint', methods=['GET'])
def your_endpoint():
    try:
        return jsonify({"message": "Data fetched successfully."}), 200
    except Exception as e:
        print("An error occurred:", e)
        return jsonify({"message": "An error occurred"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

# dev:
# FLASK_APP=app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=8080
# prod:
# gunicorn  -w 4 app:app -b 0.0.0.0:8080
# sudo supervisorctl start tartanspace_server
# sudo supervisorctl status tartanspace_server