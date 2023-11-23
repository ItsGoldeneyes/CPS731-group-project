from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from django.urls import get_resolver
from .models import Login 
import json



def index(request):
    # Get all URLs from the URL resolver
    url_patterns = get_resolver().url_patterns
    urls = [{'name': pattern.name, 'url': pattern.pattern._route} for pattern in url_patterns]

    # Render the index template with the list of URLs
    return render(request, 'index.html', {'urls': urls})

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # Authenticate the user
            user = authenticate_user(username=username, password=password)

            # Username and password are correct
            if user:
                return JsonResponse({'success': True, 'message': 'Login successful'}, status=200)
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