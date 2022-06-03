import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {updateCard, readCard, readDeck} from "./../../utils/api";

function CardEdit({ card, setCard }) {
  const {deckId, cardId} = useParams();
  const history = useHistory();

  const [deckData, setDeckData] = useState({});
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

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckData.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>

      <h1>Edit Card</h1>

      <form name="addCard" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea
            id="front"
            rows="3"
            onChange={handleFrontChange}
            value={front}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea
            id="back"
            rows="3"
            onChange={handleBackChange}
            value={back}
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CardEdit