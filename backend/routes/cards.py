from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import Optional

from models import Card
from schemas import CardCreate, CardUpdate, CardDisplay
from dependencies import get_db

router = APIRouter()


@router.get("/", response_model=list[CardDisplay])
def get_list_cards(
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = select(Card)
    if category:
        query = query.where(Card.category == category)
    return db.exec(query).all()
