'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import DashboardCards from '../../components/DashboardCards';
import Modal from '../../components/Modal';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
  const { 
    data, 
    currentUser, 
    loading, 
    formatDate, 
    getClubById,
    addUser,
    updateUser,
    deleteUser,
    deleteClub,
    deleteMatch,
    deletePlayer
  } = useData();
  
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    role: 'club',
    name: '',
    email: '',
    clubId: ''
  });
  
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!currentUser || currentUser.role !== 'administrador')) {
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

  if (!currentUser || currentUser.role !== 'administrador') {
    return null;
  }

  const dashboardCards = [
    { 
      title: 'Total Usuarios', 
      value: data.users.length,
      subtitle: 'Cuentas registradas'
    },
    { 
      title: 'Clubes Activos', 
      value: data.clubs.length,
      subtitle: 'Escuelas participantes'
    },
    { 
      title: 'Partidos Totales', 
      value: data.matches.length,
      subtitle: 'Encuentros programados'
    },
    { 
      title: 'Jugadores Registrados', 
      value: data.players.length,
      subtitle: 'Deportistas activos'
    }
  ];

  // User Management Functions
  const handleAddUser = () => {
    setModalType('addUser');
    setUserForm({
      username: '',
      password: '',
      role: 'club',
      name: '',
      email: '',
      clubId: ''
    });
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setModalType('editUser');
    setUserForm({
      username: user.username,
      password: '',
      role: user.role,
      name: user.name,
      email: user.email,
      clubId: user.clubId || ''
    });
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (userId === currentUser.id) {
      alert('No puedes eliminar tu propia cuenta');
      return;
    }
    
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      deleteUser(userId);
    }
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    
    const userData = {
      ...userForm,
      clubId: userForm.role === 'club' ? parseInt(userForm.clubId) || null : null
    };

    // Remove empty password for edit
    if (modalType === 'editUser' && !userData.password) {
      delete userData.password;
    }

    if (modalType === 'addUser') {
      addUser(userData);
    } else {
      updateUser(selectedUser.id, userData);
    }

    setIsModalOpen(false);
  };

  const handleDeleteClub = (clubId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este club? Se eliminarán también sus jugadores, partidos y usuarios asociados.')) {
      // Delete associated users first
      const clubUsers = data.users.filter(user => user.clubId === clubId);
      clubUsers.forEach(user => deleteUser(user.id));
      
      // Delete club
      deleteClub(clubId);
    }
  };

  const handleDeleteMatch = (matchId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este partido?')) {
      deleteMatch(matchId);
    }
  };

  const handleDeletePlayer = (playerId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
      deletePlayer(playerId);
    }
  };

  const renderUserModal = () => (
    <form onSubmit={handleSubmitUser}>
      <div className="form-group">
        <label htmlFor="user-username">Usuario</label>
        <input
          type="text"
          id="user-username"
          value={userForm.username}
          onChange={(e) => setUserForm({...userForm, username: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="user-password">
          Contraseña {modalType === 'editUser' && '(dejar vacío para mantener actual)'}
        </label>
        <input
          type="password"
          id="user-password"
          value={userForm.password}
          onChange={(e) => setUserForm({...userForm, password: e.target.value})}
          required={modalType === 'addUser'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="user-role">Rol</label>
        <select
          id="user-role"
          value={userForm.role}
          onChange={(e) => setUserForm({...userForm, role: e.target.value})}
        >
          <option value="administrador">Administrador</option>
          <option value="liga">Gestor de Liga</option>
          <option value="club">Club</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="user-name">Nombre Completo</label>
        <input
          type="text"
          id="user-name"
          value={userForm.name}
          onChange={(e) => setUserForm({...userForm, name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="user-email">Email</label>
        <input
          type="email"
          id="user-email"
          value={userForm.email}
          onChange={(e) => setUserForm({...userForm, email: e.target.value})}
          required
        />
      </div>

      {userForm.role === 'club' && (
        <div className="form-group">
          <label htmlFor="user-club">Club Asociado</label>
          <select
            id="user-club"
            value={userForm.clubId}
            onChange={(e) => setUserForm({...userForm, clubId: e.target.value})}
            required
          >
            <option value="">Seleccionar club</option>
            {data.clubs.map(club => (
              <option key={club.id} value={club.id}>{club.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className="flex gap-2">
        <button type="submit" className="flex-1">
          {modalType === 'addUser' ? 'Crear Usuario' : 'Actualizar Usuario'}
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
        <h2>Panel de Administración</h2>
        <p>Gestión completa del sistema</p>
      </div>

      <div className="admin-panel">
        {/* Admin Menu */}
        <div className="admin-menu">
          <ul>
            <li>
              <a 
                href="#" 
                className={activeSection === 'dashboard' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setActiveSection('dashboard'); }}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeSection === 'users' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setActiveSection('users'); }}
              >
                Gestión de Usuarios
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeSection === 'clubs' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setActiveSection('clubs'); }}
              >
                Gestión de Clubes
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeSection === 'matches' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setActiveSection('matches'); }}
              >
                Gestión de Partidos
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeSection === 'players' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setActiveSection('players'); }}
              >
                Gestión de Jugadores
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={activeSection === 'system' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setActiveSection('system'); }}
              >
                Sistema
              </a>
            </li>
          </ul>
        </div>

        {/* Admin Content */}
        <div className="admin-content">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <div>
              <h3>Dashboard de Administración</h3>
              <p className="mb-6">Bienvenido al panel de administración. Aquí puedes gestionar todos los aspectos del sistema.</p>
              
              <DashboardCards cards={dashboardCards} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="card">
                  <h4 className="font-semibold mb-4">Actividad Reciente</h4>
                  <ul className="space-y-2">
                    <li>• {data.matches.filter(m => m.status === 'pendiente').length} partidos pendientes</li>
                    <li>• {data.players.length} jugadores registrados</li>
                    <li>• {data.clubs.length} clubes activos</li>
                    <li>• {data.users.length} usuarios en el sistema</li>
                  </ul>
                </div>
                
                <div className="card">
                  <h4 className="font-semibold mb-4">Acciones Rápidas</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActiveSection('users')}
                      className="w-full text-left p-2 hover:bg-gray-100 rounded"
                    >
                      Gestionar Usuarios
                    </button>
                    <button 
                      onClick={() => setActiveSection('clubs')}
                      className="w-full text-left p-2 hover:bg-gray-100 rounded"
                    >
                      Gestionar Clubes
                    </button>
                    <button 
                      onClick={() => setActiveSection('matches')}
                      className="w-full text-left p-2 hover:bg-gray-100 rounded"
                    >
                      Gestionar Partidos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Section */}
          {activeSection === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3>Gestión de Usuarios</h3>
                <button onClick={handleAddUser} className="btn-secondary">
                  Crear Usuario
                </button>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Club</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map(user => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${
                            user.role === 'administrador' ? 'badge-danger' :
                            user.role === 'liga' ? 'badge-warning' :
                            'badge-primary'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.clubId ? getClubById(user.clubId)?.name : '-'}</td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditUser(user)}
                              className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Editar
                            </button>
                            {user.id !== currentUser.id && (
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Clubs Section */}
          {activeSection === 'clubs' && (
            <div>
              <h3 className="mb-4">Gestión de Clubes</h3>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Liga</th>
                      <th>Región</th>
                      <th>Jugadores</th>
                      <th>Contacto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.clubs.map(club => (
                      <tr key={club.id}>
                        <td>{club.name}</td>
                        <td>{club.league === 'ambas' ? 'Masculina y Femenina' : club.league}</td>
                        <td>{club.region}</td>
                        <td>{club.players}</td>
                        <td>{club.contact}</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteClub(club.id)}
                            className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Matches Section */}
          {activeSection === 'matches' && (
            <div>
              <h3 className="mb-4">Gestión de Partidos</h3>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Liga</th>
                      <th>Local</th>
                      <th>Visitante</th>
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
                          <td>{formatDate(match.date)}</td>
                          <td>{match.league}</td>
                          <td>{homeClub?.name}</td>
                          <td>{awayClub?.name}</td>
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
                            <button 
                              onClick={() => handleDeleteMatch(match.id)}
                              className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Players Section */}
          {activeSection === 'players' && (
            <div>
              <h3 className="mb-4">Gestión de Jugadores</h3>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Club</th>
                      <th>Categoría</th>
                      <th>Posición</th>
                      <th>Goles</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.players.map(player => {
                      const club = getClubById(player.clubId);
                      
                      return (
                        <tr key={player.id}>
                          <td>{player.name}</td>
                          <td>{player.age} años</td>
                          <td>{club?.name}</td>
                          <td>{player.category.toUpperCase()}</td>
                          <td>{player.position}</td>
                          <td>{player.goals}</td>
                          <td>
                            <button 
                              onClick={() => handleDeletePlayer(player.id)}
                              className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* System Section */}
          {activeSection === 'system' && (
            <div>
              <h3 className="mb-4">Configuración del Sistema</h3>
              
              <div className="space-y-6">
                <div className="card">
                  <h4 className="font-semibold mb-4">Información del Sistema</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Versión:</strong> 1.0.0</p>
                      <p><strong>Base de datos:</strong> LocalStorage</p>
                      <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CL')}</p>
                    </div>
                    <div>
                      <p><strong>Total registros:</strong> {data.clubs.length + data.matches.length + data.players.length + data.users.length}</p>
                      <p><strong>Espacio usado:</strong> ~{Math.round(JSON.stringify(data).length / 1024)} KB</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h4 className="font-semibold mb-4">Acciones del Sistema</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        if (confirm('¿Estás seguro de que quieres exportar todos los datos?')) {
                          const dataStr = JSON.stringify(data, null, 2);
                          const dataBlob = new Blob([dataStr], {type: 'application/json'});
                          const url = URL.createObjectURL(dataBlob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = 'liga-data-backup.json';
                          link.click();
                        }
                      }}
                      className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded border"
                    >
                      📥 Exportar Datos del Sistema
                    </button>
                    
                    <button 
                      onClick={() => {
                        if (confirm('⚠️ ADVERTENCIA: Esto eliminará TODOS los datos del sistema. ¿Estás completamente seguro?')) {
                          if (confirm('Esta acción NO se puede deshacer. ¿Continuar?')) {
                            localStorage.clear();
                            window.location.reload();
                          }
                        }
                      }}
                      className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded border border-red-200 text-red-700"
                    >
                      🗑️ Resetear Sistema (PELIGROSO)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'addUser' ? 'Crear Usuario' : 'Editar Usuario'}
      >
        {renderUserModal()}
      </Modal>
    </Layout>
  );
}
