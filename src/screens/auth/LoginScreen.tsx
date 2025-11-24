import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    // En entornos móviles, también queremos redirigir si el usuario está autenticado
    // La condición anterior evitaba la redirección innecesaria en móvil, pero ahora
    // manejamos mejor el ciclo de vida de la app
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

  // Show loading indicator while checking auth state
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

  // If user is already authenticated, redirect to home (this should be handled by useEffect)
  // But we keep this as a safeguard
  if (isAuthenticated) {
    navigate('/home');
    return null;
  }

  return (
    <div className="container" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            color: '#333', 
            marginBottom: '10px',
            fontSize: '1.8rem',
            fontWeight: 700
          }}>
            Bienvenido
          </h1>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '1rem'
          }}>
            Inicia sesión para continuar
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333'
            }}>
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="tu@email.com"
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333'
            }}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              boxShadow: '0 2px 6px rgba(156, 39, 176, 0.2)',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '1px solid #eee'
        }}>
          <p style={{ 
            color: '#666', 
            margin: '0 0 15px 0',
            fontSize: '0.95rem'
          }}>
            ¿No tienes cuenta?
          </p>
          <Link 
            to="/register" 
            style={{
              color: '#9c27b0',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem'
            }}
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};