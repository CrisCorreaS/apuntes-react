import { useState } from "react";
import "./App.css";

const TURNS = { // Turnos
  X: "❌",
  O: "⭕",
};

/*
  Creamos las combinaciones ganadoras donde si la "x" o la "o" cumplen que están en todas esas posiciones a la vez, ganan
  
  Estructura:
    |0|1|2|
    -------
    |3|4|5|
    -------
    |6|7|8|
*/
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div className={className} key={index} onClick={handleClick}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  // Para saber quien es el ganador tenemos que crear un nuevo estado
  const [winner, setWinner] = useState(null); // Le ponemos "null", no "false". Para nosotros "null" significa que no hay ganador, "false" que hay un empate y "true" que hay ganador

  // Creamos un método que compruebe si hay un ganador o no. A este le tenemos que pasar el tablero para checkear
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {// Para cada combinación que tenemos en los WINNER_COMBOS vamos a:
      const [a, b, c] = combo; // recuperamos las posiciones y las guardamos en "a", "b" y "c". Ej: en el primer combo -> "a" = 0, "b" = 1 y "c" = 2. en el último combo -> "a" = 2, "b" = 4 y "c" = 6

      if (
        boardToCheck[a] && // Miramos si en el 0 hay algo
        boardToCheck[a] == boardToCheck[b] && // Comprobamos que hay lo mismo en la posición "a" que en la posición "b"
        boardToCheck[a] == boardToCheck[c] // Hacemos lo mismo pero esta vez para la "c"
      ) {
        // Si las posiciones son todas iguales -> Si hay todo "x" en las tres posiciones, significa que hay un ganador
        return boardToCheck[a]; // Devuelve el ganador "x" u "o"
      }
      // Cuidado de poner aquí el "return null", ya que eso rompería el bucle y únicamente podríamos comprobar la primera combinación del WINNER_COMBO
    }
    return null; // Devuelve null si no hay ganador
  };

  // Función de reseteo
  const resetGame = () => { // Reseteamos todos los estados a su estado inicial
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  // Función para comprobar que el juego se ha acabado y no hay ningún ganador = empate
  const checkEndGame = (newBoard) => {
    // Revisamos si hay espacios vacios o no en el board, si no los hay, significa que todas las fichas están puestas en el tablero pero no ha habido ningún ganador = hay empate
    return newBoard.every((square) => square !== null); // Inicialmente -> newBoard = ["null", "null", "null", "null", "null", "null", "null", "null", "null"]
  }

  const updateBoard = (index) => {
    // Para evitar que los valores se sobreescriban -> No actualizamos la posición si ya tiene algo
    if (board[index] || winner) return; // Si ya hay algo en la celda del juego o si ya hay un ganador, no dejamos que se haga un cambio cuando hacemos click en la celda. Si "board[index]" tiene algo, devuelve true y si no, devuelve false.

    // actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // cambiar turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // revisamos si hay un ganador
    const newWinner = checkWinner(newBoard); // Usamos el newBoard porque es el tablero actual modificado, si usásemos board, estaríamos usando el tablero antiguo ya que el tablero a lo mejor aún no está actualizado ya que cambiar el estado es una acción asíncrona no bloqueante.
    if (newWinner) {// Si hay un ganador
      /*
      setWinner(newWinner); // Cambiamos el estado para marcar que hay un nuevo ganador
      
      ->  Cambiar el estado es una acción asíncrona, es decir, le lleva un tiempo x cambiar el estado, pero esta acción no es bloqueante, por lo que normalmente si ponemos un:
      alert(`El ganador es ${newWinner}`); 
      console.log(winner); 

      -> El estado se cambiaría seguramente después de haber realizado el alert o el console.log, por lo que hay que tener mucho cuidado.
      -> El console.log(winner), seguramente pintaría por consola "null" aunque el estado nuevo fuera un "true" ya que pinta por consola el estado antes de ser actualizado.

      El cambio de estado es una acción asíncrona no bloqueante mientras que el console.log() o el alert() son acciones síncronas

      Se podría hacer:
      setWinner((prevWinner) => { // A setWinner() le podemos pasar el estado nuevo o una función 
        alert(`${newWinner} ha ganado esta partida`); 
        console.log(`Ganador: ${newWinner}, el estado anterior era: ${prevWinner}`); 
        return newWinner;
      })
      */

      setWinner(newWinner);
    } else if(checkEndGame(newBoard)) { // Miramos si hay un empate
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square} {/* Podemos poner {square} o {board[index]} */}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>{/* Vamos a hacer una sección con un renderizado condicional para comprobar que o hay un ganador o hay un empate */}
      {winner !== null && ( // Si winner es diferente a null, es decir, que no es ni true (hay un ganador) ni false (hay un empate), se va a renderizar lo siguiente:
        <section className="winner">
          <div className="text"> {/* Esto va a ser una modal */}
            <h2>
              {
                winner == false ? "Empate" : "Ganó:" // Si winner es false (hay empate)
              }
            </h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}{/* Otro renderizado condicional donde si hay un ganador, vamos a pintarlo */}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>{/* creamos un botón para resetear el juego */}
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
