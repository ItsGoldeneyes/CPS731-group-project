import sqlite3
from cron_descriptor import get_description, ExpressionDescriptor

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
                department STRING NOT NULL\
                    )",
        "CREATE TABLE user_schedules(\
                user_id INTEGER NOT NULL PRIMARY KEY, \
                schedule STRING NOT NULL\
                    )",
        "CREATE TABLE tickets(\
                ticket_id STRING NOT NULL PRIMARY KEY, \
                requestor_id STRING NOT NULL, \
                assignee_id STRING NOT NULL, \
                department STRING NOT NULL, \
                meeting_timestamp STRING NOT NULL\
                    )"
    ]
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    for query in query_strings:
        cur.execute(query)
    con.close()
    
    # Create new admin users
    create_new_user("Adam Cameron", "adam.cameron@aaier.ca", 'admin', 'IT')
    create_new_user("Rachita Singh", "rachita.singh@aaier.ca", 'admin', 'IT')
    create_new_user("Inaya Rajwani", "inaya.rajwani@aaier.ca", 'admin', 'IT')
    create_new_user("Emily Chiu", "emily.chiu@aaier.ca", 'admin', 'IT')
    create_new_user("Abee Allen", "abee.allen@aaier.ca", 'admin', 'IT')

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
    

def create_new_user(user_name, user_email, user_permissions, department, password="password"):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    results = cur.execute("SELECT MAX(user_id) FROM users")
    if results.fetchone()[0] == None:
        user_id = 1
    else:
        results = cur.execute("SELECT MAX(user_id) FROM users")
        max_id = results.fetchone()[0]
        user_id = max_id + 1
        
    cur.execute("INSERT INTO users VALUES(?,?,?,?,?)", (user_id, user_name, user_email, user_permissions, department)) 
    cur.execute("INSERT INTO login VALUES(?,?,?)", (user_id, user_email, password))
    cur.execute("INSERT INTO user_schedules VALUES(?,?)", (user_id, ""))
    con.commit()
    con.close()
    

def login(username, password):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    results = cur.execute("SELECT user_id FROM login WHERE user_email = ? AND password = ?", (username, password))
    user_id = results.fetchone()
    con.close()
    if user_id == None:
        return None
    else:
        return user_id[0]

def create_ticket(title, category, requestor_id, assignee_id, description, notes):
    con = sqlite3.connect('helpdesk.db')
    cur = con.cursor()
    con.close()