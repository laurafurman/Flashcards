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
      <li key={index} className="list-group-item">
        <div key={index} className="card-body">
          <h5>{deck.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{length} cards</h6>
          <p>{deck.description}</p>
          <Link to={`/decks/${deck.id}`} type="button" className="btn btn-primary">View</Link>
          <Link to={`/decks/${deck.id}/study`} type="button" className="btn btn-primary" >Study</Link>
          <button key={index} type="button" className="btn btn-danger bi bi-trash" value={deck.id} onClick={confirmDelete}></button>
        </div>
      </li>
    )
  })

  return (
    <div>
      <a className="btn btn-primary" href="/decks/new" type="button" style={{margin: "10px 5px"}}>Create Deck</a>
      <ul className="list-group">
        {list}
      </ul>
    </div>
  )
}

export default DeckList