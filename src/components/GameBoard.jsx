// /* import React, { useState } from "react"; // Importiere useState */

// Das anfängliche Spielfeld: 3x3 Array mit null-Werten
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, board }) { // Corrected prop name
  return (
    <ol id="game-board"> 
      {board.map((row, rowIndex) => ( // Use board here
        <li key={rowIndex}>
          <ol>
            {/* Durchläuft jede Spalte der aktuellen Zeile */}
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* Button für jedes Feld, zeigt das Spielersymbol an */}
                <button 
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null} // Verhindert das Klicken auf bereits belegte Felder
                > 
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
