import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '../../components/common/BottomNavigation';
import { AddFoodModal } from '../../components/nutrition/AddFoodModal';
import type { FoodItem } from '../../types/food';

interface FoodEntry {
  id: string;
  food: FoodItem;
  portion: string;
  time: string;
  date: string; // Agregar fecha al registro
}

export const FoodTrackingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    {
      id: '1',
      food: {
        id: 'apple-1',
        name: 'Manzana',
        category: 'frutas',
        glycemicIndex: 38,
        carbohydrates: 25,
        fiber: 4,
        sugars: 19,
        portion: '1 unidad mediana (182g)',
        trafficLight: 'green',
        commonNames: ['manzana roja', 'manzana verde', 'apple']
      },
      portion: '1 unidad mediana',
      time: '08:30',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '2',
      food: {
        id: 'bread-1',
        name: 'Pan integral',
        category: 'cereales',
        glycemicIndex: 55,
        carbohydrates: 15,
        fiber: 2,
        sugars: 2,
        portion: '2 rebanadas (60g)',
        trafficLight: 'yellow',
        commonNames: ['pan integral', 'whole wheat bread']
      },
      portion: '2 rebanadas',
      time: '13:15',
      date: new Date().toISOString().split('T')[0]
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddFood = (food: FoodItem, portion: string, time: string) => {
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      food,
      portion,
      time,
      date: selectedDate // Usar la fecha seleccionada
    };
    setFoodEntries(prev => [...prev, newEntry]);
  };

  const handleDeleteFood = (id: string) => {
    setFoodEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const totalCarbs = foodEntries
    .filter(entry => entry.date === selectedDate)
    .reduce((sum, entry) => sum + entry.food.carbohydrates, 0);
    
  const totalFiber = foodEntries
    .filter(entry => entry.date === selectedDate)
    .reduce((sum, entry) => sum + entry.food.fiber, 0);

  const formatTrafficLight = (value: number, threshold: number) => {
    if (value <= threshold * 0.5) return '🟢'; // Bajo
    if (value <= threshold * 0.8) return '🟡'; // Medio
    return '🔴'; // Alto
  };

  // Filtrar alimentos por fecha seleccionada y agrupar por hora
  const filteredEntries = foodEntries.filter(entry => entry.date === selectedDate);
  
  const groupedEntries = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.time]) {
      acc[entry.time] = [];
    }
    acc[entry.time].push(entry);
    return acc;
  }, {} as Record<string, FoodEntry[]>);

  return (
    <div className="tracking-page">
      {/* Header */}
      <header className="tracking-header">
        <div className="tracking-header-content">
          <button
            onClick={() => navigate('/home')}
            className="btn-back"
            aria-label="Volver al inicio"
          >
            <span aria-hidden="true">←</span> Inicio
          </button>
          <h1 className="tracking-title">
            <span aria-hidden="true">📝</span> Seguimiento
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="tracking-content fade-in">
        {/* Date Selector */}
        <div className="date-selector">
          <label htmlFor="date-input" className="date-label">
            Fecha:
          </label>
          <input
            id="date-input"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">📊</div>
            <div className="summary-info">
              <h3 className="summary-title">Carbohidratos</h3>
              <p className="summary-value">{totalCarbs}g</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">🌾</div>
            <div className="summary-info">
              <h3 className="summary-title">Fibra</h3>
              <p className="summary-value">{totalFiber}g</p>
            </div>
          </div>
        </div>

        {/* Add Food Button */}
        <div className="add-food-section">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-add-food"
            aria-label="Agregar alimento"
          >
            <span aria-hidden="true">+</span> Agregar Alimento
          </button>
        </div>

        {/* Food Entries */}
        <div className="entries-section">
          <h2 className="entries-title">Alimentos de hoy</h2>
          
          {filteredEntries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍽️</div>
              <p className="empty-message">No has registrado alimentos hoy</p>
              <p className="empty-hint">Agrega tu primer alimento</p>
            </div>
          ) : (
            <div className="entries-list">
              {Object.keys(groupedEntries)
                .sort()
                .map((time) => (
                  <div key={time} className="time-group">
                    <div className="time-header">
                      <h3 className="time-title">⏰ {time}</h3>
                    </div>
                    {groupedEntries[time].map((entry) => (
                      <div key={entry.id} className="entry-card">
                        <div className="entry-header">
                          <div className="entry-time">{entry.time}</div>
                          <button
                            onClick={() => handleDeleteFood(entry.id)}
                            className="btn-delete"
                            aria-label={`Eliminar ${entry.food.name}`}
                          >
                            ×
                          </button>
                        </div>
                        <div className="entry-content">
                          <h3 className="entry-food-name">{entry.food.name}</h3>
                          <p className="entry-portion">{entry.portion}</p>
                          <div className="entry-nutrition">
                            <span className="nutrition-item">
                              Carbs: <strong>{formatTrafficLight(entry.food.carbohydrates, 20)} {entry.food.carbohydrates}g</strong>
                            </span>
                            <span className="nutrition-item">
                              Fibra: <strong>{formatTrafficLight(entry.food.fiber, 5)} {entry.food.fiber}g</strong>
                            </span>
                          </div>
                          <div className="entry-category">
                            <span className={`category-tag ${entry.food.category}`}>
                              {entry.food.category}
                            </span>
                            <span className="glycemic-index">
                              IG: {entry.food.glycemicIndex}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Food Modal */}
      {showAddModal && (
        <AddFoodModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddFood}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />

      <style>{`
        .tracking-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 80px;
        }

        .tracking-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .tracking-header-content {
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

        .tracking-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .tracking-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .date-selector {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .date-label {
          font-weight: 600;
          color: #333;
          font-size: 16px;
        }

        .date-input {
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        .date-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .summary-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .summary-icon {
          font-size: 28px;
        }

        .summary-info {
          flex: 1;
        }

        .summary-title {
          font-size: 14px;
          color: #999;
          margin: 0 0 4px 0;
          font-weight: 500;
        }

        .summary-value {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .add-food-section {
          text-align: center;
          margin-bottom: 30px;
        }

        .btn-add-food {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .btn-add-food:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .entries-section {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .entries-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0 0 20px 0;
        }

        .time-group {
          margin-bottom: 24px;
        }

        .time-group:last-child {
          margin-bottom: 0;
        }

        .time-header {
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #f0f0f0;
        }

        .time-title {
          font-size: 20px;
          font-weight: 600;
          color: #667eea;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .entries-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .entry-card {
          border: 1px solid #e0e0e0;
          border-radius: 16px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .entry-card:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
        }

        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .entry-time {
          font-size: 14px;
          font-weight: 600;
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .btn-delete {
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .btn-delete:hover {
          background: #ff5252;
          transform: scale(1.1);
        }

        .entry-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .entry-food-name {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .entry-portion {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        .entry-nutrition {
          display: flex;
          gap: 16px;
          margin-top: 4px;
        }

        .nutrition-item {
          font-size: 14px;
          color: #666;
        }

        .entry-category {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .category-tag {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .category-tag.frutas {
          background: rgba(76, 175, 80, 0.1);
          color: #4caf50;
        }

        .category-tag.verduras {
          background: rgba(255, 193, 7, 0.1);
          color: #ff9800;
        }

        .category-tag.cereales {
          background: rgba(33, 150, 243, 0.1);
          color: #2196f3;
        }

        .category-tag.proteinas {
          background: rgba(156, 39, 176, 0.1);
          color: #9c27b0;
        }

        .glycemic-index {
          font-size: 12px;
          color: #666;
          background: #f5f5f5;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
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
          .summary-grid {
            grid-template-columns: 1fr;
          }

          .tracking-title {
            font-size: 24px;
          }

          .tracking-page {
            padding-bottom: 90px;
          }

          .date-selector {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .entry-nutrition {
            flex-direction: column;
            gap: 4px;
          }

          .entry-category {
            flex-direction: column;
            gap: 8px;
          }

          .time-header {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .tracking-content {
            padding: 20px 16px;
          }

          .summary-card {
            padding: 16px;
          }

          .summary-value {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};