import React, {useState , useEffect} from "react";
import {Route, Switch } from "react-router-dom";
import DeckCreate from "./DeckCreate";
import DeckList from "./DeckList";
import DeckStudy from "./DeckStudy";
import DeckView from "./DeckView";
import DeckEdit from "./DeckEdit";
import CardAdd from "../Cards/CardAdd";
import CardEdit from "../Cards/CardEdit";
import CardList from "../Cards/CardList";
import NotFound from "../NotFound"
import {listDecks} from "./../../utils/api";

function DeckHome () {
  const [decks, setDecks] = useState([])
  const [card, setCard] = useState({})
  
  useEffect(() => { 
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then(setDecks)
      return () => abortController.abort()
  },[])

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <DeckList decks={decks} />      
        </Route>

        <Route exact path={"/decks/new"}>
          <DeckCreate />
        </Route>

        <Route exact path={"/decks/:deckId/edit"}>
          <DeckEdit />
        </Route>

        <Route exact path={"/decks/:deckId/study"}>
          <DeckStudy />
        </Route>

        <Route exact path={"/decks/:deckId"}>
          <DeckView />
          <h2 className="pt-4">Cards</h2>
          <CardList card={card} setCard={setCard} />
        </Route>

        <Route exact path={'/decks/:deckId/cards/new'}>
          <CardAdd />
        </Route>
            
        <Route exact path={'/decks/:deckId/cards/:cardId/edit'}>
          <CardEdit />
        </Route> 

        <Route>
          <NotFound />
        </Route>
      </Switch>           
    </div>
  )
}

export default DeckHome

