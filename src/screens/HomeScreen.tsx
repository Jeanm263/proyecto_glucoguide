import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-content fade-in">
        {/* Header */}
        <div className="home-header">
          <button onClick={handleLogout} className="btn-logout">
            <span>👤</span> Cerrar Sesión
          </button>
        </div>

        {/* Hero Section */}
        <div className="hero-section slide-in">
          <div className="hero-icon">🩺</div>
          <h1 className="hero-title">GlucosaApp</h1>
          <p className="hero-subtitle">
            Tu guía inteligente para gestionar la diabetes tipo 2 con información nutricional y educación
          </p>
        </div>

        {/* Main Cards */}
        <div className="cards-grid">
          <div className="feature-card card-hover" onClick={() => navigate('/foods')}>
            <div className="card-icon">🍎</div>
            <h2 className="card-title">Buscar Alimentos</h2>
            <p className="card-description">
              Consulta el valor nutricional, índice glucémico y recomendaciones para más de 100 alimentos
            </p>
            <div className="card-arrow">→</div>
          </div>

          <div className="feature-card card-hover" onClick={() => navigate('/education')}>
            <div className="card-icon">📚</div>
            <h2 className="card-title">Educación</h2>
            <p className="card-description">
              Aprende sobre diabetes, nutrición y hábitos saludables con contenido interactivo
            </p>
            <div className="card-arrow">→</div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="how-it-works">
          <h2 className="section-title">Cómo usar GlucosaApp</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">🔍</div>
              <h3 className="step-title">Busca</h3>
              <p className="step-description">
                Busca cualquier alimento en nuestra base de datos
              </p>
            </div>
            <div className="step-card">
              <div className="step-icon">📊</div>
              <h3 className="step-title">Analiza</h3>
              <p className="step-description">
                Revisa su índice glucémico y valor nutricional
              </p>
            </div>
            <div className="step-card">
              <div className="step-icon">🚦</div>
              <h3 className="step-title">Decide</h3>
              <p className="step-description">
                Usa el semáforo nutricional para tomar decisiones
              </p>
            </div>
            <div className="step-card">
              <div className="step-icon">📖</div>
              <h3 className="step-title">Aprende</h3>
              <p className="step-description">
                Educa-te sobre diabetes y nutrición saludable
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .home-container::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          animation: pulse 12s ease-in-out infinite;
        }

        .home-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .home-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 40px;
        }

        .btn-logout {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .btn-logout:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .hero-section {
          text-align: center;
          margin-bottom: 60px;
        }

        .hero-icon {
          font-size: 80px;
          margin-bottom: 20px;
          animation: fadeIn 1s ease-out;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 800;
          margin: 0 0 16px 0;
          color: white;
          text-shadow: 0 4px 20px rgba(0,0,0,0.2);
          animation: fadeIn 1.2s ease-out;
        }

        .hero-subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.95);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          animation: fadeIn 1.4s ease-out;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .feature-card:hover::before {
          left: 100%;
        }

        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .card-icon {
          font-size: 64px;
          margin-bottom: 24px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .card-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .card-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-description {
          font-size: 16px;
          line-height: 1.7;
          color: #666;
          margin: 0;
        }

        .card-arrow {
          position: absolute;
          bottom: 24px;
          right: 24px;
          font-size: 24px;
          color: #667eea;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .card-arrow {
          transform: translateX(8px);
        }

        .how-it-works {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 50px 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 40px 0;
          text-align: center;
          color: white;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
        }

        .step-card {
          text-align: center;
        }

        .step-icon {
          font-size: 48px;
          margin-bottom: 16px;
          animation: fadeIn 0.8s ease-out;
        }

        .step-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: white;
        }

        .step-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 40px;
          }

          .hero-icon {
            font-size: 60px;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .how-it-works {
            padding: 40px 24px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .feature-card {
            padding: 32px 24px;
          }

          .steps-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </div>
  );
};
