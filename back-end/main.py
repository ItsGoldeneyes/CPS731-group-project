from flask import Flask, request
from functions import *
import os

app = Flask(__name__)

@app.route('/')
def root_route():
  response_body = {
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
  

@app.route('/view_all_tickets', methods=['POST'])
def view_all_tickets_endpoint():
    '''
    POST
    {
        "user_id": "user_id"
    }

    RESPONSE
    {
        "success": true,
        "message": "Tickets found",
        "tickets": [
            {
                "ticket_id": "ticket_id",
                "requestor_id": "requestor_id",
                "assignee_id": "assignee_id",
                "opened_on": "opened_on",
                "updated_on": "updated_on",
                "priority": "priority",
                "category": "category",
                "description": "description",
                "notes": "notes"
            }
        ]
    }
    '''
    data = request.json
    tickets = view_all_tickets(data.get('user_id'))
    if tickets == None:
        return {"success": False, "message": "No tickets found"}
    else:
        return {"success": True, "message": "Tickets found", "tickets": tickets}
  
  
@app.route('/create_ticket', methods=['POST'])
def create_ticket_endpoint():
    '''
    POST
    {
        "title": "title",
        "requestor_id": "requestor_id",
        "description": "description",
        "category": "category",
        "priority": "priority",
        "notes": "notes",
    }

    RESPONSE
    {
        "success": true,
        "message": "Ticket created"
        "ticket_id": "ticket_id"
    }
    '''
    ticket_id = create_ticket(request.json.get('title'), 
                  request.json.get('requestor_id'), 
                  request.json.get('description'), 
                  request.json.get('category'), 
                  request.json.get('priority'), 
                  request.json.get('notes'))
    return {"success": True, "message": "Ticket created", "ticket_id": ticket_id}
  
  
@app.route('/get_ticket', methods=['POST'])
def get_ticket_endpoint():
    '''
    POST
    {
        "ticket_id": "ticket_id"
    }

    RESPONSE
    {
        "success": true,
        "message": "Ticket found",
        "ticket": {
            "ticket_id": "ticket_id",
            "requestor_id": "requestor_id",
            "assignee_id": "assignee_id",
            "opened_on": "opened_on",
            "updated_on": "updated_on",
            "priority": "priority",
            "category": "category",
            "description": "description",
            "notes": "notes"
        }
    }
    '''
    data = request.json
    ticket = get_ticket(data.get('ticket_id'))
    if ticket == None:
        return {"success": False, "message": "Ticket not found"}
    else:
        return {"success": True, "message": "Ticket found", "ticket": ticket}
      
      
@app.route('/get_user', methods=['POST'])
def get_user_endpoint():
    '''
    POST
    {
        "user_id": "user_id"
    }

    RESPONSE
    {
        "success": true,
        "message": "User found",
        "user": {
            "user_id": "user_id",
            "user_name": "user_name",
            "user_email": "user_email",
            "user_permissions": "user_permissions",
            "specialty": "specialty",
            "department": "department"
        }
    }
    '''
    data = request.json
    user = get_user(data.get('user_id'))
    if user == None:
        return {"success": False, "message": "User not found"}
    else:
        return {"success": True, "message": "User found", "user": user}