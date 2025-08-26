'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '../../components/Layout';
import DashboardCards from '../../components/DashboardCards';
import StandingsTable from '../../components/StandingsTable';
import MatchCard from '../../components/MatchCard';
import ClubCard from '../../components/ClubCard';
import Modal from '../../components/Modal';
import { useData } from '../../context/DataContext';

export default function LeagueDashboard() {
  const { 
    data, 
    currentUser, 
    loading, 
    formatDate, 
    getClubById, 
    addClub, 
    updateClub, 
    deleteClub,
    addMatch,
    updateMatch,
    deleteMatch
  } = useData();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [clubForm, setClubForm] = useState({
    name: '',
    league: 'masculino',
    region: 'metropolitana',
    contact: '',
    phone: '',
    address: '',
    categories: []
  });
  const [matchForm, setMatchForm] = useState({
    date: '',
    time: '',
    league: 'masculino',
    category: 'sub-11',
    home: '',
    away: '',
    field: '',
    location: ''
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
    if (!loading && (!currentUser || (currentUser.role !== 'liga' && currentUser.role !== 'administrador'))) {
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

  if (!currentUser || (currentUser.role !== 'liga' && currentUser.role !== 'administrador')) {
    return null;
  }

  const dashboardCards = [
    { 
      title: 'Total Clubes', 
      value: data.clubs.length,
      subtitle: 'Escuelas registradas'
    },
    { 
      title: 'Partidos Programados', 
      value: data.matches.filter(m => m.status === 'pendiente').length,
      subtitle: 'Próximos encuentros'
    },
    { 
      title: 'Partidos Completados', 
      value: data.matches.filter(m => m.status === 'jugado').length,
      subtitle: 'Encuentros finalizados'
    },
    { 
      title: 'Jugadores Activos', 
      value: data.players.length,
      subtitle: 'Total deportistas'
    }
  ];

  // Club Management Functions
  const handleAddClub = () => {
    setModalType('addClub');
    setClubForm({
      name: '',
      league: 'masculino',
      region: 'metropolitana',
      contact: '',
      phone: '',
      address: '',
      categories: []
    });
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEditClub = (club) => {
    setModalType('editClub');
    setClubForm({
      name: club.name,
      league: club.league,
      region: club.region,
      contact: club.contact,
      phone: club.phone,
      address: club.address,
      categories: club.categories
    });
    setSelectedItem(club);
    setIsModalOpen(true);
  };

  const handleDeleteClub = (clubId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este club? Se eliminarán también sus jugadores y partidos.')) {
      deleteClub(clubId);
    }
  };

  const handleSubmitClub = (e) => {
    e.preventDefault();
    
    const clubData = {
      ...clubForm,
      years: selectedItem ? selectedItem.years : 1,
      logo: selectedItem ? selectedItem.logo : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48Y2lyY2xlIGZpbGw9IiMwMDViYWEiIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIvPjx0ZXh0IGZpbGw9IiNmZmYiIHg9IjUwJSIgeT0iNTAlIiBkeT0iLjNlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI2MCI+QzwvdGV4dD48L3N2Zz4="
    };

    if (modalType === 'addClub') {
      addClub(clubData);
    } else {
      updateClub(selectedItem.id, clubData);
    }

    setIsModalOpen(false);
  };

  // Match Management Functions
  const handleAddMatch = () => {
    setModalType('addMatch');
    setMatchForm({
      date: '',
      time: '',
      league: 'masculino',
      category: 'sub-11',
      home: '',
      away: '',
      field: '',
      location: ''
    });
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEditMatch = (match) => {
    setModalType('editMatch');
    setMatchForm({
      date: match.date,
      time: match.time,
      league: match.league,
      category: match.category,
      home: match.home.toString(),
      away: match.away.toString(),
      field: match.field,
      location: match.location
    });
    setSelectedItem(match);
    setIsModalOpen(true);
  };

  const handleDeleteMatch = (matchId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este partido?')) {
      deleteMatch(matchId);
    }
  };

  const handleSubmitMatch = (e) => {
    e.preventDefault();
    
    const matchData = {
      ...matchForm,
      home: parseInt(matchForm.home),
      away: parseInt(matchForm.away)
    };

    if (modalType === 'addMatch') {
      addMatch(matchData);
    } else {
      updateMatch(selectedItem.id, matchData);
    }

    setIsModalOpen(false);
  };

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setClubForm({
        ...clubForm,
        categories: [...clubForm.categories, category]
      });
    } else {
      setClubForm({
        ...clubForm,
        categories: clubForm.categories.filter(c => c !== category)
      });
    }
  };

  const renderClubModal = () => (
    <form onSubmit={handleSubmitClub}>
      <div className="form-group">
        <label htmlFor="club-name">Nombre del Club</label>
        <input
          type="text"
          id="club-name"
          value={clubForm.name}
          onChange={(e) => setClubForm({...clubForm, name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="club-league">Liga</label>
        <select
          id="club-league"
          value={clubForm.league}
          onChange={(e) => setClubForm({...clubForm, league: e.target.value})}
        >
          <option value="masculino">Masculina</option>
          <option value="femenino">Femenina</option>
          <option value="ambas">Ambas</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="club-region">Región</label>
        <select
          id="club-region"
          value={clubForm.region}
          onChange={(e) => setClubForm({...clubForm, region: e.target.value})}
        >
          <option value="metropolitana">Metropolitana</option>
          <option value="valparaiso">Valparaíso</option>
          <option value="bio-bio">Biobío</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="club-contact">Email de Contacto</label>
        <input
          type="email"
          id="club-contact"
          value={clubForm.contact}
          onChange={(e) => setClubForm({...clubForm, contact: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="club-phone">Teléfono</label>
        <input
          type="tel"
          id="club-phone"
          value={clubForm.phone}
          onChange={(e) => setClubForm({...clubForm, phone: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="club-address">Dirección</label>
        <input
          type="text"
          id="club-address"
          value={clubForm.address}
          onChange={(e) => setClubForm({...clubForm, address: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Categorías</label>
        <div className="flex flex-wrap gap-4">
          {['sub-9', 'sub-11', 'sub-13', 'sub-15'].map(category => (
            <label key={category} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={clubForm.categories.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1">
          {modalType === 'addClub' ? 'Crear Club' : 'Actualizar Club'}
        </button>
        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );

  const renderMatchModal = () => (
    <form onSubmit={handleSubmitMatch}>
      <div className="form-group">
        <label htmlFor="match-date">Fecha</label>
        <input
          type="date"
          id="match-date"
          value={matchForm.date}
          onChange={(e) => setMatchForm({...matchForm, date: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="match-time">Hora</label>
        <input
          type="time"
          id="match-time"
          value={matchForm.time}
          onChange={(e) => setMatchForm({...matchForm, time: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="match-league">Liga</label>
        <select
          id="match-league"
          value={matchForm.league}
          onChange={(e) => setMatchForm({...matchForm, league: e.target.value})}
        >
          <option value="masculino">Masculina</option>
          <option value="femenino">Femenina</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="match-category">Categoría</label>
        <select
          id="match-category"
          value={matchForm.category}
          onChange={(e) => setMatchForm({...matchForm, category: e.target.value})}
        >
          <option value="sub-9">Sub-9</option>
          <option value="sub-11">Sub-11</option>
          <option value="sub-13">Sub-13</option>
          <option value="sub-15">Sub-15</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="match-home">Equipo Local</label>
        <select
          id="match-home"
          value={matchForm.home}
          onChange={(e) => setMatchForm({...matchForm, home: e.target.value})}
          required
        >
          <option value="">Seleccionar club</option>
          {data.clubs.map(club => (
            <option key={club.id} value={club.id}>{club.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="match-away">Equipo Visitante</label>
        <select
          id="match-away"
          value={matchForm.away}
          onChange={(e) => setMatchForm({...matchForm, away: e.target.value})}
          required
        >
          <option value="">Seleccionar club</option>
          {data.clubs.map(club => (
            <option key={club.id} value={club.id}>{club.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="match-field">Cancha</label>
        <input
          type="text"
          id="match-field"
          value={matchForm.field}
          onChange={(e) => setMatchForm({...matchForm, field: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="match-location">Ubicación</label>
        <input
          type="text"
          id="match-location"
          value={matchForm.location}
          onChange={(e) => setMatchForm({...matchForm, location: e.target.value})}
          required
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1">
          {modalType === 'addMatch' ? 'Programar Partido' : 'Actualizar Partido'}
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
        <h2>Dashboard de Liga</h2>
        <p>Gestión completa de la liga deportiva</p>
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
          className={`tab ${activeTab === 'clubs' ? 'active' : ''}`}
          onClick={() => setActiveTab('clubs')}
        >
          Gestión Clubes
        </div>
        <div
          className={`tab ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Gestión Partidos
        </div>
        <div
          className={`tab ${activeTab === 'standings' ? 'active' : ''}`}
          onClick={() => setActiveTab('standings')}
        >
          Tablas
        </div>
        <div
          className={`tab ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          Estadísticas
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <DashboardCards cards={dashboardCards} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="mb-4">Próximos Partidos</h3>
              <div className="space-y-4">
                {data.matches.filter(m => m.status === 'pendiente').slice(0, 3).map(match => {
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
            
            <div>
              <h3 className="mb-4">Tabla de Posiciones - Liga Masculina</h3>
              <StandingsTable 
                standings={data.standings.masculino || []} 
                clubs={data.clubs} 
                league="masculino"
                category="general"
              />
            </div>
          </div>
        </div>
      )}

      {/* Clubs Tab */}
      {activeTab === 'clubs' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3>Gestión de Clubes</h3>
            <button onClick={handleAddClub} className="btn-secondary">
              Crear Nuevo Club
            </button>
          </div>

          <div className="clubs-grid">
            {data.clubs.map(club => (
              <div key={club.id} className="club-card">
                <img src={club.logo} alt={club.name} />
                <div className="club-card-content">
                  <h3>{club.name}</h3>
                  <p><strong>Liga:</strong> {club.league === 'ambas' ? 'Masculina y Femenina' : club.league}</p>
                  <p><strong>Región:</strong> {club.region}</p>
                  <p><strong>Jugadores:</strong> {club.players}</p>
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => handleEditClub(club)}
                      className="flex-1 text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteClub(club.id)}
                      className="flex-1 text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matches Tab */}
      {activeTab === 'matches' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3>Gestión de Partidos</h3>
            <button onClick={handleAddMatch} className="btn-secondary">
              Programar Partido
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Liga</th>
                  <th>Local</th>
                  <th>Visitante</th>
                  <th>Resultado</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.matches.map(match => {
                  const homeClub = getClubById(match.home);
                  const awayClub = getClubById(match.away);
                  
                  return (
                    <tr key={match.id}>
                      <td>{formatDate(match.date)} {match.time}</td>
                      <td>{match.league}</td>
                      <td>{homeClub?.name}</td>
                      <td>{awayClub?.name}</td>
                      <td>
                        {match.status === 'jugado' 
                          ? `${match.homeScore} - ${match.awayScore}` 
                          : '-'
                        }
                      </td>
                      <td>
                        <span className={`badge ${
                          match.status === 'jugado' ? 'badge-success' : 
                          match.status === 'pendiente' ? 'badge-primary' : 
                          'badge-warning'
                        }`}>
                          {match.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditMatch(match)}
                            className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => handleDeleteMatch(match.id)}
                            className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Standings Tab */}
      {activeTab === 'standings' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <StandingsTable 
                standings={data.standings.masculino || []} 
                clubs={data.clubs} 
                league="masculino"
                category="general"
              />
            </div>
            <div>
              <StandingsTable 
                standings={data.standings.femenino || []} 
                clubs={data.clubs} 
                league="femenino"
                category="general"
              />
            </div>
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <div>
          <h3 className="mb-4">Estadísticas de la Liga</h3>
          
          <DashboardCards cards={[
            { 
              title: 'Total Goles', 
              value: data.players.reduce((total, player) => total + player.goals, 0),
              subtitle: 'En toda la liga'
            },
            { 
              title: 'Promedio por Partido', 
              value: (data.players.reduce((total, player) => total + player.goals, 0) / Math.max(data.matches.filter(m => m.status === 'jugado').length, 1)).toFixed(2),
              subtitle: 'Goles por encuentro'
            },
            { 
              title: 'Máximo Goleador', 
              value: Math.max(...data.players.map(p => p.goals), 0),
              subtitle: data.players.find(p => p.goals === Math.max(...data.players.map(p => p.goals), 0))?.name || 'N/A'
            },
            { 
              title: 'Partidos Completados', 
              value: `${Math.round((data.matches.filter(m => m.status === 'jugado').length / data.matches.length) * 100)}%`,
              subtitle: 'Del total programado'
            }
          ]} />
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === 'addClub' ? 'Crear Nuevo Club' :
          modalType === 'editClub' ? 'Editar Club' :
          modalType === 'addMatch' ? 'Programar Partido' :
          'Editar Partido'
        }
      >
        {(modalType === 'addClub' || modalType === 'editClub') && renderClubModal()}
        {(modalType === 'addMatch' || modalType === 'editMatch') && renderMatchModal()}
      </Modal>
    </Layout>
  );
}
