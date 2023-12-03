from flask import Flask, request
from flask_cors import CORS, cross_origin # pip install Flask-Cors
from functions import *
import os

app = Flask(__name__)

CORS(app, supports_credentials=True)

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
  
    # Check if username and password are correct
    status, reason = login(data.get('username'), data.get('password')) 
    if not status:
      return {"success": False, "message": "Login failed: {}".format(reason)}, 403
    else:
      return {"success": True, "message": "Login successful", "user_id": status}

      
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
    
    user, reason = get_user(data.get('user_id'))
    if not user:
        return {"success": False, "message": "Error finding user: {}".format(reason)}, 403
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
                "title": "title",
                "description": "description",
                "category": "category",
                "opened_on": "opened_on",
                "priority": "priority",
                "status": "status",
                "notes": "notes",
                "meeting_timestamp": "meeting_timestamp"
            }
        ]
    }
    '''
    data = request.json
    
    tickets, reason = get_user_tickets(data.get('user_id'))
    if tickets == None:
        return {"success": False, "message": "Error finding ticket: {}".format(reason)}, 403
    else:
        return {"success": True, "message": "Tickets found", "tickets": tickets}


@app.route('/get_all_tickets', methods=['POST'])
def get_all_tickets_endpoint():
    '''
    POST
    {}

    RESPONSE
    {
        "success": true,
        "message": "Tickets found",
        "tickets": [
            {               
                "ticket_id": "ticket_id",
                "requestor_id": "requestor_id",
                "assignee_id": "assignee_id",
                "title": "title",
                "description": "description",
                "category": "category",
                "opened_on": "opened_on",
                "priority": "priority",
                "status": "status",
                "notes": "notes",
                "meeting_timestamp": "meeting_timestamp"
            },
            ...
        ]
    }
    '''
    data = request.json
    
    tickets, reason = get_all_tickets()
    if not tickets:
        return {"success": False, "message": "Error finding tickets: {}".format(reason)}, 403
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
    
    ticket_id, reason = create_ticket(data.get('title'), 
                                    data.get('requestor_id'), 
                                    data.get('description'), 
                                    data.get('category'), 
                                    data.get('priority'), 
                                    data.get('notes'))
    if not ticket_id:
        return {"success": False, "message": "Ticket not created: {}".format(reason)}, 403
    else:
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
    
    ticket, reason = get_ticket(data.get('ticket_id'))
    if not ticket:
        return {"success": False, "message": "Ticket not found: {}".format(reason)}, 403
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
    
    schedule, reason = get_user_schedule(data.get('user_id'))
    if not schedule:
        return {"success": False, "message": "Schedule not found: {}".format(reason)}, 403
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
    
    schedule, reason = set_user_schedule(data.get('user_id'), data.get('schedule'))
    if not schedule:
        return {"success": False, "message": "Error setting schedule: {}".format(reason)}, 403
    else:
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
    
    ticket, reason = update_ticket(data.get('ticket_id'), data.get('assignee_id'), data.get('status'), data.get('notes'))
    if not ticket:
        return {"success": False, "message": "Error updating ticket: {}".format(reason)}, 403
    else:
        return {"success": True, "message": "{}".format(reason)}