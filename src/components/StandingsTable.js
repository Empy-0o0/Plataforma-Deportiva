const StandingsTable = ({ standings, clubs, league, category }) => {
  // Sort standings by points (descending)
  const sortedStandings = [...standings].sort((a, b) => b.points - a.points);

  return (
    <div className="table-container">
      <h3 style={{ padding: '1rem' }}>
        Tabla de Posiciones - Liga {league === 'masculino' ? 'Masculina' : 'Femenina'} - {category?.toUpperCase()}
      </h3>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Club</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
            <th>DG</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {sortedStandings.map((standing, index) => {
            const club = clubs.find(c => c.id === standing.clubId);
            if (!club) return null;
            
            return (
              <tr key={standing.clubId}>
                <td>{index + 1}</td>
                <td>{club.name}</td>
                <td>{standing.played}</td>
                <td>{standing.won}</td>
                <td>{standing.drawn}</td>
                <td>{standing.lost}</td>
                <td>{standing.goalsFor}</td>
                <td>{standing.goalsAgainst}</td>
                <td>{standing.goalsFor - standing.goalsAgainst}</td>
                <td><strong>{standing.points}</strong></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
