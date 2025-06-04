import { useState } from "react";

export default function Player({ initialName, symbol,isActive }) {
  // Verwende useState, um den Zustand des Spielernamens und des Bearbeitungsmodus zu verwalten
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player">{playerName}</span>;
  //let btnCaption = "Ändern";

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }
  //btn caption = "Speichern";

  return (
    <li className={isActive ? "active" : undefined}>
      {/* Hier wird die Klasse "active" hinzugefügt, wenn isActive true ist */}
      <span className="player">
        {editablePlayerName}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEditing ? "Speichern" : "Ändern"}
      </button>
    </li>
  );
}
