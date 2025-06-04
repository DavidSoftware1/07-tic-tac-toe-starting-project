import React, { useState } from "react"; // Importiere useState

// Das anfängliche Spielfeld: 3x3 Array mit null-Werten
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  // Verwende useState, um den Zustand des aktiven Spielers zu verwalten
  // Verwende useState, um den Zustand des Spielfelds zu verwalten
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // Funktion zum Behandeln der Auswahl eines Feldes
  function handleSelectSquare(rowIndex, colIndex) {
    // Überprüfen, ob das Feld bereits besetzt ist
    if (gameBoard[rowIndex][colIndex] !== null) {
      return; // Wenn das Feld bereits besetzt ist, nichts tun
    }

    // Aktualisiert das Spielfeld mit dem neuen Zustand
    setGameBoard((prevGameBoard) => {
      const updatedBoard = prevGameBoard.map(innerArray => [...innerArray]); // Erstellt eine flache Kopie des vorherigen Spielfelds
      
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol; // Setzt das Feld auf den aktiven Spieler
      return updatedBoard; // Gibt eine neue Kopie des Spielfelds zurück
    });

    onSelectSquare(); // Wechselt den aktiven Spieler
  }

  return (
    <ol id="game-board"> 
      {gameBoard.map((row, rowIndex) => ( // Verwende gameBoard hier
        <li key={rowIndex}>
          <ol>
            {/* Durchläuft jede Spalte der aktuellen Zeile */}
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* Button für jedes Feld, zeigt das Spielersymbol an */}
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
