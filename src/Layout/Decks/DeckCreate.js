import React, {useState} from "react";
import {useHistory, Link} from "react-router-dom";
import {createDeck} from "./../../utils/api";

function DeckCreate() {
  const initialFormState = {
    name: "",
    description: "",
  }

  const history = useHistory();

  const [deckData, setDeckData] = useState({...initialFormState});

  const handleNameChange = (event) => {
    setDeckData({...deckData, name: event.target.value})
  }

  const handleDescriptionChange = (event) => {
    setDeckData({...deckData, description: event.target.value})
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createDeck(deckData);
    setDeckData({...initialFormState})
    history.push("/")
  }

  return (
    <div>
    <nav className="navbar navbar-light" >
      <div className="container-fluid bg-light rounded">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb pt-2">
            <li className="breadcrumb-item"><Link className="bi bi-house-door-fill text-decoration-none" to={"/"}> Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
          </ol>
        </nav>
      </div>
    </nav>

      <h1 className="mt-3">Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Deck Name"
              onChange={handleNameChange}
              value={deckData.name}
              className="form-control"
              aria-describedby="name"
            />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              placeholder="Brief description of the deck"
              rows={4}
              onChange={handleDescriptionChange}
              value={deckData.description}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-secondary me-2" onClick={() => history.push("/")}>Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default DeckCreate