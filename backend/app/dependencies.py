from sqlmodel import Session
from app.database import engine


def get_db():
    with Session(engine) as session:
        try:
            yield session
        except Exception:
            session.rollback()
            raise
