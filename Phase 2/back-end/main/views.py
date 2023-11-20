from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def login_helper(username, password):
    return True

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # Authenticate the user
            user = login_helper(username=username, password=password)

            # Username and password are correct
            if user==True:
                return JsonResponse({'success': True, 'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=403)
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data'}, status=400)
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)