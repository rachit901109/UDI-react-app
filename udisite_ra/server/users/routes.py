from flask import Flask, request, jsonify, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from udisite_ra import db, bcrypt, app 

users = Blueprint('users', __name__)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json 

    # You can now access the form fields as follows
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    re_enter_password = data.get('reEnterPassword')
    documents = data.get('documents')  # Assuming this is an array of file names

    # You can perform further processing or validation here
    # ...
    print(username, email, password)

    # Return a response (you can customize this)
    response_data = {'message': 'Sign-up successful!'}
    return jsonify(response_data), 200