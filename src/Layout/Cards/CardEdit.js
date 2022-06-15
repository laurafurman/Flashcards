import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {updateCard, readCard, readDeck} from "./../../utils/api";

function CardEdit() {
  const {deckId, cardId} = useParams();
  const history = useHistory();

  const [deckData, setDeckData] = useState({});
  const [card, setCard] = useState({})
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const deckInfo = await readDeck(deckId, abortController.signal);
      setDeckData(deckInfo)
    }
    loadDeck()
    return() => abortController.abort()
  }, [deckId])

  useEffect(() => {
    async function loadCard() {
      const cardInfo = await readCard(cardId)
      setCard(cardInfo);
      setFront(cardInfo.front);
      setBack(cardInfo.back)
    }
    loadCard()
  }, [cardId])

  const handleFrontChange = (event) => {
    setFront(event.target.value);
    setCard({...card, front: event.target.value})
  }

  const handleBackChange = (event) => {
    setBack(event.target.value);
    setCard({...card, back: event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deckId}`)
  }

  // breadcrumb for "Deck {deck.name}" is also broken
  return (
    <div>
      <nav className="navbar navbar-light" >
        <div className="container-fluid bg-light rounded">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pt-3">
              <li className="breadcrumb-item"><Link className="bi bi-house-door-fill text-decoration-none" to={"/"}> Home</Link></li>
              <li className="breadcrumb-item"><Link className="text-decoration-none" to={`/decks/${deckId}`}>Deck {deckData.name}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
          </nav>
        </div>
      </nav>

      <h1 className="pt-4">Edit Card</h1>
  {// FROM ADDCARD
  }
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea
            id="front"
            rows="2"
            placeholder="Front side of card"
            onChange={handleFrontChange}
            value={front}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea
              id="back"
              rows="2"
              placeholder="Back side of card"
              onChange={handleBackChange}
              value={back}
              className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-secondary me-2" onClick={() => history.push("/")}>Done</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default CardEdit