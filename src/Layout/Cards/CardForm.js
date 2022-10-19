import React from "react";
import { Link } from "react-router-dom";

function CardForm({ submitHandler, formData, changeHandler, deckId }) {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            value={formData.front}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            value={formData.back}
            onChange={changeHandler}
            required
          />
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary me-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CardForm;
