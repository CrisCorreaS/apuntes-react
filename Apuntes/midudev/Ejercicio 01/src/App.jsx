import "./App.css";
import TwitterCardInicial from "./components/TwitterCardInicial";
import TwitterCardInicialMejorada from "./components/TwitterCardInicialMejorada";
import TwitterCardInicialChildren from "./components/TwitterCardInicialChildren";
import TwitterFollowCard from "./components/TwitterFollowCard";
import { useState } from "react";

function App() {
  const addAt = (userName) => `@${userName}`;

  const formattedUserNameValue = <span>@pheralb</span>;

  const vsnder = { userName: "vsnder", isFollowing: true };

  // Estado de prueba
  const [name, setName] = useState("midudev");

  return (
    <section className="App">
      <TwitterCardInicial
        formatUserName={addAt} // devuelve la función
        userName="midudev"
        name="Miguel Ángel Durán"
        isFollowing
      />
      <TwitterCardInicialMejorada
        formattedUserName={formattedUserNameValue} // devuelve el elemento
        userName="pheralb"
        name="Pablo Hernandez"
        isFollowing
      />
      <TwitterCardInicialChildren userName="elonmusk" isFollowing>{/* Usamos children */}
        Elon Musk
      </TwitterCardInicialChildren>
      <TwitterCardInicialChildren // Le pasamos las props como un objeto -> Pásale cada una de las propiedades del objeto "vsnder" como si fuera una prop para que el componente TwitterCardInicialChildren
        {...vsnder}
      >Vanderhart</TwitterCardInicialChildren>
      <hr />
      <TwitterFollowCard initialIsFollowing userName={name}>{/* No se puede poner isFollowing dos veces con un prop y un estado, así que a la prop, para marcar el valor inicial se le llama "initial + nombre_estado" */}
        Miguel Ángel Durán
      </TwitterFollowCard>
      <TwitterFollowCard userName="pheralb">
        Pablo Hernandez
      </TwitterFollowCard>
      <button onClick={() => setName("CrisCorreaS")}>
        Cambio de nombre
      </button>
    </section>
  );
}

export default App;
