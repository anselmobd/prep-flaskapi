from datetime import datetime
from marshmallow import validates, ValidationError
from marshmallow_sqlalchemy import fields

from config import db, ma


class Note(db.Model):
    __tablename__ = "note"
    id = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey("person.id"))
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class NoteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Note
        load_instance = True
        sqla_session = db.session
        include_fk = True

    @validates("content")
    def validate_content(self, value):
        if not value.strip():  # Verifica se a string contém apenas espaços em branco
            raise ValidationError("Content cannot be empty or contain only spaces.")


class Person(db.Model):
    __tablename__ = "person"
    id = db.Column(db.Integer, primary_key=True)
    lname = db.Column(db.String(32), nullable=False)
    fname = db.Column(db.String(32))
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    notes = db.relationship(
        Note,
        backref="person",
        cascade="all, delete, delete-orphan",
        single_parent=True,
        order_by="desc(Note.timestamp)"
    )


class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person
        load_instance = True
        sqla_session = db.session
        include_relationships = True
    notes = fields.Nested(NoteSchema, many=True)

    @validates("lname")
    def validate_lname(self, value):
        if not value.strip():  # Verifica se a string contém apenas espaços em branco
            raise ValidationError("Lastname cannot be empty or contain only spaces.")


note_schema = NoteSchema()
person_schema = PersonSchema()
people_schema = PersonSchema(many=True)
