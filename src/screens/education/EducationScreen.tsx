import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EducationCard } from '../../components/education/EducationCard';
import { EducationDetail } from '../../components/education/EducationDetail';
import { EDUCATION_CONTENT, EDUCATION_CATEGORIES } from '../../constants/educationContent';
import type { EducationContent } from '../../types/education';

type EducationLevel = 'basic' | 'intermediate' | 'advanced';

export const EducationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('todos');
  const [selectedContent, setSelectedContent] = useState<EducationContent | null>(null);

  const filteredContent = useMemo(() => {
    let content = EDUCATION_CONTENT;

    if (selectedLevel !== 'todos') {
      content = content.filter(c => c.level === selectedLevel as EducationLevel);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      content = content.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return content;
  }, [searchQuery, selectedLevel]);

  const levels = ['todos', 'basic', 'intermediate', 'advanced'];

  return (
    <div className="education-page">
      {/* Header */}
      <div className="education-header">
        <div className="education-header-content">
          <button onClick={() => navigate('/home')} className="btn-back">
            ← Inicio
          </button>
          <h1 className="education-title">📚 Educación en Diabetes</h1>
        </div>
      </div>

      {/* Content */}
      <div className="education-content fade-in">
        {/* Search and Filters */}
        <div className="search-card">
          <input
            type="text"
            placeholder="Buscar contenido educativo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <div className="level-filters">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`level-btn ${selectedLevel === level ? 'active' : ''}`}
              >
                {level === 'todos' ? 'Todos los niveles' : EDUCATION_CATEGORIES[level as keyof typeof EDUCATION_CATEGORIES]}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2 className="results-title">
            Contenido disponible {filteredContent.length > 0 && <span className="results-count">({filteredContent.length})</span>}
          </h2>
        </div>

        {/* Results */}
        {filteredContent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <p className="empty-message">No se encontró contenido con esos criterios</p>
            <p className="empty-hint">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="education-list">
            {filteredContent.map(content => (
              <EducationCard
                key={content.id}
                content={content}
                onPress={() => setSelectedContent(content)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Education Detail Modal */}
      {selectedContent && (
        <EducationDetail
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}

      <style>{`
        .education-page {
          min-height: 100vh;
          background: #f5f7fa;
        }

        .education-header {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .education-header-content {
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

        .education-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .education-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .search-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .search-input {
          width: 100%;
          padding: 16px 20px;
          font-size: 16px;
          border: 2px solid #e0e0e0;
          border-radius: 16px;
          outline: none;
          transition: all 0.3s ease;
          background: #fafafa;
          margin-bottom: 20px;
          box-sizing: border-box;
        }

        .search-input:focus {
          border-color: #764ba2;
          background: white;
          box-shadow: 0 0 0 4px rgba(118, 75, 162, 0.1);
        }

        .level-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .level-btn {
          padding: 10px 20px;
          border-radius: 20px;
          border: 2px solid #e0e0e0;
          background: white;
          color: #666;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          text-transform: capitalize;
          transition: all 0.3s ease;
        }

        .level-btn:hover {
          border-color: #764ba2;
          color: #764ba2;
        }

        .level-btn.active {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(118, 75, 162, 0.3);
        }

        .results-header {
          margin-bottom: 24px;
        }

        .results-title {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .results-count {
          color: #764ba2;
          font-weight: 600;
        }

        .education-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .empty-state {
          background: white;
          border-radius: 20px;
          padding: 80px 40px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .empty-icon {
          font-size: 80px;
          margin-bottom: 24px;
          opacity: 0.5;
        }

        .empty-message {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 12px 0;
        }

        .empty-hint {
          font-size: 16px;
          color: #999;
          margin: 0;
        }

        @media (max-width: 768px) {
          .search-card {
            padding: 24px 20px;
          }

          .education-title {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};
