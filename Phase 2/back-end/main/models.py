from django.db import models

class Login(models.Model):
    user_id = models.CharField(primary_key=True, max_length=255)
    user_email = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)

class Users(models.Model):
    user_id = models.CharField(primary_key=True, max_length=255)
    user_name = models.CharField(max_length=255)
    user_email = models.CharField(unique=True, max_length=255)
    user_permissions = models.CharField(max_length=255)
    department = models.CharField(max_length=255)

class UserSchedules(models.Model):
    user_id = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    schedule = models.CharField(max_length=255)

class Tickets(models.Model):
    ticket_id = models.CharField(primary_key=True, max_length=255)
    requestor_id = models.CharField(max_length=255)
    assignee_id = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    meeting_timestamp = models.CharField(max_length=255)
