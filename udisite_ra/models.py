from datetime import datetime
from itsdangerous import URLSafeTimedSerializer as Serializer
from udisite_ra import db, login_manager, app
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    udi = db.Column(db.String(12), unique=True, nullable=False)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(60), nullable=False)
    # image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    encrypted_documents = db.relationship('EncryptedDocument', backref='owner', lazy=True)

    # def __init__(self, udi, username, email, hashed_password):
    #     self.udi = udi
    #     self.username = username
    #     self.email = email
    #     self.hashed_password = hashed_password
    #     # self.image_file = image_file
    
    def __repr__(self):
        return f"User('{self.udi}', '{self.username}', '{self.email}')"

class EncryptedDocument(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    document_data = db.Column(db.LargeBinary, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)