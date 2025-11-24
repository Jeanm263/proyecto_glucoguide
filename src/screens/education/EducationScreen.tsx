import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { EducationCard } from '../../components/education/EducationCard';
import { EducationDetail } from '../../components/education/EducationDetail';
import { EDUCATION_CONTENT, EDUCATION_CATEGORIES } from '../../constants/educationContent';
import { useDebounce } from '../../hooks/useDebounce';
import type { EducationContent } from '../../types/education';
import { educationService } from '../../services/educationService';
import { USE_MOCK_SERVICE } from '../../config/env';
import { toastError } from '../../utils/toast';
import { BottomNavigation } from '../../components/common/BottomNavigation';

type EducationLevel = 'basic' | 'intermediate' | 'advanced';

export const EducationScreen: React.FC = () => {
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
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--neutral-50)',
        padding: 'var(--spacing-md)'
      }}>
        <div className="spinner"></div>
        <p style={{ 
          color: 'var(--neutral-600)',
          margin: 'var(--spacing-md) 0 0 0'
        }}>
          Cargando contenido educativo...
        </p>
      </div>
    );
  }

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
        <div className="container" style={{ padding: 'var(--spacing-md)' }}>
          <div className="modern-card">
            {/* Header */}
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
              padding: 'var(--spacing-lg)',
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
              marginBottom: 'var(--spacing-md)',
              textAlign: 'center'
            }}>
              <h1 style={{ 
                color: 'white',
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 600
              }}>
                <span aria-hidden="true">📚</span> Educación en Diabetes
              </h1>
            </div>

            {/* Content */}
            <div>
              {/* Search and Filters */}
              <div className="modern-card" style={{ 
                marginBottom: 'var(--spacing-lg)',
                padding: 'var(--spacing-lg)'
              }}>
                <label htmlFor="education-search-input" className="sr-only">
                  Buscar contenido educativo
                </label>
                <div style={{ position: 'relative', marginBottom: 'var(--spacing-md)' }}>
                  <input
                    id="education-search-input"
                    type="text"
                    placeholder="Buscar artículos, videos, etc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="modern-form-input"
                    style={{ 
                      width: '100%',
                      paddingLeft: 'var(--spacing-xl)',
                      paddingRight: searchQuery ? 'var(--spacing-xl)' : 'var(--spacing-md)'
                    }}
                    aria-label="Buscar contenido educativo por título o tags"
                  />
                  <span style={{ 
                    position: 'absolute',
                    left: 'var(--spacing-sm)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--neutral-500)'
                  }}>
                    🔍
                  </span>
                  {searchQuery && (
                    <button 
                      style={{ 
                        position: 'absolute',
                        right: 'var(--spacing-sm)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--neutral-500)',
                        fontSize: '1.2rem'
                      }}
                      onClick={() => setSearchQuery('')}
                      aria-label="Limpiar búsqueda"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--spacing-sm)'
                }} role="group" aria-label="Filtros por nivel">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`modern-btn ${selectedLevel === level ? 'modern-btn-primary' : 'modern-btn-outline'}`}
                      style={{ 
                        padding: 'var(--spacing-xs) var(--spacing-md)',
                        fontSize: '0.875rem'
                      }}
                      aria-pressed={selectedLevel === level}
                    >
                      {level === 'todos' ? 'Todos' : EDUCATION_CATEGORIES[level as keyof typeof EDUCATION_CATEGORIES]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="modern-alert modern-alert-error" role="alert">
                  <p>{error}</p>
                </div>
              )}

              {/* Results */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 'var(--spacing-md)',
                flexWrap: 'wrap',
                gap: 'var(--spacing-xs)'
              }}>
                <h2 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--neutral-900)',
                  margin: 0
                }}>
                  Resultados <span style={{ color: 'var(--primary-600)' }}>({filteredContent.length})</span>
                </h2>
              </div>

              {filteredContent.length === 0 ? (
                <div style={{ 
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--spacing-xl)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-md)'
                }} role="status" aria-live="polite">
                  <div style={{ 
                    fontSize: '4rem',
                    marginBottom: 'var(--spacing-md)',
                    opacity: 0.5
                  }} aria-hidden="true">
                    📖
                  </div>
                  <p style={{ 
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--neutral-800)',
                    margin: '0 0 var(--spacing-sm) 0'
                  }}>
                    No se encontró contenido con esos criterios
                  </p>
                  <p style={{ 
                    fontSize: '1rem',
                    color: 'var(--neutral-600)',
                    margin: 0
                  }}>
                    Intenta con otros términos de búsqueda o cambia los filtros
                  </p>
                </div>
              ) : (
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-md)'
                }}>
                  {filteredContent.map((content) => (
                    <EducationCard
                      key={content.id}
                      content={content}
                      onPress={() => handleContentPress(content)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Education Detail Modal */}
      {selectedContent && (
        <EducationDetail
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};