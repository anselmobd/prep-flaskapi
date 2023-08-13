from datetime import datetime
from pprint import pprint
from config import app, db
from models import Person, Note


with app.app_context():
    people = Person.query.all()
    for person in people:
        pprint(person.notes)
