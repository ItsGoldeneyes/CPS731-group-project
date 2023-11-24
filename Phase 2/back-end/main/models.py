from django.db import models

class Login(models.Model):
    user_id = models.CharField(primary_key=True, max_length=255)
    user_email = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'login'
        app_label = 'main'
        
class Users(models.Model):
    user_id = models.CharField(primary_key=True, max_length=255)
    user_name = models.CharField(max_length=255)
    user_email = models.CharField(unique=True, max_length=255)
    user_permissions = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'users'
        app_label = 'main'

class UserSchedules(models.Model):
    user_id = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    schedule = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'userschedules'
        app_label = 'main'

class Tickets(models.Model):
    ticket_id = models.CharField(primary_key=True, max_length=255)
    requestor_id = models.CharField(max_length=255)
    assignee_id = models.CharField(max_length=255)
    opened_on = models.CharField(max_length=255)
    updated_on = models.CharField(max_length=255)
    priority = models.IntegerField()
    category = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    notes = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'tickets'
        app_label = 'main'
    
class TicketMeetings(models.Model):
    ticket_id = models.ForeignKey(Tickets, on_delete=models.CASCADE)
    meeting_id = models.CharField(max_length=255)
    meeting_date = models.CharField(max_length=255)
    meeting_time = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'ticketmeetings'
        app_label = 'main'
