# Northroom

A small Django journal with registration, login, logout, and password reset. Signed-in people can publish notes.

## Run

```bash
cd level-3/task-1-auth-app
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open http://127.0.0.1:8000/

Register an account, then use New note. Password reset asks for the account email and, in this local demo, shows the reset link on the next page. The same message is printed in the terminal.
