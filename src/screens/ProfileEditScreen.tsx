import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toastSuccess, toastError, toastInfo } from '../utils/toast';

interface ProfileFormData {
  name: string;
  email: string;
  age: string;
  diabetesType: string;
}

export const ProfileEditScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age?.toString() || '',
    diabetesType: user?.diabetesType || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simular actualización de perfil
      // En una implementación real, aquí se llamaría a un servicio de actualización de perfil
      toastInfo('Función de actualización de perfil en desarrollo');
      
      // Refrescar la información del usuario
      await refreshUser();
      toastSuccess('Perfil actualizado correctamente');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toastError('Error al actualizar el perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-edit-page">
      {/* Header */}
      <header className="profile-edit-header">
        <div className="profile-edit-header-content">
          <button
            onClick={() => navigate('/profile')}
            className="btn-back"
            aria-label="Volver al perfil"
          >
            <span aria-hidden="true">←</span> Volver
          </button>
          <h1 className="profile-edit-title">
            <span aria-hidden="true">✏️</span> Editar Perfil
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="profile-edit-content fade-in">
        <div className="edit-card">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Edad
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                max="120"
              />
            </div>

            <div className="form-group">
              <label htmlFor="diabetesType" className="form-label">
                Tipo de Diabetes
              </label>
              <input
                id="diabetesType"
                name="diabetesType"
                type="text"
                value={formData.diabetesType}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ej: Tipo 1, Tipo 2, Gestacional"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="btn-cancel"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-save"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .profile-edit-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 20px;
        }

        .profile-edit-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .profile-edit-header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn-back {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          padding: 10px 20px;
          color: white;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-back:hover {
          background: rgba(255,255,255,0.3);
          transform: translateX(-2px);
        }

        .profile-edit-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .profile-edit-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .edit-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          max-width: 600px;
          margin: 0 auto;
        }

        .profile-form {
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
          font-size: 16px;
        }

        .form-input {
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

        .form-actions {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }

        .btn-cancel {
          flex: 1;
          padding: 14px 24px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-cancel:hover:not(:disabled) {
          background: #f5f5f5;
          transform: translateY(-2px);
        }

        .btn-cancel:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-save {
          flex: 1;
          padding: 14px 24px;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-save:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-save:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .profile-edit-title {
            font-size: 24px;
          }

          .edit-card {
            padding: 24px 20px;
          }

          .form-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .profile-edit-content {
            padding: 20px 16px;
          }

          .edit-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};