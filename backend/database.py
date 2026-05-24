from sqlmodel import SQLModel, create_engine
from models import Card

DATABASE_URL = "sqlite:///./flashcards.db"
engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    SQLModel.metadata.create_all(engine)
    # it looks for all of tables and creates them in the db
