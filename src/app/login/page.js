'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { useData } from '../../context/DataContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useData();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = login(username, password);
    
    if (result.success) {
      // Redirect based on user role
      switch (result.user.role) {
        case 'administrador':
          router.push('/admin');
          break;
        case 'liga':
          router.push('/league-dashboard');
          break;
        case 'club':
          router.push('/club-dashboard');
          break;
        default:
          router.push('/');
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Layout>
      <div className="section-header">
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu panel de gestión</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full">
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold mb-2">Usuarios de Prueba:</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Administrador:</strong> admin / admin123
            </div>
            <div>
              <strong>Gestor Liga:</strong> liga_manager / liga123
            </div>
            <div>
              <strong>Club Los Cóndores:</strong> condores_club / condores123
            </div>
            <div>
              <strong>Club Estrella del Sur:</strong> estrella_club / estrella123
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
