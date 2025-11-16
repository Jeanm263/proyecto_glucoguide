import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const ProfileScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: 'var(--spacing-md)' }}>
      <div className="modern-card">
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h1 className="modern-card-title">Perfil de Usuario</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div className="modern-card">
            <div>
              <h2 className="modern-card-title" style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Información Personal</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--neutral-200)' }}>
                <label style={{ fontWeight: 600, color: 'var(--neutral-700)' }}>Nombre:</label>
                <span>{user?.name || 'No disponible'}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--neutral-200)' }}>
                <label style={{ fontWeight: 600, color: 'var(--neutral-700)' }}>Email:</label>
                <span>{user?.email || 'No disponible'}</span>
              </div>
              
              {user?.age && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--neutral-200)' }}>
                  <label style={{ fontWeight: 600, color: 'var(--neutral-700)' }}>Edad:</label>
                  <span>{user.age} años</span>
                </div>
              )}
              
              {user?.diabetesType && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-sm) 0' }}>
                  <label style={{ fontWeight: 600, color: 'var(--neutral-700)' }}>Tipo de Diabetes:</label>
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

          <div className="modern-card">
            <h2 className="modern-card-title" style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Configuración</h2>
            <p style={{ color: 'var(--neutral-600)' }}>Próximamente: Configuración de notificaciones y preferencias</p>
          </div>
        </div>
      </div>
    </div>
  );
};