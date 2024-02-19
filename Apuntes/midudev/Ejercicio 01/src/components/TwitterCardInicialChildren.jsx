export default function TwitterCardInicialChildren({
  userName = "unknown",
  isFollowing = false,
  children
}) {
  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          src={`https://unavatar.io/${userName}`}
          alt="El avatar de Midudev"
          className="tw-followCard-avatar"
        />
        <div className="tw-followCard-info">
          <strong>{children}</strong> {/* Usamos children */}
          <span className="tw-followCard-infoUserName">@{userName}</span>
        </div>
      </header>
      <aside>
        <button className="tw-followCard-button">Seguir</button> 
        {/* El elemento button es el "children" del aside */}
      </aside>
    </article>
  );
}