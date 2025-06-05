import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  // Verwende useState, um den Zustand des Spielernamens und des Bearbeitungsmodus zu verwalten
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // Ruft die onChangeName-Funktion auf, um den Spielernamen zu aktualisieren
  function handleEditClick() {
    if (isEditing) {
      onChangeName(symbol, playerName); // Aktualisiere den Spielernamen, wenn der Bearbeitungsmodus beendet wird
    }
    setIsEditing((prevEditing) => !prevEditing); // Umschalten des Bearbeitungsmodus
  }

  function handleChange(event) {
    setPlayerName(event.target.value); // Aktualisiere den Spielernamen basierend auf der Eingabe
  }

  let editablePlayerName = <span className="player">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

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
