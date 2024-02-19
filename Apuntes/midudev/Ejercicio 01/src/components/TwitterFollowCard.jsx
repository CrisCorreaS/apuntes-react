import { useState } from "react";

export default function TwitterFollowCard({
  userName = "unknown",
  initialIsFollowing = false,
  children,
}) {
  /* Ahora el "isFollowing" pasa de ser un prop a ser un estado. El estado va a ser un estado interno ya que es único para cada componente.
     Esto significa que este estado no depende de ningún otro componente, solo de sí mismo.
  
    const state = useState(false); -> Define el valor inicial del estado
    const isFollowing = state[0]; -> El valor del estado
    const setIsFollowing = state[1]; -> Función para actualizar el estado
      
    Esto con desestructuración se puede poner así y significa lo mismo:
  */
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing); // Cuidado con cuando poner llaves y cuando no

  // Renderizado condicional
  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";
  
  const handleClick = () => {
    setIsFollowing(!isFollowing); // le da la vuelta al valor de "isFollowing"
  }
  
  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          src={`https://unavatar.io/${userName}`}
          alt="El avatar de Midudev"
          className="tw-followCard-avatar"
        />
        <div className="tw-followCard-info">
          <strong>{children}</strong> 
          <span className="tw-followCard-infoUserName">@{userName}</span>
        </div>
      </header>
      <aside>
        <button className={buttonClassName} onClick={handleClick}>{text}</button>
      </aside>
    </article>
  );
}
