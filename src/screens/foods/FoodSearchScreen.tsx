import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodCard } from '../../components/nutrition/FoodCard';
import { FoodDetails } from '../../components/nutrition/FoodDetails';
import { INITIAL_FOODS, FOOD_CATEGORIES } from '../../constants/foodsData';
import type { FoodItem } from '../../types/food';

export const FoodSearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const filteredFoods = useMemo(() => {
    let foods = INITIAL_FOODS;

    // Filter by category
    if (selectedCategory !== 'todas') {
      foods = foods.filter(food => food.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      foods = foods.filter(food =>
        food.name.toLowerCase().includes(query) ||
        food.commonNames.some(name => name.toLowerCase().includes(query))
      );
    }

    return foods;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="foods-page">
      {/* Header */}
      <div className="foods-header">
        <div className="foods-header-content">
          <button onClick={() => navigate('/home')} className="btn-back">
            ← Inicio
          </button>
          <h1 className="foods-title">🍎 Buscar Alimentos</h1>
        </div>
      </div>

      {/* Content */}
      <div className="foods-content fade-in">
        {/* Search and Filters */}
        <div className="search-card">
          <input
            type="text"
            placeholder="Buscar alimentos... (ej: manzana, arroz, pan)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <div className="category-filters">
            {FOOD_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2 className="results-title">
            Resultados {filteredFoods.length > 0 && <span className="results-count">({filteredFoods.length})</span>}
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
          <div className="foods-grid">
            {filteredFoods.map(food => (
              <FoodCard
                key={food.id}
                food={food}
                onPress={() => setSelectedFood(food)}
              />
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
