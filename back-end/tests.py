import unittest
import requests
import json

"""
    White-box tests for the backend API.
    To run the tests:
        1. Run the backend server by running `flask run` in the back-end directory
        2. In a new terminal, run `python tests.py` in the back-end directory
"""

class TestLogin(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
    def test_login_success(self):
        # Test login endpoint
        response = requests.post('http://127.0.0.1:5000/login', json={"username": "adam.cameron@aaier.ca", "password": "password"})
        
        # Check if the response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"success": True, "message": "Login successful", "access_token": "accessgranted", "user_id": 1})
    
    
    def test_login_failure(self):
        # Test login endpoint
        response = requests.post('http://127.0.0.1:5000/login', json={"username": "username", "password": "password"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"success": False, "message": "Login failed: Incorrect credentials"})
    
    
    def test_login_missing_username(self):
        # Test login endpoint
        response = requests.post('http://127.0.0.1:5000/login', json={"password": "password"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"success": False, "message": "Login failed: Missing credentials"})
    
    def test_login_missing_password(self):
        # Test login endpoint
        response = requests.post('http://127.0.0.1:5000/login', json={"username": "username"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"success": False, "message": "Login failed: Missing credentials"})
        
    def test_login_missing_credentials(self):
        # Test login endpoint
        response = requests.post('http://127.0.0.1:5000/login', json={})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"success": False, "message": "Login failed: Missing credentials"})
    
class TestGetUser(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
    def test_get_user_success(self):
        # Test get_user endpoint
        response = requests.post('http://127.0.0.1:5000/get_user', json={"user_id": "1"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "message": "User found",
            "success": True,
            "user": [1, 
                     "Adam Cameron",
                     "adam.cameron@aaier.ca",
                     "admin",
                     "computer",
                     "IT"
        ]})
        
    def test_get_user_failure(self):
        # Test get_user endpoint
        response = requests.post('http://127.0.0.1:5000/get_user', json={"user_id": "1600"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Error finding user: Invalid user_id", "success": False})

class TestGetUserTickets(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
        # Create a new ticket
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
    
    def test_get_user_tickets_requestor_success(self):
        # Test get_users endpoint
        response = requests.post('http://127.0.0.1:5000/get_user_tickets', 
                                json={"user_id": "6"})
        
        # Setting timestamp to None because it is not possible to predict or control
        response_edited = response.json()
        response_edited['tickets'][0][6] = "None"
        
        # Check if response is correct      
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_edited, {
            "message": "Tickets found",
            "success": True,
            "tickets": [
                [1, 
                6,
                1,
                'Test ticket',
                'Test description',
                'computer',
                'None',
                'low',
                'open',
                None,
                '0 16 * * 4'
                ]
            ]
        })
    
    def test_get_user_tickets_assignee_success(self):
        # Test get_users endpoint
        response = requests.post('http://127.0.0.1:5000/get_user_tickets',
                                json={"user_id": "1"})
        
        # Setting timestamp to None because it is not possible to predict or control
        response_edited = response.json()
        response_edited['tickets'][0][6] = "None"
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_edited, {
            "message": "Tickets found",
            "success": True,
            "tickets": [
                [1, 
                6,
                1,
                'Test ticket',
                'Test description',
                'computer',
                'None',
                'low',
                'open',
                None,
                '0 16 * * 4'
                ]
            ]
        })
        
    def test_get_user_tickets_failure(self):
        # Test get_users endpoint
        response = requests.post('http://127.0.0.1:5000/get_user_tickets', json={"user_id": "1600"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Error finding tickets: Invalid user_id", "success": False})
            
    def test_get_user_tickets_multiple(self):
        # Create a new ticket
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket 2",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
        # Test get_users endpoint
        response = requests.post('http://127.0.0.1:5000/get_user_tickets', json={"user_id": "1"})
        
        response_edited = response.json()
        for i in range(len(response_edited['tickets'])):
            response_edited['tickets'][i][6] = "None"
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_edited, {
            "message": "Tickets found",
            "success": True,
            "tickets": [
                [1, 
                6,
                1,
                'Test ticket',
                'Test description',
                'computer',
                'None',
                'low',
                'open',
                None,
                '0 16 * * 4'
                ],
                [2,
                 6,
                 1,
                 'Test ticket 2',
                 'Test description',
                 'computer',
                 'None',
                 'low',
                 'open',
                 None,
                 '0 16 * * 4'
                 ]
            ]
        })
    
class TestCreateTicket(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
    def test_create_ticket_success(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Ticket created", "success": True, "ticket_id": 1})
        
    def test_create_ticket_invalid_user(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "1600",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not created: Invalid requestor_id", "success": False})
        
    def test_create_ticket_missing_title(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not created: Invalid title", "success": False})
    
    def test_create_ticket_missing_requestor_id(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not created: Invalid requestor_id", "success": False})
        
    def test_create_ticket_missing_description(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "category": "computer",
            "priority": "low",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not created: Invalid description", "success": False})
        
    def test_create_ticket_missing_category(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "priority": "low",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not created: Invalid category", "success": False})
        
    def test_create_ticket_missing_priority(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not created: Invalid priority", "success": False})
    
    def test_create_ticket_invalid_category(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "invalid",
            "priority": "low",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not created: Invalid category", "success": False})
        
    def test_create_ticket_invalid_priority(self):
        # Test create_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "invalid",
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not created: Invalid priority", "success": False})
            
class TestGetTicket(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')

        # Create a new ticket
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
    def test_get_ticket_success(self):
        # Test get_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/get_ticket', json={"ticket_id": "1"})
        
        # Setting timestamp to None because it is not possible to predict or control
        response_edited = response.json()
        response_edited['ticket'][6] = "None"
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_edited, {
            "message": "Ticket found",
            "success": True,
            "ticket": [
                1, 
                6,
                1,
                'Test ticket',
                'Test description',
                'computer',
                'None',
                'low',
                'open',
                None,
                '0 16 * * 4'
            ]
        })
        
    def test_get_ticket_failure(self):
        # Test get_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/get_ticket', json={"ticket_id": "1600"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not found: Invalid ticket_id", "success": False})
        
class TestGetAllTickets(unittest.TestCase):
    def setUp(self):
        self.maxDiff = None
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
        # Create a new ticket
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
    
    def test_get_all_tickets_success(self):
        # Test get_all_tickets endpoint
        response = requests.post('http://127.0.0.1:5000/get_all_tickets', json={})
        
        # Setting timestamp to None because it is not possible to predict or control
        response_edited = response.json()
        for i in range(len(response_edited['tickets'])):
            response_edited['tickets'][i][6] = "None"
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_edited, {
            "message": "Tickets found",
            "success": True,
            "tickets": [
                [1, 
                6,
                1,
                'Test ticket',
                'Test description',
                'computer',
                'None',
                'low',
                'open',
                None,
                '0 16 * * 4'
                ]
            ]
        })
        
    def test_get_all_tickets_multiple(self):
        # Create a new ticket
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket 2",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
        # Test get_all_tickets endpoint
        response = requests.post('http://127.0.0.1:5000/get_all_tickets', json={})
        
        # Setting timestamp to None because it is not possible to predict or control
        response_edited = response.json()
        for i in range(len(response_edited['tickets'])):
            response_edited['tickets'][i][6] = "None"
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_edited, {
            "message": "Tickets found",
            "success": True,
            "tickets": [
                [1, 
                6,
                1,
                'Test ticket',
                'Test description',
                'computer',
                'None',
                'low',
                'open',
                None,
                '0 16 * * 4'
                ],
                [2,
                 6,
                 1,
                 'Test ticket 2',
                 'Test description',
                 'computer',
                 'None',
                 'low',
                 'open',
                 None,
                 '0 16 * * 4'
                 ]
            ]
        })
        
class TestGetUserSchedule(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
        # Set user 1's schedule
        response = requests.post('http://127.0.0.1:5000/set_user_schedule', json={
            "user_id": "1",
            "schedule": ["0 16 * * 4"]
        })
        
    def test_get_user_schedule_success(self):
        # Test get_user_schedule endpoint
        response = requests.post('http://127.0.0.1:5000/get_user_schedule', json={"user_id": "1"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Schedule found", "schedule": ["0 16 * * 4"], "success": True})
        
    def test_get_user_schedule_invalid_user(self):
        # Test get_user_schedule endpoint
        response = requests.post('http://127.0.0.1:5000/get_user_schedule', json={"user_id": "1600"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Schedule not found: Invalid user_id", "success": False})
        
class TestSetUserSchedule(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
    def test_set_user_schedule_success(self):
        # Test set_user_schedule endpoint
        response = requests.post('http://127.0.0.1:5000/set_user_schedule', json={
            "user_id": "1",
            "schedule": ["0 16 * * 4"]
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Schedule set", "success": True})
        
    def test_set_user_schedule_bad_cron_string(self):
        # Test set_user_schedule endpoint
        response = requests.post('http://127.0.0.1:5000/set_user_schedule', json={
            "user_id": "1",
            "schedule": "0 16 * * 8 2 2 2"
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Error setting schedule: Invalid cronstring", "success": False})
        
    def test_set_user_schedule_invalid_user(self):
        # Test set_user_schedule endpoint
        response = requests.post('http://127.0.0.1:5000/set_user_schedule', json={
            "user_id": "1600",
            "schedule": "0 16 * * 4"
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Error setting schedule: Invalid user_id", "success": False})
    
class TestUpdateTicket(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
        # Create a new ticket
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
    def test_update_ticket_success(self):
        # Test update_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/update_ticket', json={
            "ticket_id": "1",
            "status": "closed",
            "assignee_id": "1",
            "notes": "Test notes"
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Ticket updated", "success": True})
        
        # Test that the ticket was updated
        response = requests.post('http://127.0.0.1:5000/get_ticket', json={"ticket_id": "1"})
        
        # Setting timestamp to None because it is not possible to predict or control
        response_edited = response.json()
        response_edited['ticket'][6] = "None"
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_edited, {
            "message": "Ticket found",
            "success": True,
            "ticket": [
                1, 
                6,
                1,
                'Test ticket',
                'Test description',
                'computer',
                'None',
                'low',
                'closed',
                'Test notes',
                '0 16 * * 4'
            ]
        })
        
    def test_update_ticket_invalid_ticket_id(self):
        # Test update_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/update_ticket', json={
            "ticket_id": "1600",
            "status": "closed",
            "assignee_id": "1",
            "notes": "Test notes"
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Error updating ticket: Invalid ticket_id", "success": False})
        
    def test_update_ticket_invalid_status(self):
        # Test update_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/update_ticket', json={
            "ticket_id": "1",
            "status": "invalid",
            "assignee_id": "1",
            "notes": "Test notes"
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Error updating ticket: Invalid status", "success": False})
        
    def test_update_ticket_invalid_assignee_id(self):
        # Test update_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/update_ticket', json={
            "ticket_id": "1",
            "status": "closed",
            "assignee_id": "1600",
            "notes": "Test notes"
        })
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Error updating ticket: Invalid assignee_id", "success": False})
        
class TestDeleteTicket(unittest.TestCase):
    def setUp(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
        # Create a new ticket
        response = requests.post('http://127.0.0.1:5000/create_ticket', json={
            "title": "Test ticket",
            "requestor_id": "6",
            "description": "Test description",
            "category": "computer",
            "priority": "low",
        })
        
    def test_delete_ticket_success(self):
        # Test delete_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/delete_ticket', json={"ticket_id": "1"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Ticket deleted", "success": True})
        
        # Test that the ticket was deleted
        response = requests.post('http://127.0.0.1:5000/get_ticket', json={"ticket_id": "1"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Ticket not found: Invalid ticket_id", "success": False})
        
    def test_delete_ticket_invalid_ticket_id(self):
        # Test delete_ticket endpoint
        response = requests.post('http://127.0.0.1:5000/delete_ticket', json={"ticket_id": "1600"})
        
        # Check if response is correct
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {"message": "Error deleting ticket: Invalid ticket_id", "success": False})

if __name__ == '__main__':
    unittest.main()