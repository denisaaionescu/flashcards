from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import init_db
from app.routes import cards


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(cards.router, prefix="/api/cards", tags=["cards"])
