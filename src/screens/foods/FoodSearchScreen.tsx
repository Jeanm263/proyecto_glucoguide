import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodCard } from '../../components/nutrition/FoodCard';
import { FoodDetails } from '../../components/nutrition/FoodDetails';
import { INITIAL_FOODS, FOOD_CATEGORIES } from '../../constants/foodsData';
import { useDebounce } from '../../hooks/useDebounce';
import type { FoodItem } from '../../types/food';

export const FoodSearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Debounce del search query para mejorar performance
  // Solo ejecuta el filtrado 300ms después de que el usuario deje de escribir
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Memoizar el callback para evitar re-crear la función en cada render
  // Esto permite que React.memo en FoodCard funcione correctamente
  const handleFoodPress = useCallback((food: FoodItem) => {
    setSelectedFood(food);
  }, []);

  const filteredFoods = useMemo(() => {
    let foods = INITIAL_FOODS;

    // Filter by category
    if (selectedCategory !== 'todas') {
      foods = foods.filter(food => food.category === selectedCategory);
    }

    // Filter by search query (usando el valor debounced)
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      foods = foods.filter(food =>
        food.name.toLowerCase().includes(query) ||
        food.commonNames.some(name => name.toLowerCase().includes(query))
      );
    }

    return foods;
  }, [debouncedSearchQuery, selectedCategory]);

  return (
    <div className="foods-page">
      {/* Header */}
      <header className="foods-header">
        <div className="foods-header-content">
          <button
            onClick={() => navigate('/home')}
            className="btn-back"
            aria-label="Volver al inicio"
          >
            <span aria-hidden="true">←</span> Inicio
          </button>
          <h1 className="foods-title">
            <span aria-hidden="true">🍎</span> Buscar Alimentos
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="foods-content fade-in">
        {/* Search and Filters */}
        <div className="search-card" role="search">
          <label htmlFor="food-search-input" className="sr-only">
            Buscar alimentos
          </label>
          <input
            id="food-search-input"
            type="text"
            placeholder="Buscar alimentos... (ej: manzana, arroz, pan)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Buscar alimentos por nombre"
            aria-describedby="food-search-hint"
          />
          <span id="food-search-hint" className="sr-only">
            Escribe el nombre del alimento que deseas buscar
          </span>

          <div className="category-filters" role="group" aria-label="Filtros por categoría">
            {FOOD_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                aria-pressed={selectedCategory === category}
                aria-label={`Filtrar por categoría: ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2 className="results-title" id="results-heading">
            Resultados{' '}
            {filteredFoods.length > 0 && (
              <span className="results-count" aria-label={`${filteredFoods.length} alimentos encontrados`}>
                ({filteredFoods.length})
              </span>
            )}
          </h2>
        </div>

        {/* Results */}
        {filteredFoods.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p className="empty-message">No se encontraron alimentos con esos criterios</p>
            <p className="empty-hint">Intenta con otros términos o cambia la categoría</p>
          </div>
        ) : (
          <div className="foods-grid" role="list" aria-labelledby="results-heading">
            {filteredFoods.map(food => (
              <div key={food.id} role="listitem">
                <FoodCard
                  food={food}
                  onPress={() => handleFoodPress(food)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Food Details Modal */}
      {selectedFood && (
        <FoodDetails
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}

      <style>{`
        .foods-page {
          min-height: 100vh;
          background: #f5f7fa;
        }

        .foods-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .foods-header-content {
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

        .foods-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .foods-content {
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
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .category-btn {
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

        .category-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .category-btn:focus {
          outline: 3px solid #667eea;
          outline-offset: 2px;
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
          color: #667eea;
          font-weight: 600;
        }

        .foods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
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
          .foods-grid {
            grid-template-columns: 1fr;
          }

          .search-card {
            padding: 24px 20px;
          }

          .foods-title {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};
