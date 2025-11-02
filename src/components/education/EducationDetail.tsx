import React from 'react';
import type { EducationContent } from '../../types/education';

interface EducationDetailProps {
  content: EducationContent;
  onClose: () => void;
}

export const EducationDetail: React.FC<EducationDetailProps> = ({ content, onClose }) => {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="education-modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">×</button>

        <div className="education-modal-header">
          <span className="education-detail-icon">{getTypeIcon(content.type)}</span>
          <div className="education-detail-header-content">
            <h1 className="education-detail-title">{content.title}</h1>
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

        <div className="education-modal-content-text">
          {parseContent(content.content)}
        </div>

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

        .education-modal-content-text {
          font-size: 17px;
          line-height: 1.9;
          color: #444;
          white-space: pre-wrap;
          margin-bottom: 32px;
        }

        .education-modal-content-text strong {
          color: #667eea;
          font-weight: 700;
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

          .education-modal-content-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};
