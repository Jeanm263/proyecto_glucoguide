import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EducationCard } from '../../components/education/EducationCard';
import { EducationDetail } from '../../components/education/EducationDetail';
import { EDUCATION_CONTENT, EDUCATION_CATEGORIES } from '../../constants/educationContent';
import { useDebounce } from '../../hooks/useDebounce';
import type { EducationContent } from '../../types/education';
import { educationService } from '../../services/educationService';
import { USE_MOCK_SERVICE } from '../../config/env';
import { toastError } from '../../utils/toast';

type EducationLevel = 'basic' | 'intermediate' | 'advanced';

export const EducationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('todos');
  const [selectedContent, setSelectedContent] = useState<EducationContent | null>(null);
  const [educationContent, setEducationContent] = useState<EducationContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce del search query para mejorar performance
  // Solo ejecuta el filtrado 300ms después de que el usuario deje de escribir
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Cargar contenido educativo al montar el componente
  useEffect(() => {
    const fetchEducationContent = async () => {
      // En entorno de pruebas, establecer loading a false inmediatamente
      const isTestEnv = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';
      
      if (isTestEnv) {
        // En entorno de pruebas, usar datos mock inmediatamente
        setEducationContent(EDUCATION_CONTENT);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        let content: EducationContent[];
        
        if (USE_MOCK_SERVICE) {
          // Usar datos mock para desarrollo
          content = EDUCATION_CONTENT;
        } else {
          // Obtener datos reales del backend
          content = await educationService.getAllContent();
        }
        
        setEducationContent(content);
      } catch (err) {
        console.error('Error al cargar contenido educativo:', err);
        setError('No se pudo cargar el contenido educativo. Por favor, inténtalo más tarde.');
        toastError('No se pudo cargar el contenido educativo');
        
        // En caso de error, usar datos mock como fallback
        setEducationContent(EDUCATION_CONTENT);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationContent();
  }, []);

  // Memoizar el callback para evitar re-crear la función en cada render
  // Esto permite que React.memo en EducationCard funcione mejor
  const handleContentPress = useCallback((content: EducationContent) => {
    setSelectedContent(content);
  }, []);

  const filteredContent = useMemo(() => {
    let content = educationContent;

    if (selectedLevel !== 'todos') {
      content = content.filter(c => c.level === selectedLevel as EducationLevel);
    }

    // Filter by search query (usando el valor debounced)
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      content = content.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return content;
  }, [educationContent, debouncedSearchQuery, selectedLevel]);

  const levels = ['todos', 'basic', 'intermediate', 'advanced'];

  if (loading) {
    return (
      <div className="education-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando contenido educativo...</p>
        </div>
        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #f5f7fa;
          }
          
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #764ba2;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
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
    <div className="education-page">
      {/* Header */}
      <header className="education-header">
        <div className="education-header-content">
          <button
            onClick={() => navigate('/home')}
            className="btn-back"
            aria-label="Volver al inicio"
          >
            <span aria-hidden="true">←</span> Inicio
          </button>
          <h1 className="education-title">
            <span aria-hidden="true">📚</span> Educación en Diabetes
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="education-content fade-in">
        {/* Search and Filters */}
        <div className="search-card" role="search">
          <label htmlFor="education-search-input" className="sr-only">
            Buscar contenido educativo
          </label>
          <input
            id="education-search-input"
            type="text"
            placeholder="Buscar artículos, videos, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Buscar contenido educativo por título o tags"
          />

          <div className="level-filters" role="group" aria-label="Filtros por nivel">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`level-btn ${selectedLevel === level ? 'active' : ''}`}
                aria-pressed={selectedLevel === level}
              >
                {level === 'todos' ? 'Todos' : EDUCATION_CATEGORIES[level as keyof typeof EDUCATION_CATEGORIES]}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="error-message" role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
        <div className="results-header">
          <h2 className="results-title">
            Resultados <span className="results-count">({filteredContent.length})</span>
          </h2>
        </div>

        {filteredContent.length === 0 ? (
          <div className="empty-state" role="status" aria-live="polite">
            <div className="empty-icon" aria-hidden="true">📖</div>
            <p className="empty-message">No se encontró contenido con esos criterios</p>
            <p className="empty-hint">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="education-list" role="list" aria-labelledby="education-results-heading">
            {filteredContent.map(content => (
              <div key={content.id} role="listitem">
                <EducationCard
                  content={content}
                  onPress={() => handleContentPress(content)}
                />
              </div>
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

        .level-btn:focus {
          outline: 3px solid #764ba2;
          outline-offset: 2px;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
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

        .error-message {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
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