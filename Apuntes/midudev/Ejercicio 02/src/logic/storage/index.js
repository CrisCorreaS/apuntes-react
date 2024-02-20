export const saveGameToStorage = ({ board, turn }) => { // creamos los storages
  window.localStorage.setItem("board", JSON.stringify(board)); // No se puede guardar el board sin más, hay que pasarlo a un string de verdad. Si ponemos "window.localStorage.setItem("board", board)" hace un "toString()" y queda mal, por eso hay que hacer un "window.localStorage.setItem("board", JSON.stringify(board))"
  window.localStorage.setItem("turn", turn); // turn ya es un string así que no hay que hacerle nada
};

export const resetGameStorage = () => { // reseteamos el juego y tenemos que borrar los storages
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};