from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from django.urls import get_resolver
from .models import *
import json


@csrf_exempt
def index(request):
    # Get all URLs from the URL resolver
    url_patterns = get_resolver().url_patterns
    urls = [{'name': pattern.name, 'url': pattern.pattern._route} for pattern in url_patterns]

    # Render the index template with the list of URLs
    return render(request, 'index.html', {'urls': urls})


def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate_user(username=username, password=password)

            # Username and password are correct
            if user:
                return JsonResponse({'success': True, 'message': 'Login successful'}, status=200)
            # Username and password are incorrect
            else:
                return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=403)
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data'}, status=400)
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)

def authenticate_user(username, password):
    try:
        # Get the user with the given username from the Login model
        user = Login.objects.get(user_id=username)

        # Check if the password is correct using Django's check_password function
        if check_password(password, user.password):
            return user
        else:
            return None

    except Login.DoesNotExist:
        # Username does not exist
        return None
    
    
def ticket_info(request):
    if request.method == "GET":
        try:
            data = json.loads(request.body)
            ticket_id = data.get('ticket_id')
            
            ticket = get_ticket(ticket_id=ticket_id)
            
            # Ticket ID is correct
            if ticket:
                meetings = ticket.ticketmeetings_set.all()
                meetings = [{'meeting_id': meeting.meeting_id, 'meeting_date': meeting.meeting_date, 'meeting_time': meeting.meeting_time} for meeting in meetings]
                return JsonResponse({'success': True, 'message': 'Ticket found',
                                     'ticket':{ticket.ticket_id: ticket.ticket_id,
                                               ticket.requestor_id: ticket.requestor_id,
                                               ticket.assignee_id: ticket.assignee_id,
                                               ticket.opened_on: ticket.opened_on,
                                               ticket.updated_on: ticket.updated_on,
                                               ticket.priority: ticket.priority,
                                               ticket.category: ticket.category,
                                               ticket.description: ticket.description,
                                               ticket.notes: ticket.notes},
                                     'meetings':meetings,
                                     }, status=200)
            # Ticket ID is incorrect
            else:
                return JsonResponse({'success': False, 'message': 'Ticket not found',
                                    'ticket':{}, 'meetings': {} }, status=403)
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data',
                                    'ticket':{}, 'meetings': {} }, status=400)
    return JsonResponse({'success': False, 'message': 'Invalid request method',
                                    'ticket':{}, 'meetings': {} }, status=405)


def get_ticket(ticket_id):
    try:
        # Get the ticket with the given ticket_id from the Tickets model
        ticket = Tickets.objects.get(ticket_id=ticket_id)
        
        return ticket
    except Tickets.DoesNotExist:
        return None