import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const SettingsScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: 'var(--spacing-md)' }}>
      <div className="modern-card">
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-lg)' 
        }}>
          <h1 className="modern-card-title" style={{ 
            fontSize: '1.5rem',
            margin: 0
          }}>
            Configuración
          </h1>
        </div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-lg)'
        }}>
          <div className="modern-card">
            <h2 className="modern-card-title" style={{ 
              fontSize: '1.25rem',
              marginBottom: 'var(--spacing-md)'
            }}>
              Preferencias del Usuario
            </h2>
            <p style={{ 
              color: 'var(--neutral-600)',
              margin: '0 0 var(--spacing-md) 0'
            }}>
              Información básica del perfil:
            </p>
            
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-xs)'
            }}>
              <p style={{ margin: 0 }}>
                <strong>Nombre:</strong> {user?.name || 'No disponible'}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Email:</strong> {user?.email || 'No disponible'}
              </p>
              {user?.age && (
                <p style={{ margin: 0 }}>
                  <strong>Edad:</strong> {user.age} años
                </p>
              )}
              {user?.diabetesType && (
                <p style={{ margin: 0 }}>
                  <strong>Tipo de Diabetes:</strong>
                  {user.diabetesType === 'type1' && ' Tipo 1'}
                  {user.diabetesType === 'type2' && ' Tipo 2'}
                  {user.diabetesType === 'gestational' && ' Gestacional'}
                  {user.diabetesType === 'prediabetes' && ' Prediabetes'}
                  {user.diabetesType === 'other' && ' Otro'}
                </p>
              )}
            </div>
          </div>

          <div className="modern-card">
            <h2 className="modern-card-title" style={{ 
              fontSize: '1.25rem',
              marginBottom: 'var(--spacing-md)'
            }}>
              Notificaciones
            </h2>
            <p style={{ 
              color: 'var(--neutral-600)',
              margin: 0
            }}>
              Próximamente: Configuración de notificaciones push y recordatorios
            </p>
          </div>

          <div className="modern-card">
            <h2 className="modern-card-title" style={{ 
              fontSize: '1.25rem',
              marginBottom: 'var(--spacing-md)'
            }}>
              Privacidad
            </h2>
            <p style={{ 
              color: 'var(--neutral-600)',
              margin: 0
            }}>
              Próximamente: Configuración de privacidad y datos personales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};