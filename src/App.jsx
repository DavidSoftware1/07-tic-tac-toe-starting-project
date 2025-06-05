import { useState } from "react"; // Importiere useState von React
import Player from "./components/Player";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./GameOver.jsx";


const PLAYERS ={
  X: "Player 1",
  O: "Player 2",
};

// Das anfängliche Spielfeld: 3x3 Array mit null-Werten
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Funktion, um den aktiven Spieler basierend auf den Spielzügen zu bestimmen
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    // Überprüfe die Länge der Spielzüge
    currentPlayer = "O"; // Setze den aktuellen Spieler auf "O"
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns){
  // Erstelle eine Kopie des anfänglichen Spielfelds
  let gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]); // Erstelle eine Kopie des anfänglichen Spielfelds

  for (const turn of gameTurns) {
    // Iteriere über die Spielzüge
    const { square, player } = turn; // Extrahiere das Feld und den Spieler aus dem Zug
    const { row, col } = square; // Extrahiere die Zeile und Spalte aus dem Feld
    gameBoard[row][col] = player; // Setze das Spielfeld an der entsprechenden Position auf den Spieler
  }
  return gameBoard; // Gibt das aktualisierte Spielfeld zurück
}

function deriveWinner(gameBoard, players){
  let winner; // Initialisiere den Gewinner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]; // Erster Spielzug
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; // Setze den Gewinner auf den Spielernamen
      break; // Beende die Schleife, wenn ein Gewinner gefunden wurde
    }
  }return winner; // Gibt den Gewinner zurück
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]); // Zustand für die Spielzüge
  const activePlayer = deriveActivePlayer(gameTurns); // Bestimmt den aktiven Spieler basierend auf den Spielzügen

  const gameBoard = deriveGameBoard(gameTurns); // Aktualisiert das Spielfeld basierend auf den Spielzügen

  const winner = deriveWinner(gameBoard, players); // Bestimmt den Gewinner basierend auf dem aktuellen Spielfeld und den Spielern
  
  const hasDraw = gameTurns.length === 9 && !winner; // Überprüfe auf ein Unentschieden, wenn das Spielfeld voll ist und kein Gewinner vorhanden ist

  function handleSelectSquare(rowIndex, colIndex) {
    // Verhindere weitere Züge, wenn bereits ein Gewinner vorhanden ist
    if (winner || gameBoard[rowIndex][colIndex] !== null) {
      return; // Mache nichts, wenn es einen Gewinner gibt oder das Feld bereits belegt ist
    }

    setGameTurns((prevTurns) => {
      // Aktualisiert die Spielzüge
      const currentPlayer = deriveActivePlayer(prevTurns); // Bestimmt den aktuellen Spieler basierend auf den vorherigen Zügen
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function resetGame() {
    setGameTurns([]); // Setze die Spielzüge zurück
  }

  function handlePlayerNameChange(symbol, newName) {
    // Funktion zum Aktualisieren des Spielernamens
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName, // Aktualisiert den Namen des Spielers mit dem entsprechenden Symbol
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* Hier werden die Spielerkomponenten gerendert */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange} // Übergibt die Funktion zum Aktualisieren der Spielernamen
          />
          <Player
            initialName={PLAYERS.X}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange} // Übergibt die Funktion zum Aktualisieren der Spielernamen
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onReset={resetGame} />
        )} {/* Zeigt den Gewinner oder Unentschieden an, falls vorhanden */}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} // Übergibt die Spielfelddaten an die GameBoard-Komponente
        />
      </div>
      <Log turns={gameTurns} /> {/* Übergibt die Spielzüge an die Log-Komponente */}
    </main>
  );
}

export default App;
