import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      await register({ name, email, password });
      // After successful registration, show success message and redirect to login
      setRegistrationSuccess(true);
      // Clear the form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Error en registro:', error);
      setError('Error al crear la cuenta. Por favor, inténtalo de nuevo.');
    }
  };

  // If user is already authenticated, don't render the register form
  if (isAuthenticated) {
    return null;
  }

  // If registration was successful, show success message
  if (registrationSuccess) {
    return (
      <div className="container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="modern-card" style={{ 
          maxWidth: '400px', 
          width: '100%',
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            backgroundColor: '#4caf50', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: '0 auto 20px'
          }}>
            ✓
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-family-heading)', 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: 'var(--neutral-900)',
            margin: '0 0 15px 0'
          }}>
            ¡Registro Exitoso!
          </h2>
          <p style={{ 
            color: 'var(--neutral-600)', 
            margin: 0,
            fontSize: '1rem',
            lineHeight: 1.5
          }}>
            Tu cuenta ha sido creada correctamente. Ahora necesitas iniciar sesión con tus credenciales.
          </p>
          <p style={{ 
            color: 'var(--primary-600)', 
            margin: '20px 0 0 0',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>
            Redirigiendo a la página de inicio de sesión...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f8f9fa'
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
          Crear Cuenta
        </h2>
        
        {error && (
          <div className="modern-alert modern-alert-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="modern-form-group">
            <label className="modern-form-label">Nombre Completo</label>
            <input
              type="text"
              className="modern-form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
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
          
          <div className="modern-form-group">
            <label className="modern-form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="modern-form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="modern-btn modern-btn-primary modern-btn-lg modern-btn-block"
          >
            Crear Cuenta
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
            ¿Ya tienes cuenta?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: 'var(--primary-600)', 
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};