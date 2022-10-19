import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

function CardAdd() {
  const abortController = new AbortController();

  const initialValue = {
    name: "",
    description: "",
  };

  const [deck, setDeck] = useState(initialValue);
  const { deckId } = useParams();

  useEffect(() => {
    setDeck(initialValue);

    async function currentDeck(id) {
      try {
        const current = await readDeck(id, abortController.signal);
        setDeck({ ...current });
      } catch (error) {
        console.log(error);
      }
    }

    currentDeck(deckId);

    return () => abortController.abort();
  }, [deckId]);

  //we have the deck stored in deck variable

  const initialState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialState });
  const history = useHistory();

  function changeHandler({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    await createCard(deckId, formData, abortController.signal);
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
                Add Card
              </li>
            </ol>
          </nav>
        </div>
      </nav>
      <h1 className="pt-4">{deck.name}: Add Card</h1>
      <CardForm
        submitHandler={submitHandler}
        formData={formData}
        changeHandler={changeHandler}
        deckId={deckId}
      />
    </div>
  );
}

export default CardAdd;
