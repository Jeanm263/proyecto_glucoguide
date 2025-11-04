import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { registerSchema, type RegisterFormData } from '../../schemas/authSchemas';

export const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur', // Validar al perder el foco
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      // Después de registrar, redirigir al login para que el usuario inicie sesión
      navigate('/login');
    } catch (err) {
      // El error ya se maneja en el contexto con toast
      console.error('Register error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="auth-logo">🩺</div>
          <h1 className="auth-title">GlucosaApp</h1>
          <p className="auth-subtitle">Crea tu cuenta gratuita</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              placeholder="Juan Pérez"
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
              {...register('name')}
            />
            {errors.name && (
              <span className="form-error">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`form-input ${errors.password ? 'form-input-error' : ''}`}
              {...register('password')}
            />
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
            <p className="form-hint">Mínimo 6 caracteres</p>
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="btn btn-primary btn-full"
          >
            {isSubmitting || isLoading ? (
              <>
                <span className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                Creando cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>

          <div className="auth-divider">
            <span>o</span>
          </div>

          <p className="auth-footer-text">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="auth-link">
              Inicia sesión aquí
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
          width: 100%;
          max-width: 450px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
          position: relative;
          z-index: 2;
          animation: slideUp 0.6s ease-out;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .auth-logo {
          font-size: 48px;
          margin-bottom: 16px;
          animation: bounce 2s ease-in-out infinite;
        }

        .auth-title {
          font-size: 32px;
          font-weight: 800;
          color: #333;
          margin: 0 0 8px 0;
        }

        .auth-subtitle {
          font-size: 16px;
          color: #666;
          margin: 0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .form-input {
          padding: 16px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 16px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-input:focus {
          outline: none;
          border-color: #764ba2;
          background: white;
          box-shadow: 0 0 0 4px rgba(118, 75, 162, 0.1);
        }

        .form-input-error {
          border-color: #dc3545 !important;
          background: #fff5f5 !important;
        }

        .form-error {
          color: #dc3545;
          font-size: 14px;
          font-weight: 500;
          margin-top: 4px;
        }

        .form-hint {
          color: #999;
          font-size: 12px;
          margin-top: 4px;
        }

        .btn {
          padding: 16px 24px;
          border: none;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(118, 75, 162, 0.4);
        }

        .btn-full {
          width: 100%;
        }

        .loading-spinner {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          margin: 16px 0;
        }

        .auth-divider span {
          background: #f0f0f0;
          padding: 0 16px;
          color: #999;
          font-size: 14px;
          position: relative;
          z-index: 1;
        }

        .auth-divider::before {
          content: '';
          flex: 1;
          height: 1px;
          background: #e0e0e0;
        }

        .auth-divider::after {
          content: '';
          flex: 1;
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
          color: #764ba2;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .auth-card {
            padding: 32px 24px;
            margin: 20px;
          }
          
          .auth-title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};