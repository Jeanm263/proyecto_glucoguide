import React, { memo } from 'react';
import type { EducationContent } from '../../types/education';

interface EducationCardProps {
  content: EducationContent;
  onPress: () => void;
}

/**
 * Componente de tarjeta de contenido educativo optimizado con React.memo
 * Solo se re-renderiza si cambian las props (content o onPress)
 */
const EducationCardComponent: React.FC<EducationCardProps> = ({ content, onPress }) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPress();
    }
  };

  return (
    <div
      className="education-card"
      onClick={onPress}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Abrir artículo: ${content.title}`}
    >
      <div className="education-card-content">
        <div className="education-icon">{getTypeIcon(content.type)}</div>
        
        <div className="education-card-body">
          <h3 className="education-title">{content.title}</h3>
          
          <div className="education-meta">
            <span className="education-duration">⏱️ {content.duration}</span>
            <span 
              className="education-level"
              style={{
                backgroundColor: getLevelBadgeColor(content.level) + '20',
                color: getLevelBadgeColor(content.level)
              }}
            >
              {content.level}
            </span>
          </div>

          {content.tags && content.tags.length > 0 && (
            <div className="education-tags">
              {content.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="education-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .education-card {
          cursor: pointer;
          background: white;
          padding: 24px;
          margin: 0;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #f0f0f0;
          position: relative;
          overflow: hidden;
          outline: none;
        }

        .education-card:focus {
          outline: 3px solid #764ba2;
          outline-offset: 2px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08), 0 0 0 3px rgba(118, 75, 162, 0.3);
        }

        .education-card:focus-visible {
          outline: 3px solid #764ba2;
          outline-offset: 2px;
        }

        .education-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .education-card:hover::before {
          transform: scaleX(1);
        }

        .education-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .education-card-content {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .education-icon {
          font-size: 40px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .education-card:hover .education-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .education-card-body {
          flex: 1;
        }

        .education-title {
          margin: 0 0 16px 0;
          font-size: 20px;
          font-weight: 700;
          color: #333;
          line-height: 1.4;
        }

        .education-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .education-duration {
          font-size: 14px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .education-level {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .education-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        .education-tag {
          padding: 4px 12px;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8ebf0 100%);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: #667eea;
        }
      `}</style>
    </div>
  );
};

// Memoizar el componente para evitar re-renders innecesarios
// Solo se re-renderiza si content o onPress cambian
export const EducationCard = memo(EducationCardComponent, (prevProps, nextProps) => {
  // Comparación personalizada: solo re-renderizar si el content cambió
  // o si onPress cambió (comparación por referencia)
  return (
    prevProps.content.id === nextProps.content.id &&
    prevProps.content.title === nextProps.content.title &&
    prevProps.content.level === nextProps.content.level &&
    prevProps.content.type === nextProps.content.type &&
    prevProps.content.duration === nextProps.content.duration &&
    prevProps.onPress === nextProps.onPress
  );
});
