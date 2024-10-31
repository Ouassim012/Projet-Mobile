from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
mongo = PyMongo(app)

# User Registration Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email or password is missing
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if email already exists
    if mongo.db.users.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 409

    # Hash the password before saving
    hashed_password = generate_password_hash(password)
    mongo.db.users.insert_one({"email": email, "password": hashed_password})

    return jsonify({"message": "Registration successful"}), 201

# User Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email or password is missing
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Find the user by email
    user = mongo.db.users.find_one({"email": email})

    # If user exists and password is correct
    if user and check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful"}), 200
    
    # If credentials are incorrect
    return jsonify({"error": "Invalid email or password"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
