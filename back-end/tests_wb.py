import unittest
import requests
import json

"""
    White-box tests for the backend API.
    To run the tests:
        1. Run the backend server by running `flask run` in the back-end directory
        2. In a new terminal, run `python tests_wb.py` in the back-end directory
"""

class TestLogin(unittest.TestCase):
    def setup(self):
        # Reset the database
        requests.get('http://127.0.0.1:5000/reset')
        
    def test_login_success(self):
        # Test login endpoint
        response = requests.post('http://127.0.0.1:5000/login', json={"username": "adam.cameron@aaier.ca", "password": "password"})
        
        # Check if the response is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"success": True, "message": "Login successful"})
    
    
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
    def setup(self):
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
                
    
    
    
    
if __name__ == '__main__':
    unittest.main()