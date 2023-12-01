from flask import Flask, request
from functions import *
import os

app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))

@app.route('/api')
def my_login():
  response_body = {
    'api': 'version 1',
    'message': 'Hello World!'
  }
  return response_body


@app.route('/reset')
def reset_endpoint():
    setup_db()
    return "Database reset"


@app.route('/login', methods=['POST'])
def login_endpoint():
    '''
    POST
    {
        "username": "username",
        "password": "password"
    }
    
    RESPONSE
    {
        "success": true,
        "message": "Login successful"
    }
    '''
    data = request.json
    if login(data.get('username'), data.get('password')):
      return {"success": True, "message": "Login successful"}
    else:
      return {"success": False, "message": "Login failed"}
  
  
# @api.route('/ticket_info', methods=['POST']):
#     '''
#     POST
#     {
#         "ticket_id": "ticket_id"
#     }

#     RESPONSE
#     {
#         "success": true,
#         "message": "Ticket found",
#         "ticket": {
#             "ticket_id": "ticket_id",
#             "requestor_id": "requestor_id",
#             "assignee_id": "assignee_id",
#             "opened_on": "opened_on",
#             "updated_on": "updated_on",
#             "priority": "priority",
#             "category": "category",
#             "description": "description",
#             "notes": "notes"
#         },
#         "meetings": [
#             {
#                 "meeting_id": "meeting_id",
#                 "meeting_date": "meeting_date",
#                 "meeting_time": "meeting_time"
#             },
#             ...
#         ]
#     }
#     '''
#     pass