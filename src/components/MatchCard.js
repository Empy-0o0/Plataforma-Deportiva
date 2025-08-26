const MatchCard = ({ match, homeClub, awayClub, formatDate }) => (
  <div className="match-card">
    <div className="match-teams">
      <div className="match-team">
        <img src={homeClub.logo} alt={homeClub.name} />
        <div className="text-sm font-medium">{homeClub.name}</div>
      </div>
      <div className="match-score">
        {match.status === 'jugado'
          ? `${match.homeScore} - ${match.awayScore}`
          : 'VS'}
      </div>
      <div className="match-team">
        <img src={awayClub.logo} alt={awayClub.name} />
        <div className="text-sm font-medium">{awayClub.name}</div>
      </div>
    </div>
    <div className="match-info">
      <p><strong>Fecha:</strong> {formatDate(match.date)}</p>
      <p><strong>Hora:</strong> {match.time}</p>
      <p><strong>Lugar:</strong> {match.field}</p>
      <p><strong>Categoría:</strong> {match.category.toUpperCase()}</p>
      <span className={`badge ${
        match.status === 'jugado' ? 'badge-success' : 
        match.status === 'pendiente' ? 'badge-primary' : 
        'badge-warning'
      }`}>
        {match.status}
      </span>
    </div>
  </div>
);

export default MatchCard;
