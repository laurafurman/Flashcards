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
      <nav className="navbar navbar-light bg-light rounded" >
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pt-2">
              <li className="breadcrumb-item"><Link className="bi bi-house-door-fill text-decoration-none"to={"/"}> Home</Link></li>
              <li className="breadcrumb-item active">{deck.name}</li>
            </ol>
          </nav>
        </div>
      </nav>

      <div className=" mt-4">
        <div>
          <h5>{deck.name}</h5>
          <p>{deck.description}</p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="btn-toolbar">
            <Link to={`/decks/${deckId}/edit`} type="button" className="btn btn-secondary me-2 bi bi-pencil-fill"> Edit</Link>
            <Link to={`/decks/${deckId}/study`} type="button" className="btn btn-primary me-2 bi bi-file-text-fill"> Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} type="button" className="btn btn-primary bi bi-plus-lg"> Add Cards</Link>
          </div>
          <div>
            <button type="button" className="btn btn-danger bi bi-trash3" value={deckId} onClick={confirmDelete}></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeckView