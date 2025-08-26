'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useData } from '../context/DataContext';

const Header = () => {
  const pathname = usePathname();
  const { currentUser, logout } = useData();

  const getNavItems = () => {
    const baseItems = [
      { name: 'Inicio', path: '/' }
    ];

    if (currentUser) {
      switch (currentUser.role) {
        case 'administrador':
          return [
            ...baseItems,
            { name: 'Panel Admin', path: '/admin' },
            { name: 'Dashboard Liga', path: '/league-dashboard' },
            { name: 'Dashboard Club', path: '/club-dashboard' }
          ];
        case 'liga':
          return [
            ...baseItems,
            { name: 'Dashboard Liga', path: '/league-dashboard' },
            { name: 'Gestión Clubes', path: '/league-dashboard?tab=clubs' },
            { name: 'Gestión Partidos', path: '/league-dashboard?tab=matches' }
          ];
        case 'club':
          return [
            ...baseItems,
            { name: 'Mi Club', path: '/club-dashboard' },
            { name: 'Mis Jugadores', path: '/club-dashboard?tab=players' },
            { name: 'Mis Partidos', path: '/club-dashboard?tab=matches' }
          ];
        default:
          return baseItems;
      }
    }

    return [
      ...baseItems,
      { name: 'Clubes', path: '/clubes' },
      { name: 'Partidos', path: '/partidos' },
      { name: 'Tablas', path: '/tablas' },
      { name: 'Iniciar Sesión', path: '/login' }
    ];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <Link href="/">
            <h1 className="cursor-pointer">Liga Fútbol Formativo</h1>
          </Link>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>
                  <span className={`nav-link ${pathname === item.path ? 'active' : ''}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
            {currentUser && (
              <li>
                <div className="flex items-center gap-4">
                  <span className="text-sm">
                    Hola, {currentUser.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="text-sm bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
