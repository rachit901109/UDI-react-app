import os
from flask import Flask, request, jsonify, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from udisite_ra import db, bcrypt, app 
import tensorflow as tf  
from udisite_ra.models import User
from udisite_ra.server.users.utils import isValidAadhaarNumber, isValidPanCardNo
from flask import flash
from PIL import Image
from udisite_ra.server.ML_models.document_classification import get_classification_report
from udisite_ra.server.users.utils import get_aadhar_info, get_pan_info


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
        flash('Username already exists', 'error')
        return jsonify({'error': 'Username already exists'}), 400

    if existing_email:
        flash('Email already exists', 'error')
        return jsonify({'error': 'Email already exists'}), 400

    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf8')
    
    folder_path = r'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\users\temp'
    
    print(username,email,password,documents)
    os.chmod(folder_path, 0o777)
    
    for index,doc in enumerate(documents):
        doc.save(fr'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\users\temp\{index}.jpeg')
    
    document_results = {}
    
    for index,doc in enumerate(documents):
        document_image = fr'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\users\temp\{index}.jpeg'
        classification_result = get_classification_report(document_image)
        doc_name = classification_result['Class']
        document_results[doc_name] = document_image
        # print(classification_result)
        
    aadhar_front,aadhar_back,pan = "","",""
    for doc,doc_path in document_results.items():
        if doc == 'Aadhar Front':
            aadhar_front = doc_path
        if doc == 'Aadhar Back':
            aadhar_back = doc_path
        if doc == 'Pan':
            pan = doc_path
    
    print(aadhar_front,aadhar_back,pan)
    
    aadhar_number = get_aadhar_info(aadhar_front, aadhar_back)["Aadhar Number"]
    pan_number = get_pan_info(pan)["Pan Number"]
    
    print(aadhar_number, pan_number)
    
    
    
    #Ceating a user by using User model
    # user = User(udi='test',username=username, email=email, hashed_password=hashed_password)
    # db.session.add(user)
    # db.session.commit()
    

    # document_results = []
    # for i,document_filename in enumerate(documents):
    #     # Construct the path to the document
    #     document_image = os.path.join(r'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\users\temp', f'{i}.jpeg')
        
    #     # Load and preprocess the document for classification
    #     # You'll need to implement this part based on your model's requirements
    #     # Here, we'll assume your model accepts images and performs classification
    #     # You may need to preprocess the document accordingly
    #     # document_image = preprocess_document(document_path)
        
    #     # Use the loaded model to perform classification
    #     classification_result = loaded_model.predict(document_image)
        
    #     # Append the classification result to the list
    #     document_results.append({
    #         'document_filename': document_filename,
    #         'classification_result': classification_result.tolist(),
    #     })
        
    # print("HELLO------>>>",document_results)

    # You can perform further processing or validation here
    # ...

    # Return a response with document results (you can customize this)
    response_data = {
        'message': 'Sign-up successful!',
        'document_results': document_results,
    }
    return jsonify(response_data), 200
