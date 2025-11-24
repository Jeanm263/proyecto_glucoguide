import React, { useState, useEffect, useCallback, useRef } from 'react';
import { foodService } from '../../services/foodService';
import { FoodCard } from '../../components/nutrition/FoodCard';
import { FoodDetails } from '../../components/nutrition/FoodDetails';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import type { FoodItem } from '../../types/food';
import { useDebounce } from '../../hooks/useDebounce';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { toastError } from '../../utils/toast';
import { BottomNavigation } from '../../components/common/BottomNavigation';

export const FoodSearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['todas']);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFoods, setTotalFoods] = useState(0);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastFoodElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreFoods();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadCategories = useCallback(async () => {
    try {
      const fetchedCategories = await foodService.getFoodCategories();
      setCategories(['todas', ...fetchedCategories]);
    } catch (error) {
      console.error('Error loading categories:', error);
      toastError('Error al cargar categorías');
    }
  }, []);

  const loadFoods = useCallback(async (page: number = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    
    try {
      let results: { data: FoodItem[]; total: number; page: number; pages: number };
      
      if (debouncedSearchTerm || selectedCategory !== 'todas') {
        // Usar búsqueda cuando hay término o categoría seleccionada
        results = await foodService.searchFoods(
          debouncedSearchTerm || undefined,
          selectedCategory !== 'todas' ? selectedCategory : undefined,
          page
        );
      } else {
        // Cargar todos los alimentos si no hay filtros
        results = await foodService.getAllFoods(page);
      }
      
      if (page === 1) {
        setFoods(results.data);
      } else {
        setFoods(prev => [...prev, ...results.data]);
      }
      
      setTotalFoods(results.total);
      setTotalPages(results.pages);
      setHasMore(page < results.pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading foods:', error);
      toastError('Error al cargar alimentos');
      if (page === 1) {
        setFoods([]);
      }
    } finally {
      if (page === 1) {
        setLoading(false);
        setInitialLoad(false);
      }
    }
  }, [debouncedSearchTerm, selectedCategory]);

  const loadMoreFoods = useCallback(() => {
    if (hasMore && !loading) {
      loadFoods(currentPage + 1);
    }
  }, [hasMore, loading, currentPage, loadFoods]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    // Reset pagination when search or category changes
    loadFoods(1);
  }, [loadFoods]);

  const handleFoodSelect = (food: FoodItem) => {
    // Mostrar detalles del alimento en un modal
    setSelectedFood(food);
  };

  const closeFoodDetails = () => {
    setSelectedFood(null);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: 'var(--neutral-50)'
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
              background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
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
                <span aria-hidden="true">🔍</span> Buscar Alimentos
              </h1>
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
                gap: 'var(--spacing-sm)',
                flexWrap: 'wrap'
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
                  style={{ flex: 1, minWidth: '150px' }}
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
                    marginBottom: 'var(--spacing-md)',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-xs)'
                  }}>
                    <p style={{ 
                      color: 'var(--neutral-600)',
                      margin: 0
                    }}>
                      {totalFoods} {totalFoods === 1 ? 'alimento encontrado' : 'alimentos encontrados'}
                    </p>
                    <p style={{ 
                      color: 'var(--neutral-500)',
                      margin: 0,
                      fontSize: '0.85rem'
                    }}>
                      Página {currentPage} de {totalPages}
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
                        <div 
                          ref={index === foods.length - 1 ? lastFoodElementRef : null}
                          key={`${food.id}-${index}`}
                        >
                          <FoodCard
                            food={food}
                            onPress={() => handleFoodSelect(food)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {loading && !initialLoad && (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: 'var(--spacing-md)',
                      color: 'var(--neutral-600)'
                    }}>
                      <div className="spinner" style={{ margin: '0 auto' }}></div>
                      <p style={{ marginTop: 'var(--spacing-sm)' }}>
                        Cargando más alimentos...
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Food Details Modal */}
      {selectedFood && (
        <FoodDetails
          food={selectedFood}
          onClose={closeFoodDetails}
        />
      )}
      
      {/* Theme Toggle Button */}
      <ThemeToggle />
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};