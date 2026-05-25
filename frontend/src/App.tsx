import { useState, useEffect } from "react";
import type { Card } from "./types";
import { createCard, getCards, deleteCard } from "./api";
import "./App.css";

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    getCards(filterCategory || undefined).then(setCards);
  }, [filterCategory]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const created = await createCard({ category, question, answer });
    setCards([...cards, created]);
    setCategory("");
    setQuestion("");
    setAnswer("");
  }


  async function handleDelete(id: string) {
    await deleteCard(id);
    setCards(cards.filter(c => c.id !== id));
  }

  const categories = [...new Set(cards.map(c => c.category))];

  return (
    <div className="app">
      <header className="header">
        <h1>Flashcards</h1>
      </header>

      <div className="form-section">
        <form onSubmit={handleSubmit} className="form">
          <input
            className="input"
            type="text"
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Question"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            required
          />
          <button type="submit" className="btn-add">+ Add</button>
        </form>

        {categories.length > 0 && (
          <div className="filter">
            <button
              className={`filter-btn ${!filterCategory ? "active" : ""}`}
              onClick={() => setFilterCategory("")}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filterCategory === cat ? "active" : ""}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="cards-grid">
        {cards.length === 0 ? (
          <div className="empty">No cards yet.</div>
        ) : (
          cards.map(card => (
            <div key={card.id} className={`card ${card.known ? "card--known" : ""}`}>
              <div className="card-category">{card.category}</div>
              <div className="card-body">
                <p className="card-question">{card.question}</p>
                <p className="card-answer">{card.answer}</p>
              </div>
              <div className="card-footer">
                <button className="btn-delete" onClick={() => handleDelete(card.id)}>×</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
