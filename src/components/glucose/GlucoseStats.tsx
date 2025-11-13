import React, { useState, useEffect } from 'react';
import { glucoseService } from '../../services/glucoseService';
import { toastError } from '../../utils/toast';
import type { GlucoseStatistics } from '../../types/glucose';

interface GlucoseStatsProps {
  days?: number;
}

export const GlucoseStats: React.FC<GlucoseStatsProps> = ({ days = 30 }) => {
  const [stats, setStats] = useState<GlucoseStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const statistics = await glucoseService.getStatistics(days);
        setStats(statistics);
      } catch (error) {
        console.error('Error fetching glucose stats:', error);
        toastError('Error al cargar estadísticas de glucosa');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [days]);

  if (loading) {
    return (
      <div className="glucose-stats-loading">
        <div className="loading-spinner"></div>
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="glucose-stats-empty">
        <p>No hay datos disponibles</p>
      </div>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '↗️';
      case 'worsening': return '↘️';
      default: return '➡️';
    }
  };

  const getTrendText = (trend: string) => {
    switch (trend) {
      case 'improving': return 'Mejorando';
      case 'worsening': return 'Empeorando';
      default: return 'Estable';
    }
  };

  const getLevelStatus = (level: number) => {
    if (level < 70) return { text: 'Bajo', color: '#ff6b6b' };
    if (level >= 70 && level <= 130) return { text: 'Normal', color: '#4caf50' };
    return { text: 'Alto', color: '#ff9800' };
  };

  return (
    <div className="glucose-stats">
      <div className="stats-header">
        <h3>Estadísticas de Glucosa ({days} días)</h3>
        <div className="trend-indicator">
          <span className="trend-icon">{getTrendIcon(stats.trend)}</span>
          <span className="trend-text">{getTrendText(stats.trend)}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value" style={{ color: getLevelStatus(stats.average).color }}>
            {stats.average.toFixed(1)}
          </div>
          <div className="stat-label">Promedio (mg/dL)</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: getLevelStatus(stats.min).color }}>
            {stats.min}
          </div>
          <div className="stat-label">Mínimo</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: getLevelStatus(stats.max).color }}>
            {stats.max}
          </div>
          <div className="stat-label">Máximo</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.totalCount}</div>
          <div className="stat-label">Registros</div>
        </div>
      </div>

      {stats.contextAverages && Object.keys(stats.contextAverages).length > 0 && (
        <div className="context-averages">
          <h4>Promedio por Contexto</h4>
          <div className="context-grid">
            {Object.entries(stats.contextAverages).map(([context, average]) => (
              <div key={context} className="context-item">
                <div className="context-name">
                  {context === 'fasting' && 'Ayuno'}
                  {context === 'before_meal' && 'Antes de comer'}
                  {context === 'after_meal' && 'Después de comer'}
                  {context === 'bedtime' && 'Antes de dormir'}
                  {context === 'other' && 'Otro'}
                </div>
                <div 
                  className="context-average"
                  style={{ color: getLevelStatus(average as number).color }}
                >
                  {(average as number).toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .glucose-stats {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          margin: 20px 0;
        }

        .stats-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .stats-header h3 {
          margin: 0;
          color: #333;
          font-size: 20px;
        }

        .trend-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f5f7fa;
          padding: 8px 16px;
          border-radius: 20px;
        }

        .trend-icon {
          font-size: 20px;
        }

        .trend-text {
          font-weight: 600;
          color: #666;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .context-averages {
          border-top: 1px solid #eee;
          padding-top: 20px;
        }

        .context-averages h4 {
          margin: 0 0 16px 0;
          color: #333;
          font-size: 16px;
        }

        .context-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }

        .context-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fa;
          padding: 12px 16px;
          border-radius: 12px;
        }

        .context-name {
          font-size: 14px;
          color: #666;
        }

        .context-average {
          font-size: 16px;
          font-weight: 700;
        }

        .glucose-stats-loading, .glucose-stats-empty {
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

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .context-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};