import React, {useState} from "react";
import { useParams } from "react-router-dom";
import {createCard} from "./../../utils/api";
import CardForm from "./CardForm"

function CardAdd() {
  const { deckId } = useParams();

  const initialFormState = {
    front: "Front side of card",
    back: "Back side of card",
    deckId: Number(deckId)
  }

  const [content, setContent] = useState({ ...initialFormState });

  async function handleSave(event) {
    event.preventDefault();
    await createCard(content);
    setContent(initialFormState);
  }

  return (
    <div>
      <CardForm formData={content} setFormData={setContent} handleSave={handleSave} />
    </div>
  )
}

export default CardAdd;