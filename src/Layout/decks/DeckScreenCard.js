import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api/index";
import "../../Layout/Layout.css"

function DeckScreenCard({ cards, deckId, url }) {
  const history = useHistory();

  // When the user clicks the "Delete" button associated with a card, this warning message will show.
  // If the user clicks "OK", the card is deleted using deleteCard()
  const handleDeleteCardClick = (card) => {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      deleteCard(card.id);
    } 
  };

  // Creates a Bootstrap card for each card in the deck with an edit and delete button
  const cardDisplay = cards.map((card, index) => {
    return (
      <div className="card mb-3 pb-3" key={index}>
        <div className="card-body row">
          
          <div className="col-md-5">
            <p className="card-side"> Front</p>
            <p className="card-text">{card.front}</p>
          </div>
          <div></div>
          <div className="col-md-5 ml-auto">
          <p className="card-side"> Back</p>
            <p className="card-text">{card.back}</p>
          </div>
        </div>

        <div className="ml-auto">
          <button
            type="button"
            className="nav-button btn btn-warning mr-2 mb-2"
            onClick={() =>
              history.push(`/decks/${deckId}/cards/${card.id}/edit`)
            }
          >
            <span className="oi oi-pencil" />&nbsp;&nbsp; Edit
          </button>

          <button
            type="button"
            className="nav-button btn btn-danger mr-3 mb-2"
            onClick={() => handleDeleteCardClick(card)}
          >
            {/* The anchor element will trigger the page to refresh after the card has been deleted.
            This makes it so that the refreshed page will no longer display the deleted card. */}
            <a href={url} className="text-white">
              <span className="oi oi-trash" />
            </a>
          </button>
        </div>
      </div>
    );
  });

  // If there are cards in this deck, they will render. If not, the following message will return instead.
  if (cards.length) {
    return <div>{cardDisplay}</div>;
  } else {
    return "There are no cards in this deck yet!";
  }
}

export default DeckScreenCard;