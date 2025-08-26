const ClubCard = ({ club, onViewDetails }) => (
  <div className="club-card">
    <img src={club.logo} alt={club.name} />
    <div className="club-card-content">
      <h3>{club.name}</h3>
      <p><strong>Liga:</strong> {club.league === 'ambas' ? 'Masculina y Femenina' : club.league}</p>
      <p><strong>Región:</strong> {club.region}</p>
      <p><strong>Categorías:</strong> {club.categories.join(', ')}</p>
      <p><strong>Jugadores:</strong> {club.players}</p>
      <button 
        onClick={() => onViewDetails(club.id)}
        className="mt-4 w-full"
      >
        Ver Detalles
      </button>
    </div>
  </div>
);

export default ClubCard;
