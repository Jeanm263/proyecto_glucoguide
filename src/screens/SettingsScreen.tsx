import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const SettingsScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <h1>Configuración</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Preferencias del Usuario</h2>
          <p>Información básica del perfil:</p>
          
          <div className="user-info">
            <p><strong>Nombre:</strong> {user?.name || 'No disponible'}</p>
            <p><strong>Email:</strong> {user?.email || 'No disponible'}</p>
            {user?.age && <p><strong>Edad:</strong> {user.age} años</p>}
            {user?.diabetesType && (
              <p><strong>Tipo de Diabetes:</strong> 
                {user.diabetesType === 'type1' && ' Tipo 1'}
                {user.diabetesType === 'type2' && ' Tipo 2'}
                {user.diabetesType === 'gestational' && ' Gestacional'}
                {user.diabetesType === 'prediabetes' && ' Prediabetes'}
                {user.diabetesType === 'other' && ' Otro'}
              </p>
            )}
          </div>
        </div>

        <div className="settings-section">
          <h2>Notificaciones</h2>
          <p>Próximamente: Configuración de notificaciones push y recordatorios</p>
        </div>

        <div className="settings-section">
          <h2>Privacidad</h2>
          <p>Próximamente: Configuración de privacidad y datos personales</p>
        </div>
      </div>

      <style>{`
        .settings-screen {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .settings-header {
          margin-bottom: 30px;
        }

        .settings-header h1 {
          margin: 0;
          color: #333;
          font-size: 28px;
        }

        .settings-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .settings-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .settings-section h2 {
          margin: 0 0 16px 0;
          color: #333;
          font-size: 22px;
        }

        .settings-section p {
          color: #666;
          font-size: 16px;
          margin: 0 0 16px 0;
        }

        .user-info p {
          margin: 8px 0;
          color: #333;
        }

        @media (max-width: 768px) {
          .settings-screen {
            padding: 16px;
          }

          .settings-section {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};