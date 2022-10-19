import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function CardForm({ formData, setFormData, handleSave }) {
  const { deckId } = useParams();
  const deckUrl = `/decks/${deckId}`;
  const history = useHistory();

  const [deck, setDeck] = useState({});

  useEffect(() => {
    readDeck(deckId)
    .then(setDeck);
  }, [deckId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  if (deck) {
    const handleDone = () => history.push(deckUrl);
    const add = !(formData.id);

    return (
      <div>
        <nav className="navbar navbar-light" >
          <div className="container-fluid bg-light rounded">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb pt-3">
                <li className="breadcrumb-item"><Link className="bi bi-house-door-fill text-decoration-none" to={"/"}> Home</Link></li>
                <li className="breadcrumb-item"><Link className="text-decoration-none" to={deckUrl}>{deck.name}</Link></li>
                { add ? <li className="breadcrumb-item active" aria-current="page">Add Card</li> : <li className="breadcrumb-item active" aria-current="page">Edit Card {formData.id}</li> }
              </ol>
            </nav>
          </div>
        </nav>

        { add ? <h1 className="pt-4">{deck.name} Add Card</h1> : <h1>Edit Card</h1> }
        <form name='cardAdd'>
          <div className="mb-3">
            <label htmlFor="front" className="form-label">Front</label>
            <textarea
              id="front"
              rows="2"
              onChange={handleChange}
              value={formData.front}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="back" className="form-label">Back</label>
            <textarea
                id="back"
                rows="2"
                onChange={handleChange}
                value={formData.back}
                className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-secondary me-2" onClick={ handleDone }>Done</button>
          <button type="submit" className="btn btn-primary" onClick={ handleSave }>Save</button>
        </form>
    </div>
    )
  }
  return "Loading..."
}

export default CardForm;