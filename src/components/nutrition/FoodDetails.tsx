import React from 'react';
import type { FoodItem } from '../../types/food';
import { getTrafficLightColor, getTrafficLightText } from '../../utils/trafficLightCalculator';

interface FoodDetailsProps {
  food: FoodItem;
  onClose: () => void;
}

export const FoodDetails: React.FC<FoodDetailsProps> = ({ food, onClose }) => {
  const trafficLightColor = getTrafficLightColor(food.trafficLight);
  const trafficLightText = getTrafficLightText(food.trafficLight);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">×</button>

        <div className="modal-header">
          <div className="traffic-light-badge" style={{ backgroundColor: trafficLightColor }} />
          <div>
            <h2 className="modal-title">{food.name}</h2>
            <p className="modal-subtitle">{trafficLightText}</p>
          </div>
        </div>

        <div className="info-card">
          <h3 className="info-card-title">Información Nutricional</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Porción:</strong> {food.portion}
            </div>
            <div className="info-item">
              <strong>Categoría:</strong> <span className="capitalize">{food.category}</span>
            </div>
            <div className="info-item">
              <strong>Índice Glucémico:</strong> {food.glycemicIndex}
            </div>
            <div className="info-item">
              <strong>Carbohidratos:</strong> {food.carbohydrates}g
            </div>
            <div className="info-item">
              <strong>Fibra:</strong> {food.fiber}g
            </div>
            <div className="info-item">
              <strong>Azúcares:</strong> {food.sugars}g
            </div>
          </div>
        </div>

        {food.commonNames && food.commonNames.length > 0 && (
          <div className="common-names-section">
            <h3 className="section-title">También conocido como</h3>
            <div className="tags-container">
              {food.commonNames.map((name, idx) => (
                <span key={idx} className="tag-blue">{name}</span>
              ))}
            </div>
          </div>
        )}

        <div className="recommendation-card" style={{ borderLeftColor: trafficLightColor }}>
          <h3 className="recommendation-title">Recomendación</h3>
          <p className="recommendation-text">
            {food.trafficLight === 'green' && 'Este alimento es una excelente elección para tu dieta. Rico en fibra y con bajo índice glucémico.'}
            {food.trafficLight === 'yellow' && 'Consume este alimento con moderación y preferiblemente combinado con proteínas y grasas saludables.'}
            {food.trafficLight === 'red' && 'Este alimento debe consumirse ocasionalmente. Busca alternativas más saludables con mayor fibra y menor índice glucémico.'}
          </p>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          padding: 32px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideIn 0.3s ease-out;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f0f0f0;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: #e0e0e0;
          transform: rotate(90deg);
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .traffic-light-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .modal-title {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #333;
        }

        .modal-subtitle {
          margin: 4px 0 0 0;
          font-size: 16px;
          color: #666;
        }

        .info-card {
          padding: 20px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .info-card-title {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .info-item {
          font-size: 14px;
          color: #555;
        }

        .info-item strong {
          color: #667eea;
          font-weight: 600;
        }

        .capitalize {
          text-transform: capitalize;
        }

        .common-names-section {
          margin-bottom: 24px;
        }

        .section-title {
          margin: 0 0 12px 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-blue {
          padding: 6px 16px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #1976d2;
        }

        .recommendation-card {
          padding: 20px;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 16px;
          border-left: 4px solid;
          animation: slideIn 0.4s ease-out;
        }

        .recommendation-title {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .recommendation-text {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          color: #555;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .modal-content {
            padding: 24px 20px;
          }

          .modal-title {
            font-size: 24px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
