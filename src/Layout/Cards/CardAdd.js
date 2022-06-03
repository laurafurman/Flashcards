import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {createCard, readDeck} from "./../../utils/api";

function CardAdd() {

  const initialFormState = {
    front: "",
    back: "",
  };

  const {deckId} = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [cardData, setCardData] = useState({...initialFormState});

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const deckInfo = await readDeck(deckId, abortController.signal)
      setDeck(deckInfo)
    }
    loadDeck()
    return () => abortController.abort()
  }, [deckId])

  const handleFront = (event) => {
    setCardData({...cardData, front: event.target.value})
  }

  const handleBack = (event) => {
    setCardData({...cardData, back: event.target.value})
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await createCard(deckId, cardData);
    setCardData({...initialFormState})    
    history.push(`/decks/${deckId}`)
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>

      <h1>{deck.name}: Create Card</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea
            id="front"
            // rows="3"
            placeholder="Front side of card"
            onChange={handleFront}
            value={cardData.front}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea
              id="back"
              rows="3"
              placeholder="Back side of card"
              onChange={handleBack}
              value={cardData.back}
              className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-seconday" onClick={() => history.push("/")}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CardAdd;