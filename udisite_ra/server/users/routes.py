from flask import Flask, request, jsonify, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from udisite_ra import db, bcrypt 

users = Blueprint('users', __name__)