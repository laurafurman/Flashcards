import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {updateCard, readCard} from "./../../utils/api";
import CardForm from "./CardForm";

function CardEdit() {
  const { deckId, cardId } = useParams();

  const initialFormState = {
    front: "Front side of card.",
    back: "Back side of card.",
    deckId: Number(deckId),
    id: cardId
  };

  const [content, setContent] = useState({...initialFormState});

  useEffect(() => {
    readCard(cardId)
      .then(setContent);
  }, [cardId]);

  async function handleSave(event) {
    event.preventDefault();
    await updateCard(content);
  }

  return (
    <div>
      <CardForm formData={content} setFormData={setContent} handleSave={handleSave} />
    </div>
  )
}

export default CardEdit;