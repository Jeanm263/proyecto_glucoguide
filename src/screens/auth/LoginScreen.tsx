import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/home');
    } catch (error) {
      console.error('Error en login:', error);
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div className="modern-card" style={{ 
        maxWidth: '400px', 
        width: '100%',
        margin: '20px 0'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: 'var(--radius-full)', 
            backgroundColor: 'var(--primary-100)', 
            color: 'var(--primary-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: '0 auto 15px'
          }}>
            G
          </div>
          <h1 style={{ 
            fontFamily: 'var(--font-family-heading)', 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: 'var(--neutral-900)',
            margin: '0 0 5px 0'
          }}>
            GlucosaGuide
          </h1>
          <p style={{ 
            color: 'var(--neutral-600)', 
            margin: 0 
          }}>
            Gestiona tu diabetes de forma inteligente
          </p>
        </div>
        
        <h2 className="modern-card-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
          Iniciar Sesión
        </h2>
        
        {error && (
          <div className="modern-alert modern-alert-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="modern-form-group">
            <label className="modern-form-label">Correo Electrónico</label>
            <input
              type="email"
              className="modern-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="modern-form-group">
            <label className="modern-form-label">Contraseña</label>
            <input
              type="password"
              className="modern-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'var(--neutral-600)',
              fontSize: '0.9rem'
            }}>
              <input 
                type="checkbox" 
                style={{ 
                  marginRight: '8px',
                  borderRadius: 'var(--radius-sm)'
                }} 
              />
              Recordarme
            </label>
            <Link 
              to="/forgot-password" 
              style={{ 
                color: 'var(--primary-600)', 
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="modern-btn modern-btn-primary modern-btn-lg modern-btn-block"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <div style={{ 
          marginTop: '25px', 
          textAlign: 'center', 
          paddingTop: '20px', 
          borderTop: '1px solid var(--neutral-200)'
        }}>
          <p style={{ 
            color: 'var(--neutral-600)',
            margin: 0
          }}>
            ¿No tienes cuenta?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: 'var(--primary-600)', 
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};