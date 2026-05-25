from sqlmodel import SQLModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class CardBase(SQLModel):
    category: str
    question: str
    answer: str


class CardCreate(CardBase):
    pass


class CardUpdate(SQLModel):
    category: Optional[str] = None
    question: Optional[str] = None
    answer: Optional[str] = None
    known: Optional[bool] = None


class CardDisplay(CardBase):
    id: UUID
    known: bool
    created_at: datetime
