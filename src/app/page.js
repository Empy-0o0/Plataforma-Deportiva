'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import DashboardCards from '../components/DashboardCards';
import StandingsTable from '../components/StandingsTable';
import MatchCard from '../components/MatchCard';
import Modal from '../components/Modal';
import ClubCard from '../components/ClubCard';
import { useData } from '../context/DataContext';

export default function HomePage() {
  const { data, loading, formatDate, getClubById, getUpcomingMatches } = useData();
  const [activeLeague, setActiveLeague] = useState('masculino');
  const [category, setCategory] = useState('sub-11');
  const [selectedClub, setSelectedClub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-96">
          <p className="text-xl">Cargando datos...</p>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-96">
          <p className="text-xl text-red-600">Error al cargar los datos</p>
        </div>
      </Layout>
    );
  }

  // Prepare dashboard cards
  const dashboardCards = [
    { 
      title: 'Clubes Participantes', 
      value: data.clubs.length,
      subtitle: 'Escuelas registradas'
    },
    { 
      title: 'Partidos Jugados', 
      value: data.matches.filter(m => m.status === 'jugado').length,
      subtitle: 'Encuentros completados'
    },
    { 
      title: 'Jugadores Registrados', 
      value: data.players.length,
      subtitle: 'Deportistas activos'
    },
    { 
      title: 'Próximos Partidos', 
      value: data.matches.filter(m => m.status === 'pendiente').length,
      subtitle: 'Encuentros programados'
    }
  ];

  const upcomingMatches = getUpcomingMatches(3);

  const handleViewClubDetails = (clubId) => {
    const club = getClubById(clubId);
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const renderClubModal = () => {
    if (!selectedClub) return null;

    const clubPlayers = data.players.filter(p => p.clubId === selectedClub.id);
    const clubMatches = data.matches.filter(m => m.home === selectedClub.id || m.away === selectedClub.id);

    return (
      <div>
        <div className="flex gap-4 mb-4">
          <img src={selectedClub.logo} alt={selectedClub.name} className="w-20 h-20 object-contain" />
          <div>
            <p><strong>Contacto:</strong> {selectedClub.contact}</p>
            <p><strong>Teléfono:</strong> {selectedClub.phone}</p>
            <p><strong>Dirección:</strong> {selectedClub.address}</p>
            <p><strong>Años en la liga:</strong> {selectedClub.years}</p>
            <p><strong>Jugadores:</strong> {selectedClub.players}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Categorías Participantes</h4>
          <div className="flex flex-wrap gap-2">
            {selectedClub.categories.map(cat => (
              <span key={cat} className="badge badge-primary">{cat.toUpperCase()}</span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Jugadores Destacados</h4>
          {clubPlayers.length > 0 ? (
            <ul className="space-y-1">
              {clubPlayers.slice(0, 5).map(player => (
                <li key={player.id}>
                  {player.name} ({player.position}) - {player.goals} goles
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay jugadores registrados</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold mb-2">Últimos Partidos</h4>
          {clubMatches.length > 0 ? (
            <ul className="space-y-1">
              {clubMatches.slice(0, 3).map(match => {
                const opponent = match.home === selectedClub.id 
                  ? getClubById(match.away) 
                  : getClubById(match.home);
                const isHome = match.home === selectedClub.id;
                
                return (
                  <li key={match.id} className="text-sm">
                    {formatDate(match.date)} - vs {opponent?.name} 
                    {match.status === 'jugado' && (
                      <span className="ml-2">
                        ({isHome ? `${match.homeScore}-${match.awayScore}` : `${match.awayScore}-${match.homeScore}`})
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">No hay partidos registrados</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="section-header">
        <h2>Liga de Fútbol Formativo Infantil</h2>
        <p>Promoviendo el desarrollo deportivo y valores en niños y niñas de Chile</p>
      </div>

      <DashboardCards cards={dashboardCards} />

      {/* League Standings */}
      <div className="tabs">
        <div
          className={`tab ${activeLeague === 'masculino' ? 'active' : ''}`}
          onClick={() => setActiveLeague('masculino')}
        >
          Liga Masculina
        </div>
        <div
          className={`tab ${activeLeague === 'femenino' ? 'active' : ''}`}
          onClick={() => setActiveLeague('femenino')}
        >
          Liga Femenina
        </div>
      </div>

      <div className="filters mb-4">
        <div className="filter-group">
          <label htmlFor="category-filter">Categoría:</label>
          <select 
            id="category-filter" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="sub-9">Sub-9</option>
            <option value="sub-11">Sub-11</option>
            <option value="sub-13">Sub-13</option>
            <option value="sub-15">Sub-15</option>
          </select>
        </div>
      </div>

      <StandingsTable 
        standings={data.standings[activeLeague] || []} 
        clubs={data.clubs} 
        league={activeLeague}
        category={category}
      />

      {/* Upcoming Matches */}
      <div className="section-header mt-8">
        <h2>Próximos Partidos</h2>
      </div>

      <div className="space-y-4">
        {upcomingMatches.length > 0 ? (
          upcomingMatches.map(match => {
            const homeClub = getClubById(match.home);
            const awayClub = getClubById(match.away);
            
            if (!homeClub || !awayClub) return null;
            
            return (
              <MatchCard
                key={match.id}
                match={match}
                homeClub={homeClub}
                awayClub={awayClub}
                formatDate={formatDate}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500">No hay partidos próximos programados</p>
        )}
      </div>

      {/* Featured Clubs */}
      <div className="section-header mt-8">
        <h2>Clubes Destacados</h2>
      </div>

      <div className="clubs-grid">
        {data.clubs.slice(0, 6).map(club => (
          <ClubCard
            key={club.id}
            club={club}
            onViewDetails={handleViewClubDetails}
          />
        ))}
      </div>

      {/* Club Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedClub?.name || ''}
      >
        {renderClubModal()}
      </Modal>
    </Layout>
  );
}
