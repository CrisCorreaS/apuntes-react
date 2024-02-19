import "./App.css";
import TwitterCardInicial from "./components/TwitterCardInicial";
import TwitterCardInicialMejorada from "./components/TwitterCardInicialMejorada";
import TwitterCardInicialChildren from "./components/TwitterCardInicialChildren";

function App() {
  const addAt = (userName) => `@${userName}`;

  const formattedUserNameValue = <span>@pheralb</span>;

  const vsnder = { userName: "vsnder", isFollowing: true };

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
    </section>
  );
}

export default App;
