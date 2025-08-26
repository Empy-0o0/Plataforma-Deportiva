'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '../../components/Layout';
import DashboardCards from '../../components/DashboardCards';
import MatchCard from '../../components/MatchCard';
import Modal from '../../components/Modal';
import { useData } from '../../context/DataContext';

export default function ClubDashboard() {
  const { data, currentUser, loading, getClubById, getPlayersByClub, getMatchesByClub, formatDate, addPlayer, updatePlayer, deletePlayer } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerForm, setPlayerForm] = useState({
    name: '',
    age: '',
    category: 'sub-9',
    position: 'Delantero'
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && (!currentUser || (currentUser.role !== 'club' && currentUser.role !== 'administrador'))) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-96">
          <p className="text-xl">Cargando...</p>
        </div>
      </Layout>
    );
  }

  if (!currentUser || (currentUser.role !== 'club' && currentUser.role !== 'administrador')) {
    return null;
  }

  // Get club data (for admin, use first club as example, for club user use their club)
  const clubId = currentUser.role === 'club' ? currentUser.clubId : 1;
  const club = getClubById(clubId);
  const clubPlayers = getPlayersByClub(clubId);
  const clubMatches = getMatchesByClub(clubId);

  if (!club) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-96">
          <p className="text-xl text-red-600">Club no encontrado</p>
        </div>
      </Layout>
    );
  }

  const dashboardCards = [
    { 
      title: 'Jugadores Registrados', 
      value: clubPlayers.length,
      subtitle: 'Deportistas activos'
    },
    { 
      title: 'Partidos Jugados', 
      value: clubMatches.filter(m => m.status === 'jugado').length,
      subtitle: 'Encuentros completados'
    },
    { 
      title: 'Próximos Partidos', 
      value: clubMatches.filter(m => m.status === 'pendiente').length,
      subtitle: 'Encuentros programados'
    },
    { 
      title: 'Goles Anotados', 
      value: clubPlayers.reduce((total, player) => total + player.goals, 0),
      subtitle: 'Total de goles'
    }
  ];

  const handleAddPlayer = () => {
    setModalType('add');
    setPlayerForm({
      name: '',
      age: '',
      category: 'sub-9',
      position: 'Delantero'
    });
    setSelectedPlayer(null);
    setIsModalOpen(true);
  };

  const handleEditPlayer = (player) => {
    setModalType('edit');
    setPlayerForm({
      name: player.name,
      age: player.age.toString(),
      category: player.category,
      position: player.position
    });
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleDeletePlayer = (playerId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
      deletePlayer(playerId);
    }
  };

  const handleSubmitPlayer = (e) => {
    e.preventDefault();
    
    const playerData = {
      ...playerForm,
      age: parseInt(playerForm.age),
      clubId: clubId
    };

    if (modalType === 'add') {
      addPlayer(playerData);
    } else {
      updatePlayer(selectedPlayer.id, playerData);
    }

    setIsModalOpen(false);
  };

  const renderPlayerModal = () => (
    <form onSubmit={handleSubmitPlayer}>
      <div className="form-group">
        <label htmlFor="player-name">Nombre</label>
        <input
          type="text"
          id="player-name"
          value={playerForm.name}
          onChange={(e) => setPlayerForm({...playerForm, name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="player-age">Edad</label>
        <input
          type="number"
          id="player-age"
          min="6"
          max="18"
          value={playerForm.age}
          onChange={(e) => setPlayerForm({...playerForm, age: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="player-category">Categoría</label>
        <select
          id="player-category"
          value={playerForm.category}
          onChange={(e) => setPlayerForm({...playerForm, category: e.target.value})}
        >
          <option value="sub-9">Sub-9</option>
          <option value="sub-11">Sub-11</option>
          <option value="sub-13">Sub-13</option>
          <option value="sub-15">Sub-15</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="player-position">Posición</label>
        <select
          id="player-position"
          value={playerForm.position}
          onChange={(e) => setPlayerForm({...playerForm, position: e.target.value})}
        >
          <option value="Portero">Portero</option>
          <option value="Defensor">Defensor</option>
          <option value="Mediocampista">Mediocampista</option>
          <option value="Delantero">Delantero</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1">
          {modalType === 'add' ? 'Agregar Jugador' : 'Actualizar Jugador'}
        </button>
        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="section-header">
        <h2>Dashboard - {club.name}</h2>
        <p>Gestiona tu club y jugadores</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </div>
        <div
          className={`tab ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          Jugadores
        </div>
        <div
          className={`tab ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Partidos
        </div>
        <div
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Información
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <DashboardCards cards={dashboardCards} />
          
          <div className="section-header mt-8">
            <h3>Próximos Partidos</h3>
          </div>
          
          <div className="space-y-4">
            {clubMatches.filter(m => m.status === 'pendiente').slice(0, 3).map(match => {
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
            })}
          </div>
        </div>
      )}

      {/* Players Tab */}
      {activeTab === 'players' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3>Gestión de Jugadores</h3>
            <button onClick={handleAddPlayer} className="btn-secondary">
              Agregar Jugador
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Categoría</th>
                  <th>Posición</th>
                  <th>Goles</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clubPlayers.map(player => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.age} años</td>
                    <td>{player.category.toUpperCase()}</td>
                    <td>{player.position}</td>
                    <td>{player.goals}</td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditPlayer(player)}
                          className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDeletePlayer(player.id)}
                          className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Matches Tab */}
      {activeTab === 'matches' && (
        <div>
          <h3 className="mb-4">Partidos del Club</h3>
          
          <div className="space-y-4">
            {clubMatches.map(match => {
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
            })}
          </div>
        </div>
      )}

      {/* Info Tab */}
      {activeTab === 'info' && (
        <div>
          <div className="form-container">
            <h3 className="mb-4">Información del Club</h3>
            
            <div className="flex gap-4 mb-6">
              <img src={club.logo} alt={club.name} className="w-24 h-24 object-contain" />
              <div>
                <h4 className="text-xl font-semibold">{club.name}</h4>
                <p className="text-gray-600">{club.region}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Contacto:</strong> {club.contact}</p>
                <p><strong>Teléfono:</strong> {club.phone}</p>
                <p><strong>Dirección:</strong> {club.address}</p>
              </div>
              <div>
                <p><strong>Años en la liga:</strong> {club.years}</p>
                <p><strong>Liga:</strong> {club.league === 'ambas' ? 'Masculina y Femenina' : club.league}</p>
                <p><strong>Categorías:</strong> {club.categories.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Player Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'add' ? 'Agregar Jugador' : 'Editar Jugador'}
      >
        {renderPlayerModal()}
      </Modal>
    </Layout>
  );
}
