import { useState } from "react";

import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { Square } from "./components/Square.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";

import confetti from "canvas-confetti";

function App() {
  // Teniendo en cuenta que los useStates no pueden estar dentro de un if, un bucle o cualquier estructura, siempre tienen que estar en el cuerpo. Para guardar el useState hay que pasar una función:
  const [board, setBoard] = useState(() => { // Para guardar el board
    const boardFromStorage = window.localStorage.getItem("board"); // Vamos a coger el board guardado, si no hay ninguno, la variable es null. Hacemos esto aquí y no fuera de la función para que no se renderice cada dos por tres, esto es una optimización
    
    return boardFromStorage
      ? JSON.parse(boardFromStorage) // Si hay un board guardado lo devolvemos
      : Array(9).fill(null); // Si no hay ningún board, creamos uno desde 0 como siempre
  });

  // Para guardar el turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn"); // Turn ya es por defecto un string así que no hay que hacerle el JSON.parse

    return turnFromStorage ?? TURNS.X; // El "??" es el operador de fusión nula. Esto es lo mismo que poner: "return turnFromStorage ? : TURNS.X" o "return turnFromStorage ? turnFromStorage : TURNS.X"; -> No podemos poner "return turnFromStorage ? return : TURNS.X;" esto está FATAL
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage(); // Cada vez que hay un nuevo juego tenemos que resetear todo lo que hay en el storage
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardamos la partida en el Storage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
