import os
from flask import Flask, request, jsonify, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from udisite_ra import db, bcrypt, app 
import tensorflow as tf  # Assuming you're using TensorFlow for your model

users = Blueprint('users', __name__)

# Load your pre-trained ML model
def load_model():
    model = tf.keras.models.load_model(r'C:\Users\VARUN\Desktop\UID\UDI-react-app\udisite_ra\server\ML_models\keras_model.h5')
    return model

# Create a global variable for the loaded model
loaded_model = load_model()

@app.route('/api/signup', methods=['POST','GET'])
def signup():
    data = request.form

    # You can now access the form fields as follows
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    re_enter_password = data.get('reEnterPassword')
    documents = request.files.getlist('documents')  # Assuming this is an array of file names
    
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
    # for document_filename in documents:
    #     # Construct the path to the document
    #     document_path = os.path.join('path_to_upload_folder', document_filename)
        
    #     # Load and preprocess the document for classification
    #     # You'll need to implement this part based on your model's requirements
    #     # Here, we'll assume your model accepts images and performs classification
    #     # You may need to preprocess the document accordingly
    #     document_image = preprocess_document(document_path)
        
    #     # Use the loaded model to perform classification
    #     classification_result = loaded_model.predict(document_image)
        
    #     # Append the classification result to the list
    #     document_results.append({
    #         'document_filename': document_filename,
    #         'classification_result': classification_result.tolist(),
    #     })

    # You can perform further processing or validation here
    # ...

    # Return a response with document results (you can customize this)
    response_data = {
        'message': 'Sign-up successful!',
        'document_results': document_results,
    }
    return jsonify(response_data), 200
