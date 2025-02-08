# app.py
from flask import Flask, request, jsonify, send_from_directory
import os
import json

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

@app.route('/')
def serve_react_app():
    # Serves the compiled React app (index.html) from the build folder
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/upload', methods=['POST'])
def handle_upload():
    """
    Endpoint for handling file uploads from your React form.
    We'll parse the file as JSON, then return that data.
    """
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['file']
    username = request.form.get('username', None)

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    try:
        # Read raw file contents
        file_contents = file.read()
        # Attempt to parse as JSON
        data = json.loads(file_contents)
    except Exception as e:
        return jsonify({'message': f'Error reading or parsing JSON: {str(e)}'}), 400

    # Build the response data
    user_data = {
        'username': username,
        'fileData': data  # The parsed JSON data
    }
    print("Username:", username)
    print("Parsed JSON from file:", data)

    return jsonify({
        'message': 'File uploaded successfully!',
        'user_data': user_data
    }), 200

@app.route('/<path:path>', methods=['GET'])
def serve_static_files(path):
    """
    For any file that exists in the build folder, serve it.
    Otherwise, default to sending index.html (so React Router can handle routes).
    """
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8080)
