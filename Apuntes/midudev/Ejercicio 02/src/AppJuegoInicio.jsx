import { useState } from "react";
import "./App.css";
/*
Esta es la primera parte explicada, el juego ahora ya funciona pero aún no se verifica el ganador, los valores de las casillas se pueden sobreescribir y es como un juego infinito

Estructura:
  |0|1|2|
  -------
  |3|4|5|
  -------
  |6|7|8|
*/

const TURNS = { // Turnos
  X: "❌",
  O: "⭕",
};

/* Al tener estas 9 posiciones y tener en el css tres columnas de 1 fracción que se tienen que repetir tres veces, las posiciones las va a distribuir para que el tablero quede bien
  -> const board = Array(9).fill(null); // Nuestro tablero es un array de 9 posiciones que inicialmente se rellena con "null" y más tarde se rellena con las "x" y las "o"
  El board lo pasamos como un estado para que se actualice cada vez que haya algún cambio
*/

// Creamos el componente del cuadrado del tablero que va a tener "children" (lo que se muestra dentro: "x" u "o"), "updateBoard" (para actualizar el tablero) e "index" (para saber qué número del tablero es)
const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`; // Esto cambia el className a "is-selected" o a una cadena vacía dependiendo de si la prop "isSelected" es true o false

  const handleClick = () => {
    updateBoard(index);
  }
  return (
    <div
      className={className}
      key={index}
      onClick={handleClick}
    > {/* Ahora le pasamos "className" a la clase y hacemos un evento onClick que llama a la función handleClick que llama a la función updateBoard() que se pasa como prop */}
      {children}
    </div>
  );
};

function AppJuegoInicio() {
  // Ahora como el board es un estado, y cada vez que cambie, va a volver a renderizar el componente. El estado inicial es un array de nulos, pero para hacer alguna prueba se podría hacer:   const [board, setBoard] = useState(["❌","❌","❌","⭕","⭕","⭕","❌","❌","❌"]); y en el children del square, poner: {board[index]}
  const [board, setBoard] = useState(Array(9).fill(null));

  // Creamos un nuevo estado para saber de quien es el turno, si de "x" o de "o". Hacemos que empiecen las "x" con el estado inicial
  const [turn, setTurn] = useState(TURNS.X);


  const updateBoard = (index) => { // Cuando el usuario hace click, necesitamos saber en cual de las casillas ha hecho click, por lo que tenemos que pasar el índice como parámetro
    // Darle el valor del turno a la casilla a la que se le ha hecho click y actualizarlo
    const newBoard = [...board]; // Creamos un nuevo board
    newBoard[index] = turn; // Le decimos que el valor de la casilla actual es igual al del turno
    setBoard(newBoard); // Actualizamos el board

    // Cambiamos el turno y actualizamos el estado
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn); // Ahora cada vez que hacemos click en uno de los cuadrados del game, el turno cambia

  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {board.map((_, index) => {// Usamos el índice porque es la posición que luego vamos a querer renderizar
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            > {/* 
                En este caso el índice es el identificador único de cada cuadrado, por lo que es la "key" y también le pasamos el "index" como prop porque lo necesita 

                "updateBoard" va a ser una función que va a actualizar estados, cambiar los turnos, ver si ya hay un ganador o no...
                -> Cuidado con los paréntesis, nosotros estamos pasando la función, no la ejecución de la función. 
                  - Si pasamos la ejecución de la función "updateBoard()", se ejecuta automáticamente con el renderizado de cada uno de los componentes, por lo que se ejecuta 9 veces cada vez que se renderiza el board
                  - Si pasamos la función, se ejecuta única y exclusivamente cuando hacemos un evento, en este caso un click
              */}
              {board[index]} {/* Devolvemos el valor de cada posición del array */}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        {/* 
          Vamos a ponerles la prop "isSelected" para saber visualmente a quien le toca.
          Cambiamos visualmente un componente a través del estado de un componente padre:
           -> Cuando el estado del componente padre App es uno u otro, va a hacer que el componente hijo Square se vea de una forma u otra. 
           -> El componente padre App le va a pasar diferentes parámetros según su estado
          
          En Square, tenemos que pasarle como prop el "isSelected"
        */}
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default AppJuegoInicio;
