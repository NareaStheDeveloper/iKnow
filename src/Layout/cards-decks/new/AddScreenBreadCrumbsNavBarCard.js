import React from "react";
import { Link } from 'react-router-dom';

function AddCardScreenBreadcrumbNavBar({ deckName, deckId }) {
  return (
    <div className="study-nav">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Card
        </li>
      </ol>
    </nav>
    </div>
  );
}

export default AddCardScreenBreadcrumbNavBar;