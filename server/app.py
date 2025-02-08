from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sqlite3
import json
import numpy as np

# Import our chat history processing function and PCA function. # pca_to_3 should accept an Nxd matrix and return an Nx3 matrix

app = Flask(__name__)
CORS(app)
send_from_directory
# Define an upload folder.
UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def serve_react_app():
    # You can serve your React app's build or any static files here.
    return "Hello from Flask! (Or serve your React build here)"

serve_react_app()

@app.route('/api/upload', methods=['POST'])
def handle_upload():
    # Validate required parts of the request.
    if 'file' not in request.files or 'username' not in request.form:
        return jsonify({'message': 'Missing file or username'}), 400
    
    file = request.files['file']
    username = request.form['username']
    
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    
    # Save the uploaded file.
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)
    from main import process_chat_history, getStats
    # Process the chat history: This inserts the new record into the SQLite DB.
    inserted_id = process_chat_history(username, filepath)
    stats = getStats(username, filepath)
    print(inserted_id, stats)
    
    # -------------------------------
    # Run PCA on all embeddings in the DB.
    # -------------------------------
    # Connect to the SQLite database.
    conn = sqlite3.connect("chatwrapped.db")
    # Using a row factory to access columns by name.
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    
    # Query all embeddings from the table.
    cur.execute("SELECT embedding FROM messages")
    rows = cur.fetchall()
    conn.close()
    
    # Each embedding is stored as a JSON string.
    embeddings = []
    for row in rows:
        # Convert the JSON string back to a list (or nested list).
        embedding = json.loads(row['embedding'])
        embeddings.append(embedding)
    
    # Convert the list of embeddings into an Nxd numpy array.
    X = np.array(embeddings)
    from pca import pca_to_3 
    # Run PCA to reduce to 3 dimensions.
    coordinates = pca_to_3(X)  # coordinates is now an Nx3 numpy array
    return coordinates.toList()

if __name__ == '__main__':
    app.run(debug=False, port=8080)
