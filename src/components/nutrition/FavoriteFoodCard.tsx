import React from 'react';
import type { FoodItem } from '../../types/food';

interface FavoriteFoodCardProps {
  food: FoodItem;
  onRemove: (foodId: string) => void;
}

export const FavoriteFoodCard: React.FC<FavoriteFoodCardProps> = ({ food, onRemove }) => {
  return (
    <div className="food-card card-hover">
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
          onClick={() => onRemove(food.id)}
          className="btn-remove-favorite"
        >
          Eliminar
        </button>
      </div>

      <style>{`
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

        @media (max-width: 768px) {
          .food-details {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .food-actions {
            text-align: left;
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  );
};