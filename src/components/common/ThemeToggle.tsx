import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--primary-500)',
        color: 'white',
        border: 'none',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        fontSize: '1.2rem',
        transition: 'all 0.3s ease'
      }}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};