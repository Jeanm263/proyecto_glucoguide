import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { BottomNavigation } from '../components/common/BottomNavigation';

export const ProfileScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <div className="profile-screen">
        <div className="profile-header">
          <h1>Perfil de Usuario</h1>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-info">
              <h2>Información Personal</h2>
              
              <div className="info-item">
                <label>Nombre:</label>
                <span>{user?.name || 'No disponible'}</span>
              </div>
              
              <div className="info-item">
                <label>Email:</label>
                <span>{user?.email || 'No disponible'}</span>
              </div>
              
              {user?.age && (
                <div className="info-item">
                  <label>Edad:</label>
                  <span>{user.age} años</span>
                </div>
              )}
              
              {user?.diabetesType && (
                <div className="info-item">
                  <label>Tipo de Diabetes:</label>
                  <span>
                    {user.diabetesType === 'type1' && 'Tipo 1'}
                    {user.diabetesType === 'type2' && 'Tipo 2'}
                    {user.diabetesType === 'gestational' && 'Gestacional'}
                    {user.diabetesType === 'prediabetes' && 'Prediabetes'}
                    {user.diabetesType === 'other' && 'Otro'}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="settings-section">
            <h2>Configuración</h2>
            <p>Próximamente: Configuración de notificaciones y preferencias</p>
          </div>
        </div>

        <style>{`
          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          
          .profile-screen {
            flex: 1;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            padding-bottom: 80px;
          }

          .profile-header {
            margin-bottom: 30px;
          }

          .profile-header h1 {
            margin: 0;
            color: #333;
            font-size: 28px;
          }

          .profile-content {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }

          .profile-card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .profile-info h2 {
            margin: 0 0 20px 0;
            color: #333;
            font-size: 22px;
          }

          .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
          }

          .info-item:last-child {
            border-bottom: none;
          }

          .info-item label {
            font-weight: 600;
            color: #555;
          }

          .info-item span {
            color: #333;
          }

          .settings-section h2 {
            margin: 0 0 16px 0;
            color: #333;
            font-size: 22px;
          }

          .settings-section p {
            color: #666;
            font-size: 16px;
          }

          @media (max-width: 768px) {
            .profile-screen {
              padding: 16px;
            }

            .profile-card {
              padding: 16px;
            }

            .info-item {
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
          }
        `}</style>
      </div>
      <BottomNavigation />
    </div>
  );
};