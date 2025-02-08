from flask import Flask, request, jsonify
from flask_cors import CORS

from embed_and_reduce import get_embedding, reduce_dimensions
from db import save_document, get_all_submissions

app = Flask(__name__)
allowed_origins = ["https://tartanspace.xyz", "https://www.tartanspace.xyz", "http://localhost:3000"]
CORS(app, resources={r"/*": {"origins": allowed_origins}})

@app.route('/')
def hello_world():
    return "tartanspace"

@app.route('/form-submission', methods=['post'])
def process_submission():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    contact = request.json.get("contact")
    graduation_year = request.json.get("graduationYear")
    single = request.json.get("single")
    gender = request.json.get("gender")
    orientation = request.json.get("orientation")
    profile = request.json.get("profile")

    answer1 = request.json.get("question1")
    answer2 = request.json.get("question2")
    answer3 = request.json.get("question3")
    answer4 = request.json.get("question4")
    answer5 = request.json.get("question5")

    answers = [answer1, answer2, answer3, answer4, answer5]

    embedding = get_embedding(answers)

    data_dict = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "contact": contact,
        "graduation_year": graduation_year,
        "gender": gender,
        "orientation": orientation,
        "profile": profile,
        "embedding": embedding.tolist(),
        "single": single,
    }

    save_document(data_dict)

    return jsonify(status="Success", message="Submission processed and saved")

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