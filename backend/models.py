from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import UUID, uuid4


class Card(SQLModel, table=True):
    __tablename__ = "cards"
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    category: str = Field(max_length=100)
    question: str
    answer: str
    known: bool = Field(default_factory=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
