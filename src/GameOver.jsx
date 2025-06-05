export default function GameOver({ winner, onReset }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} hat Gewonnen!</p>}
      {!winner && <p>Unentschieden!</p>}
      <p>
        <button onClick={onReset}>Noch Mal?</button>
      </p>
    </div>
  );
}
// This component displays the game over message and the winner or draw.
