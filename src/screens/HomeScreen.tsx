import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { GlucoseChecker } from '../components/glucose/GlucoseChecker';
import { ToastNotification } from '../components/common/ToastNotification';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { BottomNavigation } from '../components/common/BottomNavigation';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toasts, toastSuccess, toastInfo, removeToast } = useToast();
  const [showGlucoseChecker, setShowGlucoseChecker] = useState(false);

  const handleLogout = () => {
    logout();
    toastSuccess('¡Sesión cerrada correctamente!');
    // Navigate to login after logout
    navigate('/login');
  };

  // Datos de ejemplo para las estadísticas
  const stats = [
    { title: "Nivel Promedio", value: "142 mg/dL", trend: "down", trendValue: "5%" },
    { title: "Registros Hoy", value: "3", trend: "up", trendValue: "20%" },
    { title: "Alimentos", value: "24" },
    { title: "Objetivo", value: "90%", trend: "up", trendValue: "15%" },
  ];

  // Datos para las tarjetas de características
  const features = [
    {
      title: "Buscar Alimentos",
      description: "Consulta información nutricional",
      icon: "🍎",
      actionText: "Explorar",
      onAction: () => {
        navigate('/foods');
        toastInfo('Abriendo buscador de alimentos...');
      },
    },
    {
      title: "Registrar Glucosa",
      description: "Registra tus niveles de glucosa",
      icon: "📊",
      actionText: "Registrar",
      onAction: () => {
        setShowGlucoseChecker(!showGlucoseChecker);
        toastInfo(showGlucoseChecker ? 'Ocultando verificador...' : 'Mostrando verificador de glucosa...');
      },
    },
    {
      title: "Educación",
      description: "Aprende sobre diabetes",
      icon: "📚",
      actionText: "Aprender",
      onAction: () => {
        navigate('/education');
        toastInfo('Abriendo sección educativa...');
      },
    },
    {
      title: "Perfil",
      description: "Gestiona tu perfil",
      icon: "👤",
      actionText: "Configurar",
      onAction: () => {
        navigate('/profile');
        toastInfo('Abriendo configuración de perfil...');
      },
    }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: 'var(--spacing-md)',
        paddingBottom: '70px'
      }}>
        {/* Toast Notifications */}
        <ToastNotification toasts={toasts} onRemove={removeToast} />
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Welcome Section */}
        <div className="modern-card slide-in">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '10px' 
          }}>
            <div>
              <h1 style={{ 
                fontFamily: 'var(--font-family-heading)', 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: 'var(--neutral-900)',
                margin: 0 
              }}>
                ¡Hola, {user?.name || 'Usuario'}!
              </h1>
              <p style={{ 
                color: 'var(--neutral-600)', 
                margin: '5px 0 0 0',
                fontSize: '0.9rem'
              }}>
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric',
                  month: 'long'
                })}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="modern-btn modern-btn-outline modern-btn-sm"
              style={{ padding: '6px 10px' }}
            >
              Salir
            </button>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="modern-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="modern-stat-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="modern-stat-title">{stat.title}</h3>
              <p className="modern-stat-value">{stat.value}</p>
              {stat.trend && (
                <span className={`modern-stat-trend modern-stat-trend-${stat.trend}`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.trendValue}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Verificador de glucosa */}
        <div className="modern-card slide-in">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '15px',
            marginBottom: showGlucoseChecker ? '15px' : '0'
          }}>
            <div>
              <h2 className="modern-card-title" style={{ fontSize: '1.25rem' }}>Nivel de Glucosa</h2>
              <p style={{ 
                color: 'var(--neutral-600)', 
                margin: '5px 0 0 0',
                fontSize: '0.9rem'
              }}>
                Verifica tu nivel para obtener recomendaciones
              </p>
            </div>
            <button 
              className={`modern-btn ${showGlucoseChecker ? 'modern-btn-outline' : 'modern-btn-primary'}`}
              onClick={() => setShowGlucoseChecker(!showGlucoseChecker)}
              style={{ padding: '8px 12px' }}
            >
              {showGlucoseChecker ? 'Ocultar' : 'Verificar'}
            </button>
          </div>
          
          {showGlucoseChecker && (
            <div style={{ marginTop: '15px' }} className="fade-in">
              <GlucoseChecker />
            </div>
          )}
        </div>

        {/* Características principales */}
        <div className="modern-card slide-in">
          <h2 className="modern-card-title" style={{ fontSize: '1.25rem', marginBottom: '15px' }}>
            Funciones Principales
          </h2>
          
          <div className="modern-features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="modern-feature-card fade-in"
                style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                onClick={feature.onAction}
              >
                <div className="modern-feature-icon">
                  {feature.icon}
                </div>
                <h3 className="modern-feature-title">{feature.title}</h3>
                <p className="modern-feature-description">{feature.description}</p>
                <button 
                  className="modern-btn modern-btn-outline modern-btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    feature.onAction();
                  }}
                  style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                >
                  {feature.actionText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de consejos */}
        <div className="modern-card fade-in">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: 'var(--radius-full)', 
              backgroundColor: 'var(--primary-100)', 
              color: 'var(--primary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              💡
            </div>
            <div style={{ flex: 1 }}>
              <h2 className="modern-card-title" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                Consejo del Día
              </h2>
              <p style={{ 
                color: 'var(--neutral-700)', 
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: 1.4
              }}>
                Registra tus niveles antes y después de las comidas para identificar patrones.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};