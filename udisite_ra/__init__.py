from flask import Flask, Response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = '1faf3789fcb690642fb45ec5a25f7faf62d2cc7e1612443746d33ccbb6e8642c'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.root_path, 'database.db')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'

from udisite_ra.server.users.routes import users
from udisite_ra.server.main.routes import main

app.register_blueprint(users)
app.register_blueprint(main)