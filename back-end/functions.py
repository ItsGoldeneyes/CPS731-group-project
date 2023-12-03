import sqlite3
from cron_descriptor import get_description, ExpressionDescriptor
import datetime
import random


def setup_db():
    query_strings = [
        "CREATE TABLE login( \
                user_id STRING NOT NULL PRIMARY KEY, \
                user_email STRING NOT NULL UNIQUE, \
                password STRING NOT NULL\
                )",
        "CREATE TABLE users(\
                user_id STRING NOT NULL PRIMARY KEY, \
                user_name STRING NOT NULL, \
                user_email STRING NOT NULL UNIQUE, \
                user_permissions STRING NOT NULL, \
                user_specialty STRING NOT NULL, \
                department STRING NOT NULL \
                )",
        "CREATE TABLE user_schedules(\
                user_id INTEGER NOT NULL PRIMARY KEY, \
                schedule STRING NOT NULL\
                )",
        "CREATE TABLE tickets(\
                ticket_id STRING NOT NULL PRIMARY KEY, \
                requestor_id STRING NOT NULL, \
                assignee_id STRING NOT NULL, \
                title STRING NOT NULL, \
                description STRING NOT NULL, \
                category STRING NOT NULL, \
                openedon STRING NOT NULL, \
                priority STRING NOT NULL, \
                status STRING NOT NULL, \
                notes STRING, \
                meeting_timestamp STRING NOT NULL\
                )"
    ]
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Remove all data from database
    cur.execute("DROP TABLE IF EXISTS login")
    cur.execute("DROP TABLE IF EXISTS users")
    cur.execute("DROP TABLE IF EXISTS user_schedules")
    cur.execute("DROP TABLE IF EXISTS tickets")
    for query in query_strings:
        cur.execute(query)
    con.close()
    
    # Create new admin users
    create_new_user("Adam Cameron", "adam.cameron@aaier.ca", 'admin', 'IT', specialty="computer")
    create_new_user("Rachita Singh", "rachita.singh@aaier.ca", 'admin', 'IT', specialty="phone")
    create_new_user("Inaya Rajwani", "inaya.rajwani@aaier.ca", 'admin', 'IT', specialty="other")
    create_new_user("Emily Chiu", "emily.chiu@aaier.ca", 'admin', 'IT', specialty="computer")
    create_new_user("Abee Allen", "abee.allen@aaier.ca", 'admin', 'IT', specialty="other")

    # Create new user users
    create_new_user("Ella Johnson", "ella.johnson@aaier.ca", "user", "Sales")
    create_new_user("Mason Adams", "mason.adams@aaier.ca", "user", "Marketing")
    create_new_user("Ava Mitchell", "ava.mitchell@aaier.ca", "user", "Finance")
    create_new_user("Logan Parker", "logan.parker@aaier.ca", "user", "Sales")
    create_new_user("Grace Turner", "grace.turner@aaier.ca", "user", "Marketing")
    create_new_user("Ethan Bailey", "ethan.bailey@aaier.ca", "user", "Finance")
    create_new_user("Lily Ward", "lily.ward@aaier.ca", "user", "Sales")
    create_new_user("Owen Sullivan", "owen.sullivan@aaier.ca", "user", "Marketing")
    create_new_user("Zoe Fisher", "zoe.fisher@aaier.ca", "user", "Finance")
    create_new_user("Carter Turner", "carter.turner@aaier.ca", "user", "Sales")
    create_new_user("Sophia Hughes", "sophia.hughes@aaier.ca", "user", "Marketing")
    create_new_user("Jackson Reynolds", "jackson.reynolds@aaier.ca", "user", "Finance")
    create_new_user("Olivia King", "olivia.king@aaier.ca", "user", "Sales")
    create_new_user("Liam Wells", "liam.wells@aaier.ca", "user", "Marketing")
    create_new_user("Chloe Carter", "chloe.carter@aaier.ca", "user", "Finance")
    create_new_user("Lucas Hayes", "lucas.hayes@aaier.ca", "user", "Sales")
    create_new_user("Avery Nelson", "avery.nelson@aaier.ca", "user", "Marketing")
    create_new_user("Scarlett Hughes", "scarlett.hughes@aaier.ca", "user", "Finance")
    create_new_user("Noah Turner", "noah.turner@aaier.ca", "user", "Sales")
    create_new_user("Emma Baker", "emma.baker@aaier.ca", "user", "Marketing")
    
    # Create randomized schedules for users
    for i in range(1, 25):
        schedule = []
        for j in range(1,6):
            schedule.append("0 " + str(random.randint(8, 18)) + " * * " + str(j))
        res, i = set_user_schedule(i, schedule)
        if res == False:
            print(i)
            
    # Set definite schedules for employees used for demonstration
    set_user_schedule(1, ["0 10 * * 1", "0 8 * * 2", "0 15 * * 3", "0 16 * * 4", "0 10 * * 5"])
    set_user_schedule(3, ["0 10 * * 1", "0 8 * * 2", "0 15 * * 3", "0 16 * * 2", "0 10 * * 5"])
    set_user_schedule(6, ["0 9 * * 1", "0 9 * * 2", "0 12 * * 3", "0 16 * * 4", "0 13 * * 5"])
    
    
def create_new_user(user_name, user_email, user_permissions, department, specialty="None", password="password"):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Verify user_email is valid
    if user_email == None:
        return False, "Invalid user_email"
    
    # Verify user_permissions is valid
    permissions = ["admin", "user"]
    if user_permissions not in permissions:
        return False, "Invalid user_permissions"
    
    # Verify department is valid
    departments = ["IT", "Sales", "Marketing", "Finance"]
    if department not in departments:
        return False, "Invalid department"
    
    # Verify specialty is valid
    specialties = ["computer", "phone", "other", "None"]
    if specialty not in specialties:
        return False, "Invalid specialty"
    
    # Verify password is valid
    if password == None:
        return False, "Invalid password"
    
    # Fetch new user_id
    results = cur.execute("SELECT MAX(user_id) FROM users")
    if results.fetchone()[0] == None:
        user_id = 1
    else:
        results = cur.execute("SELECT MAX(user_id) FROM users")
        max_id = results.fetchone()[0]
        user_id = max_id + 1
        
    cur.execute("INSERT INTO users VALUES(?,?,?,?,?,?)", (user_id, user_name, user_email, user_permissions, specialty, department)) 
    cur.execute("INSERT INTO login VALUES(?,?,?)", (user_id, user_email, password))
    cur.execute("INSERT INTO user_schedules VALUES(?,?)", (user_id, ""))
    con.commit()
    con.close()
    

def login(username, password):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Verify username and password are valid
    if username == None or password == None:
        return False, "Missing credentials"
    
    results = cur.execute("SELECT user_id FROM login WHERE user_email = ? AND password = ?", (username, password))
    user_id = results.fetchone()
    con.close()
    if user_id == None:
        return False, "Incorrect credentials"
    else:
        return user_id[0], "Login successful"


def get_user_tickets(user_id):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    con.close()

    
    # Verify user_id is valid
    results = cur.execute("SELECT user_id FROM users WHERE user_id = ?", (user_id,))
    if results.fetchone() == None:
        return False, "Invalid user_id"
    
    results = cur.execute("SELECT * FROM tickets WHERE requestor_id = ? OR assignee_id = ?", (user_id, user_id))
    tickets = results.fetchall()
    con.close()
    return tickets, "Tickets found"


def get_all_tickets():
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    results = cur.execute("SELECT * FROM tickets")
    tickets = results.fetchall()
    con.close()
    return tickets, "Tickets found"


def assign_personnel(specialty, requester_id):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()

    res = cur.execute(f'SELECT users.user_id, schedule FROM users inner join user_schedules on users.user_id = user_schedules.user_id where user_specialty = "{specialty}"')
    personnel_schedules = res.fetchall()
    customer_schedule, _ = get_user_schedule(requester_id)
    
    if personnel_schedules == None:
        return False, "No compatible IT personnel found"
    if customer_schedule  == None:
        return False, "Customer id not valid"
    
    for personnel in personnel_schedules:
        result = [x for x in personnel[1].split(',') if x in customer_schedule]
        if result == []:
            continue
        return personnel[0], result[0]

    return False, "No compatible IT personnel found"


def create_ticket(title, requestor_id, description, category, priority, notes):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Verify title is valid
    if title == None:
        return False, "Invalid title"
    
    # Verify requestor_id is valid
    results = cur.execute(f'SELECT user_id FROM users WHERE user_id = "{requestor_id}"')
    if results.fetchone() == None:
        return False, "Invalid requestor_id"
    
    # Verify category is valid
    results = cur.execute("SELECT category FROM tickets")
    categories = ["computer", "phone", "other"]
    if category not in categories:
        return False, "Invalid category"
    
    # Verify priority is valid

    priorities = ["low", "medium", "high",""]
    if priority not in priorities:
        return False, "Invalid priority"
    
    results = cur.execute("SELECT MAX(ticket_id) FROM tickets")
    if results.fetchone()[0] == None:
        ticket_id = 1
    else:
        results = cur.execute("SELECT MAX(ticket_id) FROM tickets")
        max_id = results.fetchone()[0]
        ticket_id = max_id + 1
    
    assignee_id, meeting_timestamp = assign_personnel(category, requestor_id)
    
    if assignee_id == False:
        return False, meeting_timestamp
    cur.execute("INSERT INTO tickets VALUES(?,?,?,?,?,?,?,?,?,?,?)", (ticket_id, requestor_id, assignee_id, title, description, category, 
                                                                      datetime.datetime.now(), priority, "Open", notes, meeting_timestamp))
    con.commit()
    con.close()
    return ticket_id, "Ticket created"


def get_ticket(ticket_id):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Verify ticket_id is valid
    results = cur.execute("SELECT ticket_id FROM tickets WHERE ticket_id = ?", (ticket_id,))
    if results.fetchone() == None:
        return False, "Invalid ticket_id"
    
    results = cur.execute("SELECT * FROM tickets WHERE ticket_id = ?", (ticket_id,))
    ticket = results.fetchone()
    con.close()
    return ticket, "Ticket found"


def get_user(user_id):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Verify user_id is valid
    results = cur.execute("SELECT user_id FROM users WHERE user_id = ?", (user_id,))
    if results.fetchone() == None:
        return False, "Invalid user_id"
    
    results = cur.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
    user = results.fetchone()
    con.close()
    return user, "User found"


def get_user_schedule(user_id):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Verify user_id is valid
    results = cur.execute("SELECT user_id FROM users WHERE user_id = ?", (user_id,))
    if results.fetchone() == None:
        return False, "Invalid user_id"
    
    results = cur.execute("SELECT schedule FROM user_schedules WHERE user_id = ?", (user_id,))
    schedule = results.fetchone()
    return schedule[0].split(","), "Schedule found"


def set_user_schedule(user_id, schedule):
    # Schedule is a list of cronstrings, e.g. ["0 6 * * 5", "0 6 * * 5"]
    # Convert to comma separated string
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Verify user_id is valid
    results = cur.execute("SELECT user_id FROM users WHERE user_id = ?", (user_id,))
    if results.fetchone() == None:
        return False, "Invalid user_id"
    
    for i in schedule:
        # Bad practice, but checking cronstring is valid
        try:
            get_description(i)
        except:
            return False, "Invalid cronstring"
    
    schedule = ",".join(schedule)
    
    cur.execute("UPDATE user_schedules SET schedule = ? WHERE user_id = ?", (schedule, user_id))
    con.commit()
    con.close()
    return True, "Schedule set"
    
    
def update_ticket(ticket_id, assignee_id, status, notes):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    
    # Verify ticket_id is valid
    results = cur.execute("SELECT ticket_id FROM tickets WHERE ticket_id = ?", (ticket_id,))
    if results.fetchone() == None:
        return False, "Invalid ticket_id"
    
    # Verify assignee_id is valid
    results = cur.execute("SELECT user_id FROM users WHERE user_id = ?", (assignee_id,))
    if results.fetchone() == None:
        return False, "Invalid assignee_id"
    
    # Verify status is valid
    if status not in ["open", "closed"]:
        return False, "Invalid status"
    
    cur.execute("UPDATE tickets SET assignee_id = ?, status = ?, notes = ? WHERE ticket_id = ?", (assignee_id, status, notes, ticket_id))
    con.commit()
    con.close()

    return True, "Ticket updated"
