from flask import Flask

api = Flask(__name__)

@api.route('/api')
def my_login():
  response_body = {
    'api': 'version 1',
    'message': 'Hello World!'
  }

  return response_body