import React, { useEffect, useState } from "react";
import { readCard, readDeck, updateCard } from "../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import CardForm from "./CardForm";

function CardEdit() {
  const initialCard = {
    front: "",
    back: "",
  };

  const initialDeck = {
    name: "",
    description: "",
    cards: [],
  };

  const { cardId, deckId } = useParams();

  const [card, setCard] = useState(initialCard);
  const [deck, setDeck] = useState(initialDeck);
  const [formData, setFormData] = useState({ ...initialCard });

  const abortController = new AbortController();

  useEffect(() => {
    setDeck(initialDeck);
    setCard(initialCard);

    async function currentDeck(deckId, cardId) {
      const currentDeck = await readDeck(deckId, abortController.signal);
      const currentCard = await readCard(cardId, abortController.signal);
      setDeck({ ...currentDeck });
      setCard({ ...currentCard });
      setFormData({ ...currentCard });
    }

    currentDeck(deckId, cardId);

    return () => abortController.abort();
  }, [deckId]);

  function changeHandler({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const history = useHistory();

  async function submitHandler(event) {
    event.preventDefault();

    const updatedCard = { ...card, front: formData.front, back: formData.back };

    await updateCard(updatedCard, abortController.signal);
    history.go(0);
  }

  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="container-fluid bg-light rounded">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pt-3">
              <li className="breadcrumb-item">
                <Link
                  className="bi bi-house-door-fill text-decoration-none"
                  to={"/"}
                >
                  {" "}
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="text-decoration-none" to={`/decks/${deckId}`}>
                  {deck.name}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Card {card.id}
              </li>
            </ol>
          </nav>
        </div>
      </nav>
      <h1 className="pt-4">Edit Card</h1>
      <CardForm
        submitHandler={submitHandler}
        formData={formData}
        changeHandler={changeHandler}
        deckId={deckId}
      />
    </div>
  );
}

export default CardEdit;
