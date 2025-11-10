import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '../components/common/BottomNavigation';
import { profileService } from '../services/profileService';
import { foodService } from '../services/foodService';
import { toastError, toastSuccess } from '../utils/toast';
import type { FoodItem as Food } from '../types/food';

export const FavoritesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [favoriteFoods, setFavoriteFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavoriteFoods();
  }, []);

  const loadFavoriteFoods = async () => {
    try {
      setLoading(true);
      // Obtener IDs de alimentos favoritos
      const favoriteFoodIds = await profileService.getFavoriteFoods();
      
      if (favoriteFoodIds.length > 0) {
        // Obtener detalles de los alimentos favoritos
        const foodsData = await Promise.all(
          favoriteFoodIds.map(id => foodService.getFoodById(id))
        );
        // Filtrar alimentos que no sean null
        const foods = foodsData.filter((food): food is Food => food !== null);
        setFavoriteFoods(foods);
      } else {
        setFavoriteFoods([]);
      }
    } catch (error) {
      console.error('Error loading favorite foods:', error);
      toastError('Error al cargar alimentos favoritos');
      setFavoriteFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (foodId: string) => {
    try {
      await profileService.removeFavoriteFood(foodId);
      setFavoriteFoods(prev => prev.filter(food => food.id !== foodId));
      toastSuccess('Alimento eliminado de favoritos');
    } catch (error) {
      console.error('Error removing favorite food:', error);
      toastError('Error al eliminar alimento de favoritos');
    }
  };

  if (loading) {
    return (
      <div className="favorites-page">
        {/* Header */}
        <header className="favorites-header">
          <div className="favorites-header-content">
            <button
              onClick={() => navigate('/profile')}
              className="btn-back"
              aria-label="Volver al perfil"
            >
              <span aria-hidden="true">←</span> Volver
            </button>
            <h1 className="favorites-title">
              <span aria-hidden="true">⭐</span> Alimentos Favoritos
            </h1>
          </div>
        </header>

        <div className="favorites-content fade-in">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando alimentos favoritos...</p>
          </div>
        </div>

        <BottomNavigation />

        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 60vh;
            gap: 16px;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
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
    <div className="favorites-page">
      {/* Header */}
      <header className="favorites-header">
        <div className="favorites-header-content">
          <button
            onClick={() => navigate('/profile')}
            className="btn-back"
            aria-label="Volver al perfil"
          >
            <span aria-hidden="true">←</span> Volver
          </button>
          <h1 className="favorites-title">
            <span aria-hidden="true">⭐</span> Alimentos Favoritos
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="favorites-content fade-in">
        {favoriteFoods.length > 0 ? (
          <div className="favorites-grid">
            {favoriteFoods.map((food) => (
              <div key={food.id} className="food-card card-hover">
                <div className="food-card-header">
                  <h3 className="food-name">{food.name}</h3>
                  <span className="food-category">{food.category}</span>
                </div>
                <div className="food-details">
                  <p className="food-calories">{food.carbohydrates}g carbohidratos por {food.portion}</p>
                  <div className={`traffic-light ${food.trafficLight}`}>
                    {food.trafficLight === 'green' && '🟢'}
                    {food.trafficLight === 'yellow' && '🟡'}
                    {food.trafficLight === 'red' && '🔴'}
                  </div>
                </div>
                <div className="food-actions">
                  <button
                    onClick={() => handleRemoveFavorite(food.id)}
                    className="btn-remove-favorite"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">⭐</div>
            <h3>No tienes alimentos favoritos aún</h3>
            <p>Agrega alimentos a tus favoritos para encontrarlos fácilmente</p>
            <button
              onClick={() => navigate('/foods')}
              className="btn-primary"
            >
              Buscar alimentos
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      <style>{`
        .favorites-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 80px;
        }

        .favorites-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .favorites-header-content {
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

        .favorites-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .favorites-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .favorites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .food-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .food-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .food-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .food-name {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .food-category {
          background: #e0e0e0;
          color: #666;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .food-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .food-calories {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        .traffic-light {
          font-size: 20px;
        }

        .food-actions {
          text-align: right;
        }

        .btn-remove-favorite {
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-remove-favorite:hover {
          background: #ff5252;
          transform: translateY(-2px);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: 24px;
          color: #333;
          margin: 0 0 12px 0;
        }

        .empty-state p {
          color: #999;
          margin: 0 0 24px 0;
          font-size: 16px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .favorites-title {
            font-size: 24px;
          }

          .favorites-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .favorites-content {
            padding: 20px 16px;
          }

          .favorites-header-content {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};