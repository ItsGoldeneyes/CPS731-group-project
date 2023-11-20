# Django REST Helpdesk Backend

## File Structure
```
CPS731-group-project/Phase 2/back-end
├── main/
│   ├── __init__.py
│   ├── asgi.py
│   ├── local_settings.py
│   ├── production_settings.py
│   ├── settings.py
│   ├── urls.py
│   ├── views.py
│   ├── wsgi.py
├── venv
│   ├── venv contents
├── db.sqlite3
├── helpdesk.db
├── manage.py
├── railway.json
├── README.md
├── requirements.txt
```

## Launching the backend locally

1. Clone this repository to your local machine:
   ```shell
   git clone https://github.com/ItsGoldeneyes/CPS731-group-project.git
   ```

2. Navigate to the backend directory:
   ```shell
   cd CPS731-group-project/Phase 2/back-end
   ```

3. Activate the virtual environment and install dependencies:
   ```shell
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Apply database migrations:
   ```shell
   python manage.py migrate
   ```

5. Run the development server:
   ```shell
   python manage.py runserver
   ```

## Configuration

This project includes two settings files:

- `production_settings.py`: Configuration for when the app is live on railway, it uses a secret key from the environment variables and a sqlite db

- `local_settings.py`: Configuration for local development uses a randomly generated secret key with sqlite db