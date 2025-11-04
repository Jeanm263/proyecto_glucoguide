import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodCard } from '../../components/nutrition/FoodCard';
import { FoodDetails } from '../../components/nutrition/FoodDetails';
import { INITIAL_FOODS } from '../../constants/foodsData';
import { useDebounce } from '../../hooks/useDebounce';
import type { FoodItem } from '../../types/food';
import type { FoodLog } from '../../types/foodLog';
import { foodLogService } from '../../services/foodLogService';
import { USE_MOCK_SERVICE } from '../../config/env';

export const FoodTrackingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD

  // Debounce del search query para mejorar performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Cargar alimentos y registros al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar registros de alimentos para la fecha seleccionada
        if (!USE_MOCK_SERVICE) {
          const logs = await foodLogService.getAllFoodLogs({ date });
          setFoodLogs(logs);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [date]);

  const filteredFoods = INITIAL_FOODS.filter(food => {
    // Filter by category
    if (selectedCategory !== 'todas' && food.category !== selectedCategory) {
      return false;
    }

    // Filter by search query (usando el valor debounced)
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      return (
        food.name.toLowerCase().includes(query) ||
        food.commonNames.some(name => name.toLowerCase().includes(query))
      );
    }

    return true;
  });

  const handleFoodPress = (food: FoodItem) => {
    setSelectedFood(food);
  };

  const categories = ['todas', ...new Set(INITIAL_FOODS.map(food => food.category))];

  return (
    <div className="food-tracking-page">
      {/* Header */}
      <header className="food-tracking-header">
        <div className="food-tracking-header-content">
          <button
            onClick={() => navigate('/home')}
            className="btn-back"
            aria-label="Volver al inicio"
          >
            <span aria-hidden="true">←</span> Inicio
          </button>
          <h1 className="food-tracking-title">
            <span aria-hidden="true">📝</span> Seguimiento de Alimentos
          </h1>
        </div>
      </header>

      {/* Date Selector */}
      <div className="date-selector">
        <label htmlFor="date-input">Fecha:</label>
        <input
          id="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-input"
        />
      </div>

      {/* Content */}
      <div className="food-tracking-content fade-in">
        {/* Search and Filters */}
        <div className="search-card" role="search">
          <label htmlFor="food-search-input" className="sr-only">
            Buscar alimentos
          </label>
          <input
            id="food-search-input"
            type="text"
            placeholder="Buscar alimentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Buscar alimentos por nombre"
          />

          <div className="category-filters" role="group" aria-label="Filtros por categoría">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                aria-pressed={selectedCategory === category}
              >
                {category === 'todas' ? 'Todas' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Food Logs Summary */}
        <div className="logs-summary">
          <h2>Resumen del día</h2>
          <div className="summary-stats">
            <div className="stat-card">
              <span className="stat-value">{foodLogs.length}</span>
              <span className="stat-label">Alimentos registrados</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">0g</span>
              <span className="stat-label">Carbohidratos</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">0g</span>
              <span className="stat-label">Fibra</span>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2 className="results-title" id="foods-results-heading">
            Alimentos disponibles{' '}
            {filteredFoods.length > 0 && (
              <span className="results-count" aria-label={`${filteredFoods.length} alimentos encontrados`}>
                ({filteredFoods.length})
              </span>
            )}
          </h2>
        </div>

        {/* Results */}
        {filteredFoods.length === 0 ? (
          <div className="empty-state" role="status" aria-live="polite">
            <div className="empty-icon" aria-hidden="true">🍎</div>
            <p className="empty-message">No se encontraron alimentos</p>
            <p className="empty-hint">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="foods-grid" role="list" aria-labelledby="foods-results-heading">
            {filteredFoods.map(food => (
              <div key={food.id} role="listitem">
                <FoodCard
                  food={food as FoodItem}
                  onPress={() => handleFoodPress(food as FoodItem)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Food Detail Modal */}
      {selectedFood && (
        <FoodDetails
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}

      <style>{`
        .food-tracking-page {
          min-height: 100vh;
          background: #f5f7fa;
        }

        .food-tracking-header {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .food-tracking-header-content {
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

        .food-tracking-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .date-selector {
          max-width: 1200px;
          margin: 20px auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .date-selector label {
          font-weight: 600;
          color: #333;
        }

        .date-input {
          padding: 8px 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
        }

        .food-tracking-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 30px;
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
          border-color: #764ba2;
          color: #764ba2;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(118, 75, 162, 0.3);
        }

        .category-btn:focus {
          outline: 3px solid #764ba2;
          outline-offset: 2px;
        }

        .logs-summary {
          background: white;
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .logs-summary h2 {
          margin: 0 0 20px 0;
          font-size: 24px;
          color: #333;
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          border: 1px solid #e9ecef;
        }

        .stat-value {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: #764ba2;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
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

        .foods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
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

        @media (max-width: 768px) {
          .search-card {
            padding: 24px 20px;
          }

          .food-tracking-title {
            font-size: 24px;
          }

          .foods-grid {
            grid-template-columns: 1fr;
          }

          .summary-stats {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};