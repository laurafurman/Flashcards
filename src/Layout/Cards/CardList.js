import React, {useState, useEffect} from "react";
import {useParams, useHistory, useRouteMatch} from "react-router-dom";
import {deleteCard, readCard, readDeck} from "./../../utils/api";

function CardList({setCard}) {
  const {path} = useRouteMatch();
  const {deckId} = useParams();
  const history = useHistory();

  const [cards, setCards] = useState([])

  useEffect(() => {
    async function loadCards() {
      const deck = await readDeck(deckId)
      setCards(deck.cards)
    }
    loadCards();
  }, [deckId])

  const handleClick = async (event) => {
    const id = event.target.value
    const clicked = await readCard(id)
    setCard(clicked)
    history.push(`${path}/cards/${id}/edit`)
  }

  const confirmDelete = (event) => {
    if (window.confirm("Delete this card?")) {
      deleteCard(event.target.value)
      history.push(`/decks/${deckId}`)
    }
  }

  const cardList = cards.map((card, index) => {
    return (
      <div className="card" key={index} value={card.id}>
        <div className="card-body" value={card.id}>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <div>
            <button type="button" className="btn btn-secondary" key={index} value={card.id} onClick={handleClick}>Edit</button>
            <button type="button" className="btn btn-danger bi bi-trash" value={card.id} onClick={confirmDelete}></button>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div>
      {cardList}
    </div>
  )
}

export default CardList