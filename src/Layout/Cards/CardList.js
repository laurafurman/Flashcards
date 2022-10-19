import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteCard, readCard, readDeck } from "./../../utils/api";

function CardList({ setCard }) {
  const { deckId } = useParams();
  const history = useHistory();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadCards() {
      const deck = await readDeck(deckId);
      setCards(deck.cards);
    }
    loadCards();
  }, [deckId]);

  const handleClick = async (event) => {
    const id = event.target.value;
    const clicked = await readCard(id);
    setCard(clicked);
    history.push(`/decks/${deckId}/cards/${id}/edit`);
  };

  const confirmDelete = (event) => {
    if (window.confirm("Delete this card?")) {
      deleteCard(event.target.value);
      history.push(`/decks/${deckId}`);
    }
  };

  const cardList = cards.map((card, index) => {
    return (
      <div className="card text-bg-light mb-2" key={index} value={card.id}>
        <div className="card-body" value={card.id}>
          <div className="row">
            <p className="col">{card.front}</p>
            <p className="col">{card.back}</p>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-secondary me-2 bi bi-pencil-fill"
              key={index}
              value={card.id}
              onClick={handleClick}
            >
              {" "}
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger bi bi-trash3"
              value={card.id}
              onClick={confirmDelete}
            ></button>
          </div>
        </div>
      </div>
    );
  });

  return <div>{cardList}</div>;
}

export default CardList;
