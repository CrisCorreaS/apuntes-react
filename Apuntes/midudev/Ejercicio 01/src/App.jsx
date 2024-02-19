import "./App.css";
import TwitterCardInicial from "./components/TwitterCardInicial";
import TwitterCardInicialMejorada from "./components/TwitterCardInicialMejorada";
import TwitterCardInicialChildren from "./components/TwitterCardInicialChildren";
import TwitterFollowCard from "./components/TwitterFollowCard";
import { useState } from "react";
import TwitterFollowCardAdvanced from "./components/TwitterFollowCardAdvanced";

function App() {
  const addAt = (userName) => `@${userName}`;

  const formattedUserNameValue = <span>@pheralb</span>;

  const vsnder = { userName: "vsnder", isFollowing: true };

  // Estado de prueba
  const [name, setName] = useState("midudev");

  // Renderizado de listas
  const users = [
    {
      userName: "midudev",
      name: "Miguel Ángel Durán",
      isFollowing: true
    },
    {
      userName: "TraversyMedia",
      name: "Traversy Media",
    isFollowing: false
    },
    {
      userName: "carlosAzaustre",
      name: "Carlos Azaustre",
      isFollowing: true
    },
    {
      "userName": "Codecourse",
      "name": "Codecourse",
      "isFollowing": false
    },
  {
    "userName": "Academind",
    "name": "Academind",
    "isFollowing": false
  },
  {
    "userName": "freeCodeCamp",
    "name": "freeCodeCamp",
    "isFollowing": true
  },
  {
    "userName": "CodeBullet",
    "name": "Code Bullet",
    "isFollowing": false
  },
  {
    "userName": "edureka",
    "name": "Edureka",
    "isFollowing": false
  }
  ]

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
      <hr />
      {/* Renderizado de listas */}
      {
        users.map(({ userName, name, isFollowing }) => ( // Cuidado que esto es un paréntesis y no abrimos llaves, si no, no se interpreta como un return
          <TwitterFollowCardAdvanced
            key={userName} // La key es el identificador único del componente y se utiliza para diferenciar los componentes mapeados 
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCardAdvanced>
        ))
      }
    </section>
  );
}

export default App;
