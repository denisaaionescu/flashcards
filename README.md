# Flashcards

A simple full-stack flashcards application for interview preparation. Create question/answer cards, organize them by category, and study them in a flip-card view.

Built as a personal learning project to practice the FastAPI + React + TypeScript stack.

## Tech Stack

**Backend**

- [FastAPI](https://fastapi.tiangolo.com/) — modern async Python web framework
- [SQLModel](https://sqlmodel.tiangolo.com/) — ORM combining Pydantic + SQLAlchemy
- [SQLite](https://www.sqlite.org/) — file-based relational database (zero-config)
- [Uvicorn](https://www.uvicorn.org/) — ASGI server

**Frontend**

- [React 18](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — typed JavaScript
- [Vite](https://vitejs.dev/) — build tool and dev server

## Features

- Create, read, update, and delete flashcards (full CRUD)
- Filter cards by category

## Project Structure

```
flashcards/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── cards.py        # HTTP routes (GET, POST, PATCH, DELETE)
│   │   ├── database.py         # SQLite engine + table initialization
│   │   ├── dependencies.py     # DI: get_db session generator
│   │   ├── main.py             # FastAPI app, CORS, lifespan
│   │   ├── models.py           # Card entity (DB table)
│   │   └── schemas.py          # Pydantic DTOs (Create, Update, Display)
│   ├── flashcards.db           # SQLite database file (auto-generated)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api.ts              # Fetch wrappers for the backend
    │   ├── App.tsx             # Root component
    │   ├── main.tsx            # React entry point
    │   └── types.ts            # TypeScript interfaces
    ├── index.html
    └── package.json
```

## API Endpoints

All endpoints are prefixed with `/api/cards`.

| Method | Path         | Description                            | Success Code |
| ------ | ------------ | -------------------------------------- | ------------ |
| GET    | `/`          | List all cards (optional `?category=`) | 200          |
| POST   | `/`          | Create a new card                      | 201          |
| PATCH  | `/{card_id}` | Partial update (any field)             | 200          |
| DELETE | `/{card_id}` | Delete a card                          | 204          |

## Architecture Notes

- **Layered backend**: routes (`routers/`) handle HTTP and delegate to the database session injected via FastAPI's `Depends`. For a project of this size, no separate service layer is used.
- **DTO pattern**: separate Pydantic models for input (`CardCreate`, `CardUpdate`) and output (`CardDisplay`) decouple the API contract from the database entity (`Card`).
- **CORS** is configured in `main.py` to allow requests from `http://localhost:5173` during local development.
- **Dependency injection** via `Depends(get_db)` provides a database session per request and handles cleanup automatically.

## Possible Future Improvements

- User authentication (JWT)

- Deploy to a cloud provider
- Add unit and integration tests
