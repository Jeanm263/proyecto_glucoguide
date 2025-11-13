import React, { useEffect } from 'react';
import type { EducationContent } from '../../types/education';

interface EducationDetailProps {
  content: EducationContent;
  onClose: () => void;
}

export const EducationDetail: React.FC<EducationDetailProps> = ({ content, onClose }) => {
  useEffect(() => {
    // Manejo de escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Focus en el modal al abrir
    const modalContent = document.querySelector('.education-modal-content') as HTMLElement;
    if (modalContent) {
      modalContent.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄';
      case 'interactive': return '🎯';
      case 'video': return '🎬';
      default: return '📚';
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'basic': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const parseContent = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const renderVideoContent = () => {
    return (
      <div className="video-content">
        <div className="video-placeholder">
          <div className="video-icon">🎬</div>
          <h3 className="video-title">Contenido de Video</h3>
          <p className="video-description">
            Este contenido incluye videos instructivos sobre ejercicios para personas con diabetes.
            En una implementación completa, aquí se mostrarían videos reales con demostraciones
            de ejercicios paso a paso.
          </p>
          <div className="video-features">
            <div className="feature">
              <span className="feature-icon">✅</span>
              <span className="feature-text">Demostraciones visuales</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span className="feature-text">Instrucciones detalladas</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🛡️</span>
              <span className="feature-text">Ejercicios seguros para diabéticos</span>
            </div>
          </div>
          <div className="exercise-preview">
            <h4 className="preview-title">Ejercicios incluidos:</h4>
            <ul className="exercise-list">
              <li>Calentamiento y estiramientos</li>
              <li>Ejercicios cardiovasculares</li>
              <li>Entrenamiento de fuerza</li>
              <li>Yoga y flexibilidad</li>
              <li>Enfriamiento y recuperación</li>
            </ul>
          </div>
        </div>
        <div className="content-text">
          {parseContent(content.content)}
        </div>
      </div>
    );
  };

  const renderInteractiveContent = () => {
    return (
      <div className="interactive-content">
        <div className="interactive-header">
          <div className="interactive-icon">🎯</div>
          <h3 className="interactive-title">Contenido Interactivo</h3>
          <p className="interactive-description">
            Este contenido incluye elementos interactivos para una mejor comprensión.
          </p>
        </div>
        <div className="content-text">
          {parseContent(content.content)}
        </div>
        <div className="interactive-elements">
          <div className="tip-box">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <h4 className="tip-title">Tip Profesional</h4>
              <p className="tip-text">
                Recuerda siempre consultar con tu médico antes de comenzar cualquier rutina de ejercicios.
              </p>
            </div>
          </div>
          <div className="checklist">
            <h4 className="checklist-title">Lista de Verificación</h4>
            <ul className="checklist-items">
              <li className="checklist-item">
                <span className="check-icon">☐</span>
                <span className="check-text">Monitorear glucosa antes y después</span>
              </li>
              <li className="checklist-item">
                <span className="check-icon">☐</span>
                <span className="check-text">Mantenerse hidratado</span>
              </li>
              <li className="checklist-item">
                <span className="check-icon">☐</span>
                <span className="check-text">Tener snack a mano</span>
              </li>
              <li className="checklist-item">
                <span className="check-icon">☐</span>
                <span className="check-text">Usar calzado adecuado</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderArticleContent = () => {
    return (
      <div className="content-text">
        {parseContent(content.content)}
      </div>
    );
  };

  const renderContent = () => {
    switch (content.type) {
      case 'video':
        return renderVideoContent();
      case 'interactive':
        return renderInteractiveContent();
      default:
        return renderArticleContent();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="education-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div
        className="education-modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Cerrar modal"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="education-modal-header">
          <span className="education-detail-icon" aria-hidden="true">
            {getTypeIcon(content.type)}
          </span>
          <div className="education-detail-header-content">
            <h1 className="education-detail-title" id="education-modal-title">
              {content.title}
            </h1>
            <div className="education-detail-meta">
              <span className="education-detail-duration">⏱️ {content.duration}</span>
              <span 
                className="education-detail-level"
                style={{
                  backgroundColor: getLevelBadgeColor(content.level) + '20',
                  color: getLevelBadgeColor(content.level)
                }}
              >
                {content.level}
              </span>
            </div>
          </div>
        </div>

        {renderContent()}

        {content.tags && content.tags.length > 0 && (
          <div className="education-detail-tags">
            <h3 className="tags-section-title">TAGS</h3>
            <div className="tags-container">
              {content.tags.map((tag, idx) => (
                <span key={idx} className="tag-blue">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        .education-modal-content {
          background: white;
          border-radius: 24px;
          padding: 32px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideIn 0.3s ease-out;
          outline: none;
        }

        .education-modal-content:focus {
          outline: 3px solid #764ba2;
          outline-offset: 2px;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f0f0f0;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: #e0e0e0;
          transform: rotate(90deg);
        }

        .education-modal-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .education-detail-icon {
          font-size: 56px;
          flex-shrink: 0;
        }

        .education-detail-header-content {
          flex: 1;
        }

        .education-detail-title {
          margin: 0 0 16px 0;
          font-size: 32px;
          font-weight: 800;
          color: #333;
          line-height: 1.3;
        }

        .education-detail-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .education-detail-duration {
          font-size: 16px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .education-detail-level {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .content-text {
          font-size: 17px;
          line-height: 1.9;
          color: #444;
          white-space: pre-wrap;
          margin-bottom: 32px;
        }

        .content-text strong {
          color: #667eea;
          font-weight: 700;
        }

        /* Video Content Styles */
        .video-content {
          margin-bottom: 32px;
        }

        .video-placeholder {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
          text-align: center;
          border: 2px dashed #667eea;
        }

        .video-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .video-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0 0 12px 0;
        }

        .video-description {
          font-size: 16px;
          color: #666;
          margin: 0 0 24px 0;
          line-height: 1.6;
        }

        .video-features {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 12px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .feature-icon {
          font-size: 20px;
        }

        .feature-text {
          font-weight: 600;
          color: #333;
        }

        .exercise-preview {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .preview-title {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin: 0 0 16px 0;
        }

        .exercise-list {
          text-align: left;
          padding-left: 20px;
          margin: 0;
        }

        .exercise-list li {
          margin-bottom: 8px;
          color: #555;
        }

        /* Interactive Content Styles */
        .interactive-content {
          margin-bottom: 32px;
        }

        .interactive-header {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: center;
        }

        .interactive-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .interactive-title {
          font-size: 24px;
          font-weight: 700;
          color: #1976d2;
          margin: 0 0 8px 0;
        }

        .interactive-description {
          font-size: 16px;
          color: #1976d2;
          margin: 0;
          font-weight: 500;
        }

        .interactive-elements {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .tip-box {
          display: flex;
          gap: 16px;
          background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
          border-radius: 16px;
          padding: 20px;
          align-items: flex-start;
        }

        .tip-icon {
          font-size: 28px;
          flex-shrink: 0;
        }

        .tip-content {
          flex: 1;
        }

        .tip-title {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin: 0 0 8px 0;
        }

        .tip-text {
          font-size: 16px;
          color: #555;
          margin: 0;
          line-height: 1.5;
        }

        .checklist {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .checklist-title {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          margin: 0 0 16px 0;
        }

        .checklist-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .checklist-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .checklist-item:last-child {
          border-bottom: none;
        }

        .check-icon {
          font-size: 20px;
          color: #667eea;
        }

        .check-text {
          font-size: 16px;
          color: #444;
          flex: 1;
        }

        .education-detail-tags {
          padding-top: 24px;
          border-top: 2px solid #f0f0f0;
        }

        .tags-section-title {
          margin: 0 0 12px 0;
          font-size: 14px;
          font-weight: 700;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-blue {
          padding: 8px 16px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #1976d2;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .education-modal-content {
            padding: 24px 20px;
          }

          .education-detail-title {
            font-size: 24px;
          }

          .content-text {
            font-size: 16px;
          }

          .video-features {
            flex-direction: column;
            align-items: center;
          }

          .feature {
            width: 100%;
            justify-content: center;
          }

          .tip-box {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};