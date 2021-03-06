import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";

import FlipButton from "./FlipBtn";
import NextButton from "./NextBtn";
import AddCardsButton from "./AddCardsBtn";


function StudyCard({ cards, currentCard, setCurrentCard, deckId }) {
  const [cardCount, setCardCount] = useState(1);
  const [isFrontOfCard, setIsFrontOfCard] = useState(true);

  const history = useHistory();
  const { url } = useRouteMatch();

  
  
  // Function to handle clicks of the Next button
  const NextCardHandler = () => {
    // Keeping track of which card in the deck the user is currently viewing
    if (cardCount < cards.length) {
      setIsFrontOfCard((currentSide) => !currentSide);
      setCurrentCard(cards[cardCount]);
      setCardCount((currentCount) => currentCount + 1);
    } else {
      // Once the user has reached the final card in the deck, they will be prompted to either restart
      // the deck of cards, or return to the home page
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page."
        )
      ) {
        setIsFrontOfCard((currentSide) => !currentSide);
        setCurrentCard(cards[0]);
        setCardCount(1);
        history.push(url);
      } else {
        history.push("/");
      }
    }
  };


  // If there are less than 3 cards in a deck, the user will be prompted to add cards to the deck
  if (cards.length < 3) {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <AddCardsButton deckId={deckId} />
      </div>
    );
  }

  // Renders the front of the card and the "Flip" button if isFrontOfCard is true
  if (isFrontOfCard) {
    return (
      <div className="card pt-4 pl-3">
        <div className="card-body">
          <h5 className="card-body-front pb-2">
            Card {cardCount} of {cards.length}
          </h5>
          <p className="card-info">{currentCard.front}</p>
          <div className="row justify-content-center mt-5">
            <FlipButton setIsFrontOfCard={setIsFrontOfCard} />
          </div>
        </div>
      </div>
    );
  }
  // Renders the back of the card and the "Flip" and "Next" buttons if isFrontOfCard is false
  return (
    <div className="card pt-4 pl-3">
      <div className="card-body">
        <h5 className="card-body-front pb-2">
          Card {cardCount} of {cards.length}
        </h5>
        <p className="card-info">{currentCard.back}</p>
        <div className="row justify-content-center mt-5">
          <FlipButton setIsFrontOfCard={setIsFrontOfCard} />
          <NextButton NextCardHandler={NextCardHandler} />
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
