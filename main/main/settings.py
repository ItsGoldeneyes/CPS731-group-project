import os

if os.environ.get("DJANGO_ENV") == "PRODUCTION":
    from .production_settings import *
else:
    from .local_settings import *
    
    
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}