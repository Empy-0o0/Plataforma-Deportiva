'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import initialData from '../data/ligaData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Initialize data from localStorage or use initial data
      const storedData = localStorage.getItem('ligaData');
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        localStorage.setItem('ligaData', JSON.stringify(initialData));
        setData(initialData);
      }

      // Check for logged in user
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setData(initialData);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = (newData) => {
    try {
      localStorage.setItem('ligaData', JSON.stringify(newData));
      setData(newData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const login = (username, password) => {
    if (!data) return { success: false, message: 'Datos no disponibles' };

    const user = data.users.find(u => u.username === username && u.password === password);
    if (user) {
      const userSession = { ...user };
      delete userSession.password; // Don't store password in session
      setCurrentUser(userSession);
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      return { success: true, user: userSession };
    }
    return { success: false, message: 'Credenciales incorrectas' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Club management functions
  const addClub = (clubData) => {
    if (!data) return false;
    
    const newClub = {
      ...clubData,
      id: Math.max(...data.clubs.map(c => c.id)) + 1,
      players: 0
    };
    
    const newData = {
      ...data,
      clubs: [...data.clubs, newClub]
    };
    
    updateData(newData);
    return true;
  };

  const updateClub = (clubId, clubData) => {
    if (!data) return false;
    
    const newData = {
      ...data,
      clubs: data.clubs.map(club => 
        club.id === clubId ? { ...club, ...clubData } : club
      )
    };
    
    updateData(newData);
    return true;
  };

  const deleteClub = (clubId) => {
    if (!data) return false;
    
    const newData = {
      ...data,
      clubs: data.clubs.filter(club => club.id !== clubId),
      players: data.players.filter(player => player.clubId !== clubId),
      matches: data.matches.filter(match => match.home !== clubId && match.away !== clubId)
    };
    
    updateData(newData);
    return true;
  };

  // Player management functions
  const addPlayer = (playerData) => {
    if (!data) return false;
    
    const newPlayer = {
      ...playerData,
      id: Math.max(...data.players.map(p => p.id)) + 1,
      goals: 0
    };
    
    const newData = {
      ...data,
      players: [...data.players, newPlayer]
    };
    
    // Update club player count
    const clubIndex = newData.clubs.findIndex(c => c.id === playerData.clubId);
    if (clubIndex !== -1) {
      newData.clubs[clubIndex].players += 1;
    }
    
    updateData(newData);
    return true;
  };

  const updatePlayer = (playerId, playerData) => {
    if (!data) return false;
    
    const newData = {
      ...data,
      players: data.players.map(player => 
        player.id === playerId ? { ...player, ...playerData } : player
      )
    };
    
    updateData(newData);
    return true;
  };

  const deletePlayer = (playerId) => {
    if (!data) return false;
    
    const player = data.players.find(p => p.id === playerId);
    if (!player) return false;
    
    const newData = {
      ...data,
      players: data.players.filter(player => player.id !== playerId)
    };
    
    // Update club player count
    const clubIndex = newData.clubs.findIndex(c => c.id === player.clubId);
    if (clubIndex !== -1) {
      newData.clubs[clubIndex].players -= 1;
    }
    
    updateData(newData);
    return true;
  };

  // Match management functions
  const addMatch = (matchData) => {
    if (!data) return false;
    
    const newMatch = {
      ...matchData,
      id: Math.max(...data.matches.map(m => m.id)) + 1,
      homeScore: null,
      awayScore: null,
      status: 'pendiente'
    };
    
    const newData = {
      ...data,
      matches: [...data.matches, newMatch]
    };
    
    updateData(newData);
    return true;
  };

  const updateMatch = (matchId, matchData) => {
    if (!data) return false;
    
    const newData = {
      ...data,
      matches: data.matches.map(match => 
        match.id === matchId ? { ...match, ...matchData } : match
      )
    };
    
    updateData(newData);
    return true;
  };

  const deleteMatch = (matchId) => {
    if (!data) return false;
    
    const newData = {
      ...data,
      matches: data.matches.filter(match => match.id !== matchId)
    };
    
    updateData(newData);
    return true;
  };

  // User management functions
  const addUser = (userData) => {
    if (!data) return false;
    
    const newUser = {
      ...userData,
      id: Math.max(...data.users.map(u => u.id)) + 1
    };
    
    const newData = {
      ...data,
      users: [...data.users, newUser]
    };
    
    updateData(newData);
    return true;
  };

  const updateUser = (userId, userData) => {
    if (!data) return false;
    
    const newData = {
      ...data,
      users: data.users.map(user => 
        user.id === userId ? { ...user, ...userData } : user
      )
    };
    
    updateData(newData);
    return true;
  };

  const deleteUser = (userId) => {
    if (!data) return false;
    
    const newData = {
      ...data,
      users: data.users.filter(user => user.id !== userId)
    };
    
    updateData(newData);
    return true;
  };

  // Utility functions
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CL', options);
  };

  const getClubById = (clubId) => {
    return data?.clubs.find(club => club.id === clubId);
  };

  const getPlayersByClub = (clubId) => {
    return data?.players.filter(player => player.clubId === clubId) || [];
  };

  const getMatchesByClub = (clubId) => {
    return data?.matches.filter(match => match.home === clubId || match.away === clubId) || [];
  };

  const getUpcomingMatches = (limit = 5) => {
    const today = new Date().toISOString().split('T')[0];
    return data?.matches
      .filter(match => match.date >= today && match.status === 'pendiente')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit) || [];
  };

  const value = {
    data,
    currentUser,
    loading,
    updateData,
    login,
    logout,
    addClub,
    updateClub,
    deleteClub,
    addPlayer,
    updatePlayer,
    deletePlayer,
    addMatch,
    updateMatch,
    deleteMatch,
    addUser,
    updateUser,
    deleteUser,
    formatDate,
    getClubById,
    getPlayersByClub,
    getMatchesByClub,
    getUpcomingMatches
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
