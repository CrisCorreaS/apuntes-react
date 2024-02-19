export default function TwitterCardInicial({
  formatUserName,
  userName,
  name,
  isFollowing = false,
}) {
  // Las props no se modifican, son inmutables. Así que:
  // userName = `@${userName}` -> Hacer esto es una barbaridad

  // Otro tipo de prop:
  // const addAt = (userName) => `@${userName}`; -> Al final mejor la pasamos en App como prop

  return (
    // Solo usamos clases, los ids harían que los componentes no fueran reutilizables
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          src={`https://unavatar.io/${userName}`}
          alt="El avatar de Midudev"
          className="tw-followCard-avatar"
        />
        <div className="tw-followCard-info">
          <strong>{name}</strong>
          <span className="tw-followCard-infoUserName">{formatUserName(userName)}</span>
        </div>
      </header>
      <aside>
        <button className="tw-followCard-button">Seguir</button>
      </aside>
    </article>
  );
}
