import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck} from "./../../utils/api";
import CardStudy from "../Cards/CardStudy";

function DeckStudy () {
  const {deckId} = useParams();
  const [deck, setDeck] = useState(""); 
  
  useEffect(() => { 
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal) 
      .then(setDeck) 
      
    return () => abortController.abort()
  },[deckId])

  if (deck) {
    return (
      <div>
        <nav className="navbar navbar-light bg-light " >
          <div className="container-fluid ">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb pt-2">
                <li className="breadcrumb-item"><Link className="bi bi-house-door-fill text-decoration-none"to={"/"}> Home</Link></li>
                <li className="breadcrumb-item"><Link className="text-decoration-none" to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
              </ol>
            </nav>
          </div>
        </nav>

        <h1 className="mt-3"> Study: {deck.name}</h1>
        <CardStudy deck={deck} />
      </div>
    )
  } else {
    return <h3>Loading...</h3>
  }
}

export default DeckStudy