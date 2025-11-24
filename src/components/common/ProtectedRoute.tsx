import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { initAppLifecycleListeners, removeAppLifecycleListeners } from '../../utils/appLifecycle';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege las rutas que requieren autenticación
 * Redirige al login si el usuario no está autenticado
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, refreshUser } = useAuth();

  // Verificar el estado de autenticación cuando el componente se monta
  // y cuando la app se reanuda
  useEffect(() => {
    // Refrescar el estado del usuario al montar el componente
    if (isAuthenticated && !isLoading) {
      refreshUser();
    }
    
    // Inicializar listeners del ciclo de vida de la app
    initAppLifecycleListeners(refreshUser);
    
    // Cleanup
    return () => {
      removeAppLifecycleListeners();
    };
  }, [isAuthenticated, isLoading, refreshUser]);

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          maxWidth: '350px',
          width: '90%'
        }}>
          <div className="spinner" style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #9c27b0',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 15px'
          }}></div>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '10px',
            fontSize: '1.2rem',
            fontWeight: 600
          }}>
            Verificando autenticación
          </h3>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '0.95rem'
          }}>
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  // Si el usuario no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, mostrar los children
  return <>{children}</>;
};