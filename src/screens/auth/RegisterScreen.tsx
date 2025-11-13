import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema, type RegisterFormData } from '../../schemas/authSchemas';
import { toastError } from '../../utils/toast';

export const RegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: undefined,
    diabetesType: undefined,
    glucoseLevel: undefined
  });
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);
  const { register: registerUser, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'glucoseLevel' ? (value ? Number(value) : undefined) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validar datos con Zod
      registerSchema.parse(formData);
      
      // Preparar datos para registro (excluir confirmPassword)
      const { confirmPassword: _, ...registerData } = formData;
      
      await registerUser(registerData);
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message);
      } else {
        toastError('Error al registrar usuario');
      }
    }
  };

  return (
    <div className="register-screen">
      <div className="register-container">
        <div className="register-header">
          <h1>GlucosaGuide</h1>
          <p>Crea tu cuenta para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="button" 
            className="advanced-fields-toggle"
            onClick={() => setShowAdvancedFields(!showAdvancedFields)}
          >
            {showAdvancedFields ? 'Ocultar campos avanzados' : 'Mostrar campos avanzados'}
          </button>

          {showAdvancedFields && (
            <div className="advanced-fields">
              <div className="form-group">
                <label htmlFor="age">Edad (opcional)</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleChange}
                  min="18"
                  max="120"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="diabetesType">Tipo de diabetes (opcional)</label>
                <select
                  id="diabetesType"
                  name="diabetesType"
                  value={formData.diabetesType || ''}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="type1">Tipo 1</option>
                  <option value="type2">Tipo 2</option>
                  <option value="gestational">Gestacional</option>
                  <option value="prediabetes">Prediabetes</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="glucoseLevel">Nivel de glucosa inicial (mg/dL) (opcional)</label>
                <input
                  type="number"
                  id="glucoseLevel"
                  name="glucoseLevel"
                  value={formData.glucoseLevel || ''}
                  onChange={handleChange}
                  min="1"
                  max="500"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="register-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="register-footer">
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
      </div>

      <style>{`
        .register-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .register-container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .register-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .register-header h1 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 32px;
        }

        .register-header p {
          margin: 0;
          color: #666;
          font-size: 16px;
        }

        .register-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #764ba2;
        }

        .form-group input:disabled,
        .form-group select:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .advanced-fields-toggle {
          width: 100%;
          padding: 12px;
          background: #f0f0f0;
          color: #666;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 20px;
          transition: all 0.2s ease;
        }

        .advanced-fields-toggle:hover {
          background: #e8e8e8;
          border-color: #d1d5d9;
        }

        .advanced-fields {
          margin-bottom: 20px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .register-btn {
          width: 100%;
          padding: 14px;
          background: #764ba2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .register-btn:hover:not(:disabled) {
          background: #6a4190;
        }

        .register-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .register-footer {
          text-align: center;
          color: #666;
        }

        .register-footer a {
          color: #764ba2;
          text-decoration: none;
          font-weight: 500;
        }

        .register-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .register-container {
            padding: 30px 20px;
          }

          .register-header h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};