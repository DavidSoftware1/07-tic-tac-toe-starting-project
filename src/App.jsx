import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard.jsx";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    // Hier wird die Logik zum Wechseln des aktiven Spielers implementiert
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X")); // Wechselt den aktiven Spieler zwischen "X" und "O"
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players"className="highlight-player">
          {/* Hier werden die Spielerkomponenten gerendert */}
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} /> {/* activePlayer hinzugefügt */}
      </div>
      {/* Hier kannst du Logs oder andere Informationen anzeigen */}
      <div>Aktiver Spieler: {activePlayer}</div>
    </main>
  );
}

export default App;
