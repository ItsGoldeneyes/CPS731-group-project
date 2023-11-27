from flask import Flask
from functions import *

api = Flask(__name__)

@api.route('/api')
def my_login():
  response_body = {
    'api': 'version 1',
    'message': 'Hello World!'
  }

  return response_body


@api.route('/reset')
def reset():
    setup_db()
    return "Database reset"
