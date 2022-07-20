import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";

function CardStudy({deck}) {
  const {deckId} = useParams();
  const history = useHistory();

  const [side, setSide] = useState(true);
  const [cardCount, setCardCount] = useState(0);
  const cardList = deck.cards;
  const [currentCard, setCurrentCard] = useState(cardList[0])

  useEffect (() => {
    const abortController = new AbortController();
    setCurrentCard(cardList[cardCount])
    return () => abortController.abort()
  }, [cardList, cardCount])

  const handleNext = () => {
    handleFlip()
    return setCardCount((currentCardCount) => currentCardCount + 1)
  }

  const handleFlip = () => {
    return setSide(!side)
  }

  const handleLast = () => {
    if (window.confirm("Restart Cards?")) {
      setCardCount(0)
    } else {
      history.push(`/decks/${deckId}`)
    }
  }

  if (cardList.length < 3) {
    return (
      <div>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>
        <button className="btn btn-sm btn-primary bi bi-plus-lg" onClick={() => history.push(`/decks/${deckId}/cards/new`)}> Add Card</button>
      </div>
    )
  }

  if (cardCount <= cardList.length - 2) {
    return (
      <div className="card mt-4 text-bg-light shadow-sm">
        <div className="card-body">
          <h3 className="fs-6 pb-2">Card {cardCount + 1} of {cardList.length}</h3>
          {side ? <p className="fs-5">{currentCard.front}</p> : <p className="fs-5">{currentCard.back}</p>}
            <button type="button" className="btn btn-secondary me-2" onClick={handleFlip}>Flip</button>
            {!side ? <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button> : <></>}
        </div>
      </div>
    )
  } else if (cardCount === cardList.length - 1) {
    return (
      <div className="card mt-4 text-bg-light shadow-sm">
        <div className="card-body">
          <h3 className="fs-6 pb-2">Card {cardCount + 1} of {cardList.length}</h3>
          {side ? <p className="fs-5">{currentCard.front}</p> : <p className="fs-5">{currentCard.back}</p>}
          <button type="button" className="btn btn-secondary me-2" onClick={handleFlip}>Flip</button>
          {!side ? <button type="button" className="btn btn-primary" onClick={handleLast}>Restart</button>:<></>}
        </div>
      </div>
    )
  }
}

export default CardStudy