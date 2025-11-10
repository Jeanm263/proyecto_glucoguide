import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toastInfo } from '../utils/toast';
import { BottomNavigation } from '../components/common/BottomNavigation';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    toastInfo('Cerrando sesión...');
    logout();
    // La navegación se maneja en el logout
  };

  const handleEditProfile = () => {
    // Navegar a la pantalla de edición de perfil
    navigate('/profile/edit');
  };

  const handleViewHistory = () => {
    // Navegar a la pantalla de seguimiento de alimentos
    navigate('/food-tracking');
  };

  const handleViewFavorites = () => {
    // Navegar a la pantalla de búsqueda de alimentos
    navigate('/foods');
  };

  const handleViewSettings = () => {
    // Navegar a una pantalla de configuración
    toastInfo('Función de configuración en desarrollo');
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <div className="profile-header-content">
          <h1 className="profile-title">
            <span aria-hidden="true">👤</span> Mi Perfil
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="profile-content fade-in">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user?.name || 'Usuario'}</h2>
            <p className="profile-email">{user?.email || 'email@ejemplo.com'}</p>
            {user?.age && (
              <p className="profile-detail">
                <strong>Edad:</strong> {user.age} años
              </p>
            )}
            {user?.diabetesType && (
              <p className="profile-detail">
                <strong>Tipo de Diabetes:</strong> {user.diabetesType}
              </p>
            )}
          </div>
        </div>

        {/* Options Grid */}
        <div className="options-grid">
          <button 
            className="option-card card-hover"
            onClick={handleEditProfile}
            aria-label="Editar perfil"
          >
            <div className="option-icon">✏️</div>
            <h3 className="option-title">Editar Perfil</h3>
            <p className="option-description">Actualiza tu información personal</p>
          </button>

          <button 
            className="option-card card-hover"
            onClick={handleViewHistory}
            aria-label="Historial de alimentos"
          >
            <div className="option-icon">📅</div>
            <h3 className="option-title">Historial</h3>
            <p className="option-description">Ver alimentos registrados</p>
          </button>

          <button 
            className="option-card card-hover"
            onClick={handleViewFavorites}
            aria-label="Alimentos favoritos"
          >
            <div className="option-icon">⭐</div>
            <h3 className="option-title">Favoritos</h3>
            <p className="option-description">Tus alimentos preferidos</p>
          </button>

          <button 
            className="option-card card-hover"
            onClick={handleViewSettings}
            aria-label="Configuración"
          >
            <div className="option-icon">⚙️</div>
            <h3 className="option-title">Configuración</h3>
            <p className="option-description">Preferencias y notificaciones</p>
          </button>
        </div>

        {/* Logout Button */}
        <div className="logout-section">
          <button
            onClick={handleLogout}
            className="btn-logout-full"
            aria-label="Cerrar sesión"
          >
            <span aria-hidden="true">🚪</span> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      <style>{`
        .profile-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 80px; /* Espacio para la navegación inferior */
        }

        .profile-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .profile-header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .profile-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .profile-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .avatar-icon {
          font-size: 40px;
          color: white;
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0 0 8px 0;
        }

        .profile-email {
          font-size: 16px;
          color: #666;
          margin: 0 0 12px 0;
        }

        .profile-detail {
          font-size: 14px;
          color: #999;
          margin: 4px 0;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .option-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
          text-align: center;
          width: 100%;
        }

        .option-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          border-color: #667eea;
        }

        .option-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .option-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
        }

        .option-description {
          font-size: 14px;
          color: #999;
          margin: 0;
          line-height: 1.4;
        }

        .logout-section {
          text-align: center;
        }

        .btn-logout-full {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .btn-logout-full:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
        }

        @media (max-width: 768px) {
          .profile-card {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }

          .profile-avatar {
            width: 100px;
            height: 100px;
          }

          .avatar-icon {
            font-size: 50px;
          }

          .profile-title {
            font-size: 24px;
          }

          .options-grid {
            grid-template-columns: 1fr;
          }

          .profile-page {
            padding-bottom: 90px; /* Ajustar para navegación móvil */
          }
        }

        @media (max-width: 480px) {
          .profile-content {
            padding: 20px 16px;
          }

          .profile-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};