import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {updateDeck, readDeck} from "./../../utils/api";

function DeckEdit() {
  const {deckId} = useParams();
  const history = useHistory();

  const [deckData, setDeckData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck () {
      const deckInfo = await readDeck(deckId, abortController.signal)
      setDeckData(deckInfo)
    }
    loadDeck()
    return () => abortController.abort()
  }, [deckId])

  const handleNameChange = (event) => {
    setDeckData({...deckData, name: event.target.value})
  }

  const handleDescriptionChange = (event) => {
    setDeckData({...deckData, description: event.target.value})
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateDeck(deckData)
    history.push("/")
  }

  return (
    <div>
      <nav className="navbar navbar-light" >
        <div className="container-fluid bg-light rounded">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pt-3">
              <li className="breadcrumb-item"><Link className="bi bi-house-door-fill text-decoration-none"to={"/"}> Home</Link></li>
              <li className="breadcrumb-item"><Link className="text-decoration-none" to={`/decks/${deckId}`}>{deckData.name}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
          </nav>
        </div>
      </nav>

      <h1 className="pt-4">Edit Deck</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text"
            id="name"
            onChange={handleNameChange}
            value={deckData.name}
            className="form-control text-muted"
            aria-describedby="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            id="description"
            rows={4}
            onChange={handleDescriptionChange}
            value={deckData.description}
            className="form-control text-muted"
          />
        </div>
        <button type="submit" className="btn btn-secondary me-2" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default DeckEdit