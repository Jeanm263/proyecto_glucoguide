import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData);
      navigate('/home');
    } catch (err) {
      setError('Credenciales inválidas. Por favor intenta de nuevo.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">🩺</div>
          <h1 className="auth-title">GlucosaApp</h1>
          <p className="auth-subtitle">Inicia sesión para continuar</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="form-input"
            />
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-full"
          >
            {loading ? (
              <>
                <span className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          <div className="auth-divider">
            <span>o</span>
          </div>

          <p className="auth-footer-text">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="auth-link">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>

      <style>{`
        .auth-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .auth-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: pulse 8s ease-in-out infinite;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 48px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .auth-card:hover {
          transform: translateY(-2px);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-logo {
          font-size: 64px;
          margin-bottom: 16px;
          animation: fadeIn 0.8s ease-out;
        }

        .auth-title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-subtitle {
          color: #666;
          font-size: 16px;
          margin: 0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 14px 18px;
          font-size: 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .error-message {
          padding: 12px 16px;
          background: linear-gradient(135deg, #fee 0%, #fcc 100%);
          border: 1px solid #fcc;
          border-radius: 12px;
          color: #c33;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideIn 0.3s ease-out;
        }

        .btn {
          padding: 14px 24px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-full {
          width: 100%;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-divider {
          position: relative;
          text-align: center;
          margin: 16px 0;
        }

        .auth-divider span {
          padding: 0 16px;
          background: rgba(255, 255, 255, 0.98);
          color: #999;
          font-size: 14px;
          position: relative;
          z-index: 1;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e0e0e0;
        }

        .auth-footer-text {
          text-align: center;
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .auth-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .auth-link:hover {
          color: #5568d3;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 32px 24px;
          }

          .auth-title {
            font-size: 28px;
          }

          .auth-logo {
            font-size: 48px;
          }
        }
      `}</style>
    </div>
  );
};
