import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodService } from '../../services/foodService';
import { FoodCard } from '../../components/nutrition/FoodCard';
import { FoodDetails } from '../../components/nutrition/FoodDetails';
import type { FoodItem } from '../../types/food';
import { useDebounce } from '../../hooks/useDebounce';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { toastError } from '../../utils/toast';

export const FoodSearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['todas']);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const loadCategories = useCallback(async () => {
    try {
      const fetchedCategories = await foodService.getFoodCategories();
      setCategories(['todas', ...fetchedCategories]);
    } catch (error) {
      console.error('Error loading categories:', error);
      toastError('Error al cargar categorías');
    }
  }, []);

  const loadFoods = useCallback(async () => {
    setLoading(true);
    try {
      let results: FoodItem[] = [];
      
      if (debouncedSearchTerm || selectedCategory !== 'todas') {
        // Usar búsqueda cuando hay término o categoría seleccionada
        results = await foodService.searchFoods(
          debouncedSearchTerm || undefined,
          selectedCategory !== 'todas' ? selectedCategory : undefined
        );
      } else {
        // Cargar todos los alimentos si no hay filtros
        results = await foodService.getAllFoods();
      }
      
      setFoods(results);
    } catch (error) {
      console.error('Error loading foods:', error);
      toastError('Error al cargar alimentos');
      setFoods([]);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  const handleFoodSelect = (food: FoodItem) => {
    // Mostrar detalles del alimento en un modal
    setSelectedFood(food);
  };

  const closeFoodDetails = () => {
    setSelectedFood(null);
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-md)' }}>
      <div className="modern-card">
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          marginBottom: 'var(--spacing-md)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-sm)' 
          }}>
            <button
              onClick={() => navigate('/home')}
              className="modern-btn modern-btn-ghost"
              style={{ 
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: 'var(--spacing-xs) var(--spacing-sm)'
              }}
              aria-label="Volver al inicio"
            >
              <span aria-hidden="true">←</span> Inicio
            </button>
            <h1 style={{ 
              color: 'white',
              margin: 0,
              fontSize: '1.5rem',
              flex: 1,
              textAlign: 'center'
            }}>
              <span aria-hidden="true">🔍</span> Buscar Alimentos
            </h1>
            <div style={{ width: '80px' }}></div> {/* Espacio para balancear */}
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar alimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-form-input"
              style={{ 
                width: '100%',
                paddingLeft: 'var(--spacing-xl)',
                paddingRight: searchTerm ? 'var(--spacing-xl)' : 'var(--spacing-md)'
              }}
              aria-label="Buscar alimentos"
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
            {searchTerm && (
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
                onClick={() => setSearchTerm('')}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-sm)' 
          }}>
            <label htmlFor="category-select" style={{ 
              fontWeight: 500, 
              color: 'var(--neutral-700)',
              whiteSpace: 'nowrap'
            }}>
              Categoría:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="modern-form-input"
              style={{ flex: 1 }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div>
          {initialLoad && loading ? (
            <LoadingScreen />
          ) : (
            <>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 'var(--spacing-md)'
              }}>
                <p style={{ 
                  color: 'var(--neutral-600)',
                  margin: 0
                }}>
                  {foods.length} {foods.length === 1 ? 'alimento encontrado' : 'alimentos encontrados'}
                </p>
              </div>

              {foods.length === 0 && !loading ? (
                <div style={{ 
                  textAlign: 'center',
                  padding: 'var(--spacing-xl)',
                  color: 'var(--neutral-600)'
                }}>
                  <div style={{ 
                    fontSize: '3rem',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    🍽️
                  </div>
                  <p style={{ 
                    margin: '0 0 var(--spacing-sm) 0',
                    fontSize: '1.1rem'
                  }}>
                    {searchTerm || selectedCategory !== 'todas' 
                      ? 'No se encontraron alimentos que coincidan con tu búsqueda' 
                      : 'No hay alimentos disponibles'}
                  </p>
                  <p style={{ 
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    {searchTerm || selectedCategory !== 'todas' 
                      ? 'Intenta con otros términos de búsqueda' 
                      : 'Los alimentos aparecerán aquí cuando estén disponibles'}
                  </p>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: 'var(--spacing-md)'
                }}>
                  {foods.map((food, index) => (
                    <FoodCard
                      key={food.id || `${food.name}-${food.category}-${index}-${Date.now()}`}
                      food={food}
                      onPress={() => handleFoodSelect(food)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Food Details Modal */}
      {selectedFood && (
        <FoodDetails
          food={selectedFood}
          onClose={closeFoodDetails}
        />
      )}
    </div>
  );
};