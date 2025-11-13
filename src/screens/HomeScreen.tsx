import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GlucoseChecker } from '../components/glucose/GlucoseChecker';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showGlucoseChecker, setShowGlucoseChecker] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-screen">
      <header className="home-header">
        <h1>Bienvenido, {user?.name || 'Usuario'}</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      <main className="home-content">
        <div className="welcome-section">
          <h2>GlucosaGuide</h2>
          <p>Tu compañero para el manejo de la diabetes tipo 2</p>
        </div>

        <button
          className="btn-glucose-toggle"
          onClick={() => setShowGlucoseChecker(!showGlucoseChecker)}
        >
          {showGlucoseChecker ? 'Ocultar Verificador' : 'Verificar Nivel de Glucosa'}
          <span className="toggle-icon">{showGlucoseChecker ? '▲' : '▼'}</span>
        </button>

        {showGlucoseChecker && <GlucoseChecker />}

        <div className="features-grid">
          <div className="feature-card" onClick={() => navigate('/foods')}>
            <span className="feature-icon">🍎</span>
            <h3>Buscar Alimentos</h3>
            <p>Consulta información nutricional de alimentos</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/food-tracking')}>
            <span className="feature-icon">📝</span>
            <h3>Seguimiento</h3>
            <p>Registra tus comidas y niveles de glucosa</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/education')}>
            <span className="feature-icon">📚</span>
            <h3>Educación</h3>
            <p>Aprende sobre diabetes y nutrición</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/glucose')}>
            <span className="feature-icon">📊</span>
            <h3>Glucosa</h3>
            <p>Monitorea tus niveles de glucosa</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/profile')}>
            <span className="feature-icon">👤</span>
            <h3>Perfil</h3>
            <p>Configura tus preferencias</p>
          </div>
        </div>
      </main>

      <style>{`
        .home-screen {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .home-header h1 {
          margin: 0;
          color: #333;
          font-size: 24px;
        }

        .logout-btn {
          padding: 10px 20px;
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }

        .logout-btn:hover {
          background: #ff5252;
        }

        .welcome-section {
          text-align: center;
          margin-bottom: 30px;
        }

        .welcome-section h2 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 28px;
        }

        .welcome-section p {
          margin: 0;
          color: #666;
          font-size: 18px;
        }

        .btn-glucose-toggle {
          width: 100%;
          padding: 15px;
          background: #764ba2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          transition: background-color 0.2s ease;
        }

        .btn-glucose-toggle:hover {
          background: #6a4190;
        }

        .toggle-icon {
          font-size: 18px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .feature-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }

        .feature-card h3 {
          margin: 0 0 12px 0;
          color: #333;
          font-size: 20px;
        }

        .feature-card p {
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .home-screen {
            padding: 16px;
          }

          .home-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};