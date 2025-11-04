import React from 'react';

/**
 * Componente de carga para mostrar mientras se cargan las rutas lazy
 */
export const LoadingScreen: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes routeLoadingSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={loadingScreenStyles.container}>
        <div style={loadingScreenStyles.content}>
          <div style={loadingScreenStyles.spinner} />
          <h2 style={loadingScreenStyles.title}>Cargando...</h2>
          <p style={loadingScreenStyles.subtitle}>
            Preparando tu experiencia en GlucosaApp
          </p>
        </div>
      </div>
    </>
  );
};

const loadingScreenStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  content: {
    textAlign: 'center' as const,
    color: 'white',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '5px solid rgba(255, 255, 255, 0.2)',
    borderTop: '5px solid white',
    borderRadius: '50%',
    animation: 'routeLoadingSpin 1s linear infinite',
    margin: '0 auto 24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: '0 0 12px 0',
    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  subtitle: {
    fontSize: '16px',
    margin: 0,
    opacity: 0.9,
    fontWeight: 400,
  },
};

