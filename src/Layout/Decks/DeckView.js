import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck, deleteDeck} from "./../../utils/api";

function DeckView () {
  const {deckId} = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});

  useEffect(() => { 
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
        
    return () => abortController.abort()
  },[deckId])

  const confirmDelete = (event) => {
    if (window.confirm("Delete this deck?")) {
      deleteDeck(event.target.value) 
      history.push("/") 
    }
  }

  if (!deck) {
    return (
      <h3>Loading...</h3>
    )
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <h5>{deck.name}</h5>
          <p>{deck.description}</p>
          <Link to={`/decks/${deckId}/edit`} type="button" className="btn btn-secondary">Edit</Link>
          <Link to={`/decks/${deckId}/study`} type="button" className="btn btn-primary">Study</Link>
          <Link to={`/decks/${deckId}/cards/new`} type="button" className="btn btn-primary">Add Cards</Link>
          <button type="button" className="btn btn-danger bi bi-trash" value={deckId} onClick={confirmDelete}></button>
        </div>
      </div>
    </div>
  )
}

export default DeckView