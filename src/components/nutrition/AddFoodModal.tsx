import React, { useState, useEffect } from 'react';
import type { FoodItem } from '../../types/food';
import { foodService } from '../../services/foodService';

interface AddFoodModalProps {
  onClose: () => void;
  onAdd: (food: FoodItem, portion: string, time: string) => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({ onClose, onAdd }) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [portion, setPortion] = useState('');
  const [time, setTime] = useState<string>(new Date().toTimeString().slice(0, 5));
  const [searchQuery, setSearchQuery] = useState('');
  const [showFoodList, setShowFoodList] = useState(false);
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar alimentos cuando se abre el modal
  useEffect(() => {
    const loadFoods = async () => {
      if (showFoodList && searchQuery) {
        setLoading(true);
        try {
          const foods = await foodService.searchFoods(searchQuery);
          setFilteredFoods(foods);
        } catch (error) {
          console.error('Error loading foods:', error);
          setFilteredFoods([]);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredFoods([]);
      }
    };

    loadFoods();
  }, [showFoodList, searchQuery]);

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setShowFoodList(false);
    setSearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFood && portion) {
      onAdd(selectedFood, portion, time);
      onClose();
    }
  };

  const formatTrafficLight = (value: number, threshold: number) => {
    if (value <= threshold * 0.5) return '🟢'; // Bajo
    if (value <= threshold * 0.8) return '🟡'; // Medio
    return '🔴'; // Alto
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Agregar Alimento</h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Selector de Alimento */}
          <div className="form-group">
            <label className="form-label">Alimento</label>
            <div className="food-selector">
              <input
                type="text"
                value={searchQuery || (selectedFood ? selectedFood.name : '')}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowFoodList(true);
                  if (!e.target.value) setSelectedFood(null);
                }}
                onFocus={() => setShowFoodList(true)}
                placeholder="Buscar alimento..."
                className="form-input"
                required
              />
              
              {showFoodList && searchQuery && (
                <div className="food-dropdown">
                  {loading ? (
                    <div className="loading-message">Buscando alimentos...</div>
                  ) : filteredFoods.length > 0 ? (
                    filteredFoods.map((food, index) => (
                      <div
                        key={`${food.id || food.name}-${food.category}-${index}-${Date.now()}`}
                        className="food-option"
                        onClick={() => handleFoodSelect(food)}
                      >
                        <div className="food-option-content">
                          <span className="food-name">{food.name}</span>
                          <div className="food-nutrition-preview">
                            <span className="nutrition-preview">
                              {formatTrafficLight(food.carbohydrates, 20)} {food.carbohydrates}g carbs
                            </span>
                            <span className="nutrition-preview">
                              {formatTrafficLight(food.fiber, 5)} {food.fiber}g fibra
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">No se encontraron alimentos</div>
                  )}
                </div>
              )}
            </div>
            
            {selectedFood && (
              <div className="selected-food-preview">
                <div className="food-preview-header">
                  <h3 className="food-preview-name">{selectedFood.name}</h3>
                  <span className={`category-tag ${selectedFood.category}`}>
                    {selectedFood.category}
                  </span>
                </div>
                <div className="food-preview-nutrition">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Carbohidratos:</span>
                    <span className="nutrition-value">
                      {formatTrafficLight(selectedFood.carbohydrates, 20)} {selectedFood.carbohydrates}g
                    </span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fibra:</span>
                    <span className="nutrition-value">
                      {formatTrafficLight(selectedFood.fiber, 5)} {selectedFood.fiber}g
                    </span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Azúcares:</span>
                    <span className="nutrition-value">
                      {formatTrafficLight(selectedFood.sugars, 10)} {selectedFood.sugars}g
                    </span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Índice Glucémico:</span>
                    <span className="nutrition-value">
                      {selectedFood.glycemicIndex <= 55 ? '🟢 Bajo' : 
                       selectedFood.glycemicIndex <= 70 ? '🟡 Medio' : '🔴 Alto'} ({selectedFood.glycemicIndex})
                    </span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Porción recomendada:</span>
                    <span className="nutrition-value">
                      {selectedFood.portion}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Porción */}
          <div className="form-group">
            <label className="form-label">Porción</label>
            <input
              type="text"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              placeholder="Ej: 1 unidad, 100g, 1 taza"
              className="form-input"
              required
            />
            {selectedFood && (
              <div className="portion-hint">
                Porción recomendada: {selectedFood.portion}
              </div>
            )}
          </div>

          {/* Hora */}
          <div className="form-group">
            <label className="form-label">Hora</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Botones */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={!selectedFood || !portion}
            >
              Agregar
            </button>
          </div>
        </form>

        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 20px;
          }

          .modal-content {
            background: white;
            border-radius: 20px;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 24px 0 24px;
            border-bottom: none;
          }

          .modal-title {
            font-size: 24px;
            font-weight: 700;
            color: #333;
            margin: 0;
          }

          .modal-close {
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #999;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
          }

          .modal-close:hover {
            background: #f5f5f5;
            color: #333;
          }

          .modal-form {
            padding: 24px;
          }

          .form-group {
            margin-bottom: 24px;
          }

          .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 14px;
          }

          .form-input {
            width: 100%;
            padding: 14px 18px;
            font-size: 16px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            outline: none;
            transition: all 0.3s ease;
            background: #fafafa;
          }

          .form-input:focus {
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          }

          .food-selector {
            position: relative;
          }

          .food-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 2px solid #e0e0e0;
            border-top: none;
            border-radius: 0 0 12px 12px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 100;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }

          .food-option {
            padding: 12px 18px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.3s ease;
          }

          .food-option:hover {
            background: #f8f9ff;
          }

          .food-option:last-child {
            border-bottom: none;
          }

          .food-option-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .food-name {
            font-weight: 500;
            color: #333;
          }

          .food-nutrition-preview {
            display: flex;
            gap: 12px;
            font-size: 12px;
          }

          .nutrition-preview {
            color: #666;
          }

          .no-results, .loading-message {
            padding: 16px;
            text-align: center;
            color: #999;
            font-style: italic;
          }

          .selected-food-preview {
            background: #f8f9ff;
            border-radius: 12px;
            padding: 16px;
            margin-top: 12px;
            border: 1px solid #e0e0ff;
          }

          .food-preview-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }

          .food-preview-name {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin: 0;
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

          .category-tag.lacteos {
            background: rgba(255, 152, 0, 0.1);
            color: #ff9800;
          }

          .category-tag.grasas {
            background: rgba(121, 85, 72, 0.1);
            color: #795548;
          }

          .category-tag.endulzantes {
            background: rgba(244, 67, 54, 0.1);
            color: #f44336;
          }

          .category-tag.legumbres {
            background: rgba(139, 195, 74, 0.1);
            color: #8bc34a;
          }

          .food-preview-nutrition {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .nutrition-item {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
          }

          .nutrition-label {
            color: #666;
            font-weight: 500;
          }

          .nutrition-value {
            color: #333;
            font-weight: 600;
          }

          .portion-hint {
            margin-top: 8px;
            font-size: 14px;
            color: #666;
            font-style: italic;
          }

          .modal-actions {
            display: flex;
            gap: 16px;
            margin-top: 32px;
          }

          .btn-cancel {
            flex: 1;
            padding: 14px 24px;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn-cancel:hover {
            background: #f5f5f5;
            transform: translateY(-2px);
          }

          .btn-submit {
            flex: 1;
            padding: 14px 24px;
            border: none;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn-submit:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
          }

          .btn-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          @media (max-width: 768px) {
            .modal-content {
              margin: 10px;
              max-height: calc(100vh - 20px);
            }

            .modal-form {
              padding: 20px;
            }

            .food-preview-nutrition {
              grid-template-columns: 1fr;
              gap: 8px;
            }

            .modal-actions {
              flex-direction: column;
            }
          }

          @media (max-width: 480px) {
            .modal-header {
              padding: 20px 20px 0 20px;
            }

            .modal-title {
              font-size: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};