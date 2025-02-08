from flask import Flask, render_template, request, jsonify
import os
import glob
from server.main import process_chat_history
import nltk
from sentence_transformers import SentenceTransformer
from keybert import KeyBERT
import openai
from server.topicModeling import find_favorite_topic
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Enable CORS
allowed_origins = ["https://tartanspace.xyz", "https://www.tartanspace.xyz", "http://127.0.0.1:3000"]
CORS(app, resources={r"/*": {"origins": allowed_origins}})

# Clean the uploads folder
def clean_uploads_folder():
    files = glob.glob(os.path.join(UPLOAD_FOLDER, '*'))
    for f in files:
        os.remove(f)

clean_uploads_folder()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.json
    # Process the data here
    response = {'message': 'Data received', 'data': data}
    return jsonify(response)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files or 'username' not in request.form:
        return jsonify({'message': 'No file part or username'}), 400
    file = request.files['file']
    username = request.form['username']
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
            return jsonify({'message': 'Data already exists for the given username', 'user_data': existing_data})

        # Process chat history and get the inserted ID
        inserted_id = process_chat_history(username, filepath)
        
        # Fetch the updated data from MongoDB using the username
        user_data = collection.find_one({"_id": inserted_id})  # Fetch user data from MongoDB using the inserted ID
        if not user_data:
            return jsonify({'message': 'No data found for the given username'}), 404

        # Remove the MongoDB ObjectId from the response
        user_data.pop('_id', None)
        
        return jsonify({'message': 'File uploaded and processed successfully', 'filename': file.filename, 'user_data': user_data})

@app.route('/api/get_user_data', methods=['GET'])
def get_user_data():
    username = request.args.get('username')
    if not username:
        return jsonify({'message': 'Username is required'}), 400

    MONGODB_USERNAME = os.environ.get("MONGODB_USERNAME", "chenchih")
    MONGODB_PASSWORD = os.environ.get("MONGODB_PASSWORD", "MqmftQ8wn0C4mKA1")
    connection_string = f"mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@chatwrapped.2o77p.mongodb.net/?retryWrites=true&w=majority&appName=chatwrapped"
    
    client = MongoClient(connection_string)
    db = client["my_database"]
    collection = db["messages"]

    user_data = collection.find_one({"username": username})
    if not user_data:
        return jsonify({'message': 'No data found for the given username'}), 404

    # Remove the MongoDB ObjectId from the response
    user_data.pop('_id', None)
    
    return jsonify(user_data)

@app.route('/api/update_content', methods=['POST'])
def update_content():
    user_data = request.json
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
    return jsonify({'message': 'Content updated successfully'})

@app.route('/api/update_content_from_db', methods=['POST'])
def update_content_from_db():
    username = request.json.get('username')
    if not username:
        return jsonify({'message': 'Username is required'}), 400

    MONGODB_USERNAME = os.environ.get("MONGODB_USERNAME", "chenchih")
    MONGODB_PASSWORD = os.environ.get("MONGODB_PASSWORD", "MqmftQ8wn0C4mKA1")
    connection_string = f"mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@chatwrapped.2o77p.mongodb.net/?retryWrites=true&w=majority&appName=chatwrapped"
    
    client = MongoClient(connection_string)
    db = client["my_database"]
    collection = db["messages"]

    user_data = collection.find_one({"username": username})
    if not user_data:
        return jsonify({'message': 'No data found for the given username'}), 404

    # Remove the MongoDB ObjectId from the response
    user_data.pop('_id', None)

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
    return jsonify({'message': 'Content updated successfully from database'})

if __name__ == '__main__':
    app.run(debug=True)
