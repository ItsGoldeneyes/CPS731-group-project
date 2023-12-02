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
    
    # Check if username and password are provided without error
    if None in [data.get('username'), data.get('password')]:
      return {"success": False, "message": "Missing fields"}
  
    # Check if username and password are correct
    elif login(data.get('username'), data.get('password')):
      return {"success": True, "message": "Login successful"}
    else:
      return {"success": False, "message": "Login failed"}

      
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
    
    # Check if user_id is provided without error
    if data.get('user_id') == None:
        return {"success": False, "message": "Missing fields"}
    
    user = get_user(data.get('user_id'))
    if user == None:
        return {"success": False, "message": "User not found"}
    else:
        return {"success": True, "message": "User found", "user": user}


@app.route('/get_user_tickets', methods=['POST'])
def get_user_tickets_endpoint():
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
    
    # Check if user_id is provided without error
    if data.get('user_id') == None:
        return {"success": False, "message": "Missing fields"}
    
    tickets = get_user_tickets(data.get('user_id'))
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
    data = request.json
    
    # Check if all fields are provided without error
    if None in [data.get('title'), data.get('requestor_id'), data.get('description'), data.get('category'), data.get('priority'), data.get('notes')]:
        return {"success": False, "message": "Missing fields"}
    
    ticket_id = create_ticket(data.get('title'), 
                  data.get('requestor_id'), 
                  data.get('description'), 
                  data.get('category'), 
                  data.get('priority'), 
                  data.get('notes'))
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
    
    # Check if ticket_id is provided without error
    if data.get('ticket_id') == None:
        return {"success": False, "message": "Missing fields"}
    
    ticket = get_ticket(data.get('ticket_id'))
    if ticket == None:
        return {"success": False, "message": "Ticket not found"}
    else:
        return {"success": True, "message": "Ticket found", "ticket": ticket}
      
      
@app.route('/get_user_schedule', methods=['POST'])
def get_user_schedule_endpoint():
    '''
    POST
    {
        "user_id": "user_id"
    }

    RESPONSE
    {
        "success": true,
        "message": "Schedule found",
        "schedule": [cronstring, cronstring, ...]
    }
    '''
    data = request.json
    
    # Check if user_id is provided without error
    if data.get('user_id') == None:
        return {"success": False, "message": "Missing fields"}
    
    schedule = get_user_schedule(data.get('user_id'))
    if schedule == None:
        return {"success": False, "message": "Schedule not found"}
    else:
        return {"success": True, "message": "Schedule found", "schedule": schedule}
      
      
@app.route('/set_user_schedule', methods=['POST'])
def set_user_schedule_endpoint():
    '''
    POST
    {
        "user_id": "user_id",
        "schedule": [cronstring, cronstring, ...]
    }

    RESPONSE
    {
        "success": true,
        "message": "Schedule set"
    }
    '''
    data = request.json
    
    # Check if user_id and schedule are provided without error
    if None in [data.get('user_id'), data.get('schedule')]:
        return {"success": False, "message": "Missing fields"}
    
    set_user_schedule(data.get('user_id'), data.get('schedule'))
    return {"success": True, "message": "Schedule set"}
  

@app.route('/update_ticket', methods=['POST'])
def update_ticket_endpoint():
    '''
    POST
    {
        "ticket_id": "ticket_id",
        "status": "status",
        "assignee_id": "assignee_id",
        "notes": "notes"
    }

    RESPONSE
    {
        "success": true,
        "message": "Ticket updated"
    }
    '''
    data = request.json
    
    # Check if all fields are provided without error
    if None in [data.get('ticket_id'), data.get('status'), data.get('assignee_id'), data.get('notes')]:
        return {"success": False, "message": "Missing fields"}
    
    update_ticket(data.get('ticket_id'), data.get('status'), data.get('assignee_id'), data.get('notes'))
    return {"success": True, "message": "Ticket updated"}