import React, { useState, useEffect } from 'react';
import { GlucoseForm } from '../components/glucose/GlucoseForm';
import { GlucoseStats } from '../components/glucose/GlucoseStats';
import { glucoseService } from '../services/glucoseService';
import { toastError } from '../utils/toast';
import { BottomNavigation } from '../components/common/BottomNavigation';
import type { GlucoseReading } from '../types/glucose';

export const GlucoseScreen: React.FC = () => {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);

  useEffect(() => {
    fetchReadings();
  }, [timeRange]);

  const fetchReadings = async () => {
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
  };

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
    <div className="screen-wrapper">
      <div className="glucose-screen">
        <div className="screen-header">
          <h1>Seguimiento de Glucosa</h1>
          <p>Monitorea y registra tus niveles de glucosa en sangre</p>
        </div>

      <div className="screen-content">
        <div className="left-column">
          <GlucoseForm onSuccess={handleReadingAdded} />
        </div>

        <div className="right-column">
          <div className="time-filter">
            <label htmlFor="timeRange">Mostrar últimos:</label>
            <select 
              id="timeRange"
              value={timeRange}
              onChange={(e) => setTimeRange(Number(e.target.value))}
            >
              <option value={7}>7 días</option>
              <option value={30}>30 días</option>
              <option value={90}>90 días</option>
            </select>
          </div>

          <GlucoseStats days={timeRange} />

          <div className="readings-section">
            <h3>Registros Recientes</h3>
            
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Cargando registros...</p>
              </div>
            ) : readings.length === 0 ? (
              <div className="empty-state">
                <p>No hay registros de glucosa aún</p>
                <p>Agrega tu primer registro usando el formulario</p>
              </div>
            ) : (
              <div className="readings-list">
                {readings.map((reading) => {
                  const status = getLevelStatus(reading.level);
                  return (
                    <div key={reading.id} className="reading-item">
                      <div className="reading-header">
                        <div className="reading-level" style={{ 
                          color: status.color,
                          backgroundColor: status.bg
                        }}>
                          {reading.level} mg/dL
                          <span className="level-status">{status.text}</span>
                        </div>
                        <div className="reading-context">
                          {getMealContextText(reading.mealContext)}
                        </div>
                      </div>
                      
                      <div className="reading-details">
                        <div className="reading-date">
                          {new Date(reading.date).toLocaleDateString('es-ES')} 
                          {' '} a las {reading.time}
                        </div>
                        
                        {reading.notes && (
                          <div className="reading-notes">
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

      <style>{`
        .glucose-screen {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .screen-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .screen-header h1 {
          margin: 0 0 12px 0;
          color: #333;
          font-size: 28px;
        }

        .screen-header p {
          margin: 0;
          color: #666;
          font-size: 16px;
        }

        .screen-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 24px;
        }

        .time-filter {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          background: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .time-filter label {
          font-weight: 500;
          color: #555;
        }

        .time-filter select {
          padding: 8px 12px;
          border: 2px solid #e1e5e9;
          border-radius: 6px;
          font-size: 14px;
        }

        .readings-section h3 {
          margin: 0 0 20px 0;
          color: #333;
          font-size: 20px;
        }

        .loading-container {
          text-align: center;
          padding: 40px 20px;
          color: #666;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #f0f0f0;
          border-top: 3px solid #764ba2;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #666;
          background: white;
          border-radius: 12px;
        }

        .readings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .reading-item {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.2s ease;
        }

        .reading-item:hover {
          transform: translateY(-2px);
        }

        .reading-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .reading-level {
          font-size: 20px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .level-status {
          font-size: 14px;
          font-weight: 500;
        }

        .reading-context {
          background: #f5f7fa;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .reading-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .reading-date {
          font-size: 14px;
          color: #888;
        }

        .reading-notes {
          font-size: 14px;
          color: #666;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 3px solid #764ba2;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .screen-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .glucose-screen {
            padding: 16px;
          }

          .screen-header h1 {
            font-size: 24px;
          }

          .reading-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }

        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .glucose-screen {
          flex: 1;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 80px;
        }
      `}</style>
    </div>
    <BottomNavigation />
  </div>
  );
};