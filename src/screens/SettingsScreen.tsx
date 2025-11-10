import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { profileService, type NotificationSettings } from '../services/profileService';
import { toastSuccess, toastInfo, toastError } from '../utils/toast';
import { BottomNavigation } from '../components/common/BottomNavigation';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Estados para las preferencias de configuración
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [reminders, setReminders] = useState(true);
  const [loading, setLoading] = useState(true);

  // Cargar configuración actual al montar el componente
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // En una implementación real, cargaríamos la configuración del usuario
      // Por ahora, usamos valores por defecto
      setNotifications(true);
      setDarkMode(false);
      setLanguage('es');
      setReminders(true);
    } catch (error) {
      console.error('Error loading settings:', error);
      toastError('Error al cargar configuración');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      // Guardar configuración de notificaciones
      const notificationSettings: NotificationSettings = {
        medicationReminders: notifications,
        mealReminders: reminders,
        educationalTips: true // Valor por defecto
      };
      
      await profileService.updateNotificationSettings(notificationSettings);
      
      toastSuccess('Configuración guardada correctamente');
    } catch (error) {
      console.error('Error saving settings:', error);
      toastError('Error al guardar configuración');
    }
  };

  const handleExportData = () => {
    toastInfo('Función de exportación de datos en desarrollo');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      toastInfo('Función de eliminación de cuenta en desarrollo');
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        {/* Header */}
        <header className="settings-header">
          <div className="settings-header-content">
            <button
              onClick={() => navigate('/profile')}
              className="btn-back"
              aria-label="Volver al perfil"
            >
              <span aria-hidden="true">←</span> Volver
            </button>
            <h1 className="settings-title">
              <span aria-hidden="true">⚙️</span> Configuración
            </h1>
          </div>
        </header>

        <div className="settings-content fade-in">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando configuración...</p>
          </div>
        </div>

        <BottomNavigation />

        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 60vh;
            gap: 16px;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="settings-page">
      {/* Header */}
      <header className="settings-header">
        <div className="settings-header-content">
          <button
            onClick={() => navigate('/profile')}
            className="btn-back"
            aria-label="Volver al perfil"
          >
            <span aria-hidden="true">←</span> Volver
          </button>
          <h1 className="settings-title">
            <span aria-hidden="true">⚙️</span> Configuración
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="settings-content fade-in">
        {/* Sección de perfil */}
        <div className="settings-section">
          <h2 className="section-title">Perfil</h2>
          <div className="settings-card">
            <div className="profile-info">
              <div className="profile-avatar">
                <span className="avatar-icon">👤</span>
              </div>
              <div className="profile-details">
                <h3 className="profile-name">{user?.name || 'Usuario'}</h3>
                <p className="profile-email">{user?.email || 'email@ejemplo.com'}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile/edit')}
              className="btn-edit-profile"
            >
              Editar perfil
            </button>
          </div>
        </div>

        {/* Sección de preferencias */}
        <div className="settings-section">
          <h2 className="section-title">Preferencias</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3 className="setting-title">Notificaciones</h3>
                <p className="setting-description">Recibir notificaciones sobre recordatorios y actualizaciones</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3 className="setting-title">Modo oscuro</h3>
                <p className="setting-description">Activar tema oscuro para una mejor experiencia visual</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3 className="setting-title">Idioma</h3>
                <p className="setting-description">Selecciona el idioma de la aplicación</p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3 className="setting-title">Recordatorios</h3>
                <p className="setting-description">Recibir recordatorios para registrar alimentos</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={reminders}
                  onChange={(e) => setReminders(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Sección de datos */}
        <div className="settings-section">
          <h2 className="section-title">Datos y Privacidad</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3 className="setting-title">Exportar datos</h3>
                <p className="setting-description">Descargar una copia de tus datos personales</p>
              </div>
              <button
                onClick={handleExportData}
                className="btn-secondary"
              >
                Exportar
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3 className="setting-title">Eliminar cuenta</h3>
                <p className="setting-description">Eliminar permanentemente tu cuenta y todos tus datos</p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="save-section">
          <button
            onClick={handleSaveSettings}
            className="btn-save"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      <style>{`
        .settings-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 80px;
        }

        .settings-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .settings-header-content {
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

        .settings-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .settings-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .settings-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .settings-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .profile-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .avatar-icon {
          font-size: 30px;
          color: white;
        }

        .profile-details {
          flex: 1;
        }

        .profile-name {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 4px 0;
        }

        .profile-email {
          font-size: 16px;
          color: #999;
          margin: 0;
        }

        .btn-edit-profile {
          background: #f0f0f0;
          border: none;
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-edit-profile:hover {
          background: #e0e0e0;
        }

        .setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-info {
          flex: 1;
        }

        .setting-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 4px 0;
        }

        .setting-description {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #667eea;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .language-select {
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          font-size: 14px;
        }

        .btn-secondary {
          background: #f0f0f0;
          border: none;
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #e0e0e0;
        }

        .btn-danger {
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-danger:hover {
          background: #ff5252;
        }

        .save-section {
          text-align: center;
          padding: 20px 0;
        }

        .btn-save {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-save:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .settings-title {
            font-size: 24px;
          }

          .settings-content {
            padding: 20px 16px;
            gap: 24px;
          }

          .profile-info {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .settings-header-content {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};