import React from "react";
import {Link, useHistory} from "react-router-dom"
import {deleteDeck} from "./../../utils/api";

function DeckList({decks}) {
  const history = useHistory();

  const confirmDelete = (event) => {
    if (window.confirm("Delete this deck?")) {
      deleteDeck(event.target.value)
      history.push("/")
    }
  }

  const list = decks.map((deck, index) => {
    const length = deck.cards.length;
    return (
      <li key={index} className="card mb-2 shadow-sm">
        <div key={index} className="card-body">
          <h5>{deck.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{length} cards</h6>
          <p>{deck.description}</p>
          <div className="d-flex justify-content-between">
            <div className="btn-toolbar" >
              <Link to={`/decks/${deck.id}`} type="button" className="btn btn-secondary me-2 bi bi-eye-fill">  View</Link>
              <Link to={`/decks/${deck.id}/study`} type="button" className="btn btn-primary bi bi-file-text-fill" >  Study</Link>
            </div>
            <div>
              <button key={index} type="button" className="btn btn-danger bi bi-trash3" value={deck.id} onClick={confirmDelete}></button>
            </div>
          </div>
        </div>
      </li>
    )
  })

  return (
    <div>
      <a className="btn btn-secondary bi bi-plus-lg mb-2" href="/decks/new" type="button"> Create Deck</a>
      <ul className="list-group">
        {list}
      </ul>
    </div>
  )
}

export default DeckList