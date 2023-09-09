from flask import request, Blueprint

main = Blueprint('main', __name__)

@main.route('/')
@main.route('/home')
def home():
    return {'Hello': 'world'}

@main.route('/services')
def about():
    pass

@main.route('/dashboard')
def dashboard():
    pass