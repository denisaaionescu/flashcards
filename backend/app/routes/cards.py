from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import Optional
from uuid import UUID
from app.models import Card
from app.schemas import CardCreate, CardUpdate, CardDisplay
from app.dependencies import get_db

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


@router.post("/", response_model=CardDisplay, status_code=status.HTTP_201_CREATED)
def create_card(
    card_data: CardCreate,
    db: Session = Depends(get_db),
):
    card = Card(**card_data.model_dump())
    db.add(card)
    db.commit()
    db.refresh(card)
    return card


@router.patch("/{card_id}", response_model=CardDisplay)
def update_card(
    card_id: UUID,
    card_data: CardUpdate,
    db: Session = Depends(get_db),
):
    card = db.get(Card, card_id)
    if not card:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Card not found"
        )
    for field, value in card_data.model_dump(exclude_unset=True).items():
        setattr(card, field, value)
    db.add(card)
    db.commit()
    db.refresh(card)
    return card


@router.delete("/{card_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_card(
    card_id: UUID,
    db: Session = Depends(get_db),
):
    card = db.get(Card, card_id)
    if not card:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Card not found"
        )
    db.delete(card)
    db.commit()
