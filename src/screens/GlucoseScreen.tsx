import React, { useState, useEffect, useCallback } from 'react';
import { GlucoseForm } from '../components/glucose/GlucoseForm';
import { GlucoseStats } from '../components/glucose/GlucoseStats';
import { glucoseService } from '../services/glucoseService';
import { toastError } from '../utils/toast';
import type { GlucoseReading } from '../types/glucose';
import { BottomNavigation } from '../components/common/BottomNavigation';

export const GlucoseScreen: React.FC = () => {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);

  const fetchReadings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await glucoseService.getReadings({ 
        limit: 50,
        startDate: new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000).toISOString()
      });
      setReadings(data);
    } catch (error) {
      console.error('Error fetching glucose readings:', error);
      toastError('Error al cargar registros de glucosa');
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchReadings();
  }, [timeRange, fetchReadings]);

  const handleReadingAdded = () => {
    fetchReadings();
  };

  const getLevelStatus = (level: number) => {
    if (level < 70) return { text: 'Bajo', color: '#ff6b6b', bg: '#ffebee' };
    if (level >= 70 && level <= 130) return { text: 'Normal', color: '#4caf50', bg: '#e8f5e9' };
    return { text: 'Alto', color: '#ff9800', bg: '#fff3e0' };
  };

  const getMealContextText = (context: string) => {
    switch (context) {
      case 'fasting': return 'En ayunas';
      case 'before_meal': return 'Antes de comer';
      case 'after_meal': return 'Después de comer';
      case 'bedtime': return 'Antes de dormir';
      default: return 'Otro';
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: 'var(--spacing-md)',
        paddingBottom: '70px'
      }}>
        <div className="container" style={{ padding: 'var(--spacing-md)' }}>
          <div className="modern-card">
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <h1 className="modern-card-title" style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>
                Seguimiento de Glucosa
              </h1>
              <p style={{ color: 'var(--neutral-600)', margin: 0 }}>
                Monitorea y registra tus niveles de glucosa en sangre
              </p>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: 'var(--spacing-lg)'
            }}>
              <div>
                <GlucoseForm onSuccess={handleReadingAdded} />
              </div>

              <div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--spacing-sm)', 
                  marginBottom: 'var(--spacing-md)',
                  background: 'white',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  flexWrap: 'wrap'
                }}>
                  <label htmlFor="timeRange" style={{ fontWeight: 500, color: 'var(--neutral-700)' }}>
                    Mostrar últimos:
                  </label>
                  <select 
                    id="timeRange"
                    value={timeRange}
                    onChange={(e) => setTimeRange(Number(e.target.value))}
                    className="modern-form-input"
                    style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: '0.875rem' }}
                  >
                    <option value={7}>7 días</option>
                    <option value={30}>30 días</option>
                    <option value={90}>90 días</option>
                  </select>
                </div>

                <GlucoseStats days={timeRange} />

                <div className="modern-card">
                  <h3 className="modern-card-title" style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>
                    Registros Recientes
                  </h3>
                  
                  {loading ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl) var(--spacing-md)', color: 'var(--neutral-600)' }}>
                      <div className="spinner" style={{ margin: '0 auto var(--spacing-md)' }}></div>
                      <p>Cargando registros...</p>
                    </div>
                  ) : readings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl) var(--spacing-md)', color: 'var(--neutral-600)' }}>
                      <p>No hay registros de glucosa aún</p>
                      <p>Agrega tu primer registro usando el formulario</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                      {readings.map((reading) => {
                        const status = getLevelStatus(reading.level);
                        return (
                          <div key={reading.id} className="modern-card" style={{ padding: 'var(--spacing-md)' }}>
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              marginBottom: 'var(--spacing-sm)',
                              flexWrap: 'wrap',
                              gap: 'var(--spacing-xs)'
                            }}>
                              <div style={{ 
                                fontSize: '1.125rem', 
                                fontWeight: 'bold', 
                                padding: 'var(--spacing-xs) var(--spacing-md)', 
                                borderRadius: '20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 'var(--spacing-xs)',
                                color: status.color,
                                backgroundColor: status.bg
                              }}>
                                {reading.level} mg/dL
                                <span style={{ 
                                  fontSize: '0.875rem', 
                                  fontWeight: 'normal' 
                                }}>
                                  {status.text}
                                </span>
                              </div>
                              <div style={{ 
                                background: 'var(--neutral-100)', 
                                padding: 'var(--spacing-xs) var(--spacing-sm)', 
                                borderRadius: 'var(--radius-md)', 
                                fontSize: '0.875rem', 
                                color: 'var(--neutral-600)' 
                              }}>
                                {getMealContextText(reading.mealContext)}
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                              <div style={{ fontSize: '0.875rem', color: 'var(--neutral-600)' }}>
                                {new Date(reading.date).toLocaleDateString('es-ES')} 
                                {' '} a las {reading.time}
                              </div>
                              
                              {reading.notes && (
                                <div style={{ 
                                  fontSize: '0.875rem', 
                                  color: 'var(--neutral-800)', 
                                  padding: 'var(--spacing-xs)', 
                                  background: 'var(--neutral-50)', 
                                  borderRadius: 'var(--radius-sm)' 
                                }}>
                                  {reading.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media query styles for responsive design */}
      <style>{`
        @media (min-width: 768px) {
          .container > .modern-card > div[style*="grid"] {
            grid-template-columns: 1fr 2fr;
          }
          
          .container > .modern-card > div[style*="grid"] > div:first-child {
            max-width: 400px;
          }
        }
      `}</style>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};