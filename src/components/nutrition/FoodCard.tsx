import React, { memo } from 'react';
import type { FoodItem } from '../../types/food';
import { getTrafficLightColor } from '../../utils/trafficLightCalculator';

interface FoodCardProps {
  food: FoodItem;
  onPress: () => void;
}

/**
 * Componente de tarjeta de alimento optimizado con React.memo
 * Solo se re-renderiza si cambian las props (food o onPress)
 */
const FoodCardComponent: React.FC<FoodCardProps> = ({ food, onPress }) => {
  const trafficLightColor = getTrafficLightColor(food.trafficLight);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPress();
    }
  };

  const getTrafficLightLabel = (color: 'green' | 'yellow' | 'red') => {
    switch (color) {
      case 'green': return 'Excelente elección';
      case 'yellow': return 'Consumir con moderación';
      case 'red': return 'Consumir ocasionalmente';
    }
  };

  return (
    <div
      className="food-card"
      onClick={onPress}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${food.name}`}
    >
      <div className="food-card-header">
        <div
          className="traffic-light-indicator"
          style={{ backgroundColor: trafficLightColor }}
          role="img"
          aria-label={getTrafficLightLabel(food.trafficLight)}
        />
        <h3 className="food-name">{food.name}</h3>
        <span className="food-category" aria-label={`Categoría: ${food.category}`}>
          {food.category}
        </span>
      </div>
      
      <p className="food-portion">{food.portion}</p>
      
      <div className="food-stats">
        <span className="stat-item">
          <strong>IG:</strong> {food.glycemicIndex}
        </span>
        <span className="stat-item">
          <strong>Carbs:</strong> {food.carbohydrates}g
        </span>
        <span className="stat-item">
          <strong>Fibra:</strong> {food.fiber}g
        </span>
      </div>
      
      <style>{`
        .food-card {
          cursor: pointer;
          padding: 20px;
          margin: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #f0f0f0;
          position: relative;
          overflow: hidden;
          outline: none;
        }

        .food-card:focus {
          outline: 3px solid #667eea;
          outline-offset: 2px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08), 0 0 0 3px rgba(102, 126, 234, 0.3);
        }

        .food-card:focus-visible {
          outline: 3px solid #667eea;
          outline-offset: 2px;
        }

        .food-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 0;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          transition: height 0.3s ease;
        }

        .food-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          border-color: #667eea;
        }

        .food-card:hover::before {
          height: 100%;
        }

        .food-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .traffic-light-indicator {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .food-name {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #333;
          flex: 1;
        }

        .food-category {
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8ebf0 100%);
          color: #667eea;
          text-transform: capitalize;
        }

        .food-portion {
          margin: 8px 0;
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }

        .food-stats {
          display: flex;
          gap: 20px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }

        .stat-item {
          font-size: 13px;
          color: #888;
        }

        .stat-item strong {
          color: #667eea;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

// Memoizar el componente para evitar re-renders innecesarios
// Solo se re-renderiza si food o onPress cambian
export const FoodCard = memo(FoodCardComponent, (prevProps, nextProps) => {
  // Comparación personalizada: solo re-renderizar si el food cambió
  // o si onPress cambió (comparación por referencia)
  return (
    prevProps.food.id === nextProps.food.id &&
    prevProps.food.name === nextProps.food.name &&
    prevProps.food.trafficLight === nextProps.food.trafficLight &&
    prevProps.food.glycemicIndex === nextProps.food.glycemicIndex &&
    prevProps.food.carbohydrates === nextProps.food.carbohydrates &&
    prevProps.food.fiber === nextProps.food.fiber &&
    prevProps.onPress === nextProps.onPress
  );
});