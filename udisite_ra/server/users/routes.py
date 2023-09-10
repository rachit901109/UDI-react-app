import os
from flask import Flask, request, jsonify, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from udisite_ra import db, bcrypt, app 
import tensorflow as tf  
from udisite_ra.models import User
from udisite_ra.server.users.utils import isValidAadhaarNumber, isValidPanCardNo

users = Blueprint('users', __name__)

# Loading the pre-trained ML model
def load_model():
    model = tf.keras.models.load_model(r'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\ML_models\keras_model.h5')
    return model

# Creating a global variable for the loaded model
loaded_model = load_model()

@app.route('/api/signup', methods=['POST','GET'])
def signup():
    data = request.form

    #Accessing the form fields as follows:
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    # re_enter_password = data.get('reEnterPassword')
    documents = request.files.getlist('documents')  #this is an array of file names
    
    existing_user = User.query.filter_by(username=username).first()
    existing_email = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400
    
    if existing_email:
        return jsonify({'error': 'Email already exists'}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf8')
    
    #Ceating a user by using User model
    user = User(udi='TEST UDI',username=username, email=email, hashed_password=hashed_password)
    db.session.add(user)
    db.session.commit()
    
    
    
    file_data = request.files["documents"]
    # print(file_data)
    folder_path = r'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\users\temp'
    
    print(username,email,password,re_enter_password,documents)
    os.chmod(folder_path, 0o777)
    
    
    
    for index,doc in enumerate(documents):
        doc.save(fr'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\users\temp\{index}.jpeg')
    # for document in documents:
    #     print('HELLO')
    #     print(document)
    
    # Process each document using your loaded model
    document_results = []
    for i,document_filename in enumerate(documents):
        # Construct the path to the document
        document_image = os.path.join(r'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\users\temp', f'{i}.jpeg')
        
        # Load and preprocess the document for classification
        # You'll need to implement this part based on your model's requirements
        # Here, we'll assume your model accepts images and performs classification
        # You may need to preprocess the document accordingly
        # document_image = preprocess_document(document_path)
        
        # Use the loaded model to perform classification
        classification_result = loaded_model.predict(document_image)
        
        # Append the classification result to the list
        document_results.append({
            'document_filename': document_filename,
            'classification_result': classification_result.tolist(),
        })
        
    print("HELLO------>>>",document_results)

    # You can perform further processing or validation here
    # ...

    # Return a response with document results (you can customize this)
    response_data = {
        'message': 'Sign-up successful!',
        'document_results': document_results,
    }
    return jsonify(response_data), 200
