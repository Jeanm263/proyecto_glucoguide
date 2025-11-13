import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodService } from '../../services/foodService';
import { FoodCard } from '../../components/nutrition/FoodCard';
import { FoodDetails } from '../../components/nutrition/FoodDetails';
import type { FoodItem } from '../../types/food';
import { BottomNavigation } from '../../components/common/BottomNavigation';
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
    <div className="food-search-page">
      {/* Header */}
      <header className="food-search-header">
        <div className="food-search-header-content">
          <button
            onClick={() => navigate('/home')}
            className="btn-back"
            aria-label="Volver al inicio"
          >
            <span aria-hidden="true">←</span> Inicio
          </button>
          <h1 className="food-search-title">
            <span aria-hidden="true">🔍</span> Buscar Alimentos
          </h1>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar alimentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Buscar alimentos"
          />
          <button 
            className="clear-search"
            onClick={() => setSearchTerm('')}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        </div>

        <div className="category-filter">
          <label htmlFor="category-select" className="category-label">
            Categoría:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
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
      <div className="food-search-content fade-in">
        {initialLoad && loading ? (
          <LoadingScreen />
        ) : (
          <>
            <div className="results-header">
              <p className="results-count">
                {foods.length} {foods.length === 1 ? 'alimento encontrado' : 'alimentos encontrados'}
              </p>
            </div>

            {foods.length === 0 && !loading ? (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <p className="empty-message">
                  {searchTerm || selectedCategory !== 'todas' 
                    ? 'No se encontraron alimentos que coincidan con tu búsqueda' 
                    : 'No hay alimentos disponibles'}
                </p>
                <p className="empty-hint">
                  {searchTerm || selectedCategory !== 'todas' 
                    ? 'Intenta con otros términos de búsqueda' 
                    : 'Los alimentos aparecerán aquí cuando estén disponibles'}
                </p>
              </div>
            ) : (
              <div className="food-grid">
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

      {/* Food Details Modal */}
      {selectedFood && (
        <FoodDetails
          food={selectedFood}
          onClose={closeFoodDetails}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />

      <style>{`
        .food-search-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 80px;
        }

        .food-search-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .food-search-header-content {
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

        .food-search-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .search-filters {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .search-container {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 14px 45px 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .clear-search {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 18px;
          color: #999;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .clear-search:hover {
          background: #f0f0f0;
          color: #666;
        }

        .category-filter {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
          white-space: nowrap;
        }

        .category-select {
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
          background: white;
          min-width: 150px;
        }

        .category-select:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .food-search-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .results-header {
          margin-bottom: 20px;
        }

        .results-count {
          font-size: 16px;
          color: #666;
          font-weight: 500;
          margin: 0;
        }

        .food-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          font-size: 60px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-message {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
        }

        .empty-hint {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        @media (max-width: 768px) {
          .food-search-header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .food-search-title {
            font-size: 24px;
          }

          .search-filters {
            flex-direction: column;
          }

          .category-filter {
            width: 100%;
          }

          .category-select {
            flex: 1;
          }

          .food-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .food-search-page {
            padding-bottom: 90px;
          }

          .search-filters {
            padding: 16px;
          }

          .food-search-content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};