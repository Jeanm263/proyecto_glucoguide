import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadFoodEntries = useCallback(async () => {
    setLoading(true);
    try {
      // Cargar registros del localStorage
      const storedEntries = localStorage.getItem('foodEntries');
      const entries: FoodEntry[] = storedEntries ? JSON.parse(storedEntries) : [];
      
      // Filtrar por fecha seleccionada
      const filteredEntries = entries.filter(entry => entry.date === selectedDate);
      setFoodEntries(filteredEntries);
    } catch (error) {
      console.error('Error loading food entries:', error);
      setFoodEntries([]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  // Cargar registros de alimentos al montar el componente y cuando cambia la fecha
  useEffect(() => {
    loadFoodEntries();
  }, [selectedDate, loadFoodEntries]);

  const saveFoodEntries = (entries: FoodEntry[]) => {
    try {
      localStorage.setItem('foodEntries', JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving food entries:', error);
    }
  };

  const handleAddFood = (food: FoodItem, portion: string, time: string) => {
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      food,
      portion,
      time,
      date: selectedDate // Usar la fecha seleccionada
    };
    
    const updatedEntries = [...foodEntries, newEntry];
    setFoodEntries(updatedEntries);
    
    // Guardar en localStorage
    const allEntries = localStorage.getItem('foodEntries');
    const existingEntries: FoodEntry[] = allEntries ? JSON.parse(allEntries) : [];
    const newEntries = [...existingEntries, newEntry];
    saveFoodEntries(newEntries);
  };

  const handleDeleteFood = (id: string) => {
    const updatedEntries = foodEntries.filter(entry => entry.id !== id);
    setFoodEntries(updatedEntries);
    
    // Actualizar en localStorage
    const allEntries = localStorage.getItem('foodEntries');
    const existingEntries: FoodEntry[] = allEntries ? JSON.parse(allEntries) : [];
    const newEntries = existingEntries.filter(entry => entry.id !== id);
    saveFoodEntries(newEntries);
  };

  const totalCarbs = foodEntries
    .filter(entry => entry.date === selectedDate)
    .reduce((sum, entry) => sum + entry.food.carbohydrates, 0);
    
  const totalFiber = foodEntries
    .filter(entry => entry.date === selectedDate)
    .reduce((sum, entry) => sum + entry.food.fiber, 0);


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
    <div className="container" style={{ padding: 'var(--spacing-md)' }}>
      <div className="modern-card">
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          marginBottom: 'var(--spacing-md)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-sm)' 
          }}>
            <button
              onClick={() => navigate('/home')}
              className="modern-btn modern-btn-ghost"
              style={{ 
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: 'var(--spacing-xs) var(--spacing-sm)'
              }}
              aria-label="Volver al inicio"
            >
              <span aria-hidden="true">←</span> Inicio
            </button>
            <h1 style={{ 
              color: 'white',
              margin: 0,
              fontSize: '1.5rem',
              flex: 1,
              textAlign: 'center'
            }}>
              <span aria-hidden="true">📝</span> Seguimiento
            </h1>
            <div style={{ width: '80px' }}></div> {/* Espacio para balancear */}
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Date Selector */}
          <div className="modern-card" style={{ 
            marginBottom: 'var(--spacing-lg)',
            padding: 'var(--spacing-md)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-sm)' 
            }}>
              <label htmlFor="date-input" style={{ 
                fontWeight: 600, 
                color: 'var(--neutral-700)',
                fontSize: '1rem',
                whiteSpace: 'nowrap'
              }}>
                Fecha:
              </label>
              <input
                id="date-input"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="modern-form-input"
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <div className="modern-card" style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <div style={{ fontSize: '1.5rem' }}>📊</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--neutral-600)',
                  margin: 0,
                  fontWeight: 500
                }}>
                  Carbohidratos
                </h3>
                <p style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--neutral-900)',
                  margin: 'var(--spacing-xs) 0 0 0'
                }}>
                  {totalCarbs}g
                </p>
              </div>
            </div>
            
            <div className="modern-card" style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <div style={{ fontSize: '1.5rem' }}>🌾</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--neutral-600)',
                  margin: 0,
                  fontWeight: 500
                }}>
                  Fibra
                </h3>
                <p style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--neutral-900)',
                  margin: 'var(--spacing-xs) 0 0 0'
                }}>
                  {totalFiber}g
                </p>
              </div>
            </div>
          </div>

          {/* Add Food Button */}
          <div style={{ 
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <button
              onClick={() => setShowAddModal(true)}
              className="modern-btn modern-btn-primary"
              style={{ 
                padding: 'var(--spacing-md) var(--spacing-lg)',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}
              aria-label="Agregar alimento"
            >
              <span aria-hidden="true">+</span> Agregar Alimento
            </button>
          </div>

          {/* Food Entries */}
          <div className="modern-card">
            <h2 style={{ 
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--neutral-900)',
              margin: 0,
              marginBottom: 'var(--spacing-md)'
            }}>
              Alimentos de hoy
            </h2>
            
            {loading ? (
              <div style={{ 
                textAlign: 'center',
                padding: 'var(--spacing-xl) var(--spacing-md)'
              }}>
                <div style={{ 
                  fontSize: '2rem',
                  marginBottom: 'var(--spacing-md)',
                  animation: 'spin 1s linear infinite'
                }}>
                  ⏳
                </div>
                <p style={{ 
                  fontSize: '1rem',
                  color: 'var(--neutral-600)',
                  margin: 0
                }}>
                  Cargando registros...
                </p>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div style={{ 
                textAlign: 'center',
                padding: 'var(--spacing-xl)',
                color: 'var(--neutral-600)'
              }}>
                <div style={{ 
                  fontSize: '3rem',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  🍽️
                </div>
                <p style={{ 
                  margin: '0 0 var(--spacing-sm) 0',
                  fontSize: '1.1rem'
                }}>
                  No has registrado alimentos hoy
                </p>
                <p style={{ 
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  Agrega tu primer alimento
                </p>
              </div>
            ) : (
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-lg)'
              }}>
                {Object.keys(groupedEntries)
                  .sort()
                  .map((time) => (
                    <div key={time}>
                      <div style={{ 
                        marginBottom: 'var(--spacing-md)',
                        paddingBottom: 'var(--spacing-xs)',
                        borderBottom: '1px solid var(--neutral-200)'
                      }}>
                        <h3 style={{ 
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--neutral-800)',
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-xs)'
                        }}>
                          ⏰ {time}
                        </h3>
                      </div>
                      {groupedEntries[time].map((entry) => (
                        <div key={entry.id} className="modern-card" style={{ 
                          padding: 'var(--spacing-md)',
                          marginBottom: 'var(--spacing-sm)'
                        }}>
                          <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 'var(--spacing-sm)'
                          }}>
                            <div style={{ 
                              fontSize: '0.875rem',
                              color: 'var(--neutral-600)',
                              backgroundColor: 'var(--neutral-100)',
                              padding: 'var(--spacing-xs) var(--spacing-sm)',
                              borderRadius: 'var(--radius-md)'
                            }}>
                              {entry.time}
                            </div>
                            <button
                              onClick={() => handleDeleteFood(entry.id)}
                              className="modern-btn modern-btn-ghost"
                              style={{ 
                                padding: 'var(--spacing-xs)',
                                color: 'var(--accent-danger)',
                                minWidth: 'auto'
                              }}
                              aria-label={`Eliminar ${entry.food.name}`}
                            >
                              🗑️
                            </button>
                          </div>
                          
                          <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div>
                              <h4 style={{ 
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--neutral-900)',
                                margin: 0
                              }}>
                                {entry.food.name}
                              </h4>
                              <p style={{ 
                                fontSize: '0.875rem',
                                color: 'var(--neutral-600)',
                                margin: 'var(--spacing-xs) 0 0 0'
                              }}>
                                {entry.portion} porción
                              </p>
                            </div>
                            
                            <div style={{ 
                              textAlign: 'right'
                            }}>
                              <p style={{ 
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'var(--neutral-800)',
                                margin: 0
                              }}>
                                {entry.food.carbohydrates}g carbs
                              </p>
                              <p style={{ 
                                fontSize: '0.75rem',
                                color: 'var(--neutral-600)',
                                margin: 'var(--spacing-xs) 0 0 0'
                              }}>
                                {entry.food.fiber}g fibra
                              </p>
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
      </div>

      {/* Add Food Modal */}
      {showAddModal && (
        <AddFoodModal
          onAdd={handleAddFood}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};