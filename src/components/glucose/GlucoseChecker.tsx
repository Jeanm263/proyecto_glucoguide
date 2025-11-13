import React, { useState } from 'react';

interface GlucoseRecommendation {
  level: 'low' | 'normal' | 'high';
  message: string;
  foodsToEat: string[];
  foodsToAvoid: string[];
  actions: string[];
}

export const GlucoseChecker: React.FC = () => {
  const [glucoseLevel, setGlucoseLevel] = useState<string>('');
  const [recommendation, setRecommendation] = useState<GlucoseRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = (level: number): GlucoseRecommendation => {
    if (level < 70) {
      return {
        level: 'low',
        message: 'Tu nivel de glucosa está bajo. Es importante elevarlo de forma segura.',
        foodsToEat: [
          'Jugo de frutas naturales (manzana, naranja)',
          'Miel o azúcar (1 cucharadita)',
          'Frutas secas (pasas, dátiles)',
          'Leche con cereales integrales',
          'Pan integral con mantequilla de maní'
        ],
        foodsToAvoid: [
          'Café o té con cafeína',
          'Alimentos bajos en carbohidratos',
          'Ejercicio intenso'
        ],
        actions: [
          'Consume 15-20 gramos de carbohidratos rápidos',
          'Revisa tu nivel en 15 minutos',
          'Si no mejora, consume otros 15-20 gramos',
          'Consulta a tu médico si los síntomas persisten'
        ]
      };
    } else if (level >= 70 && level <= 130) {
      return {
        level: 'normal',
        message: '¡Excelente! Tu nivel de glucosa está en el rango objetivo.',
        foodsToEat: [
          'Verduras de hoja verde',
          'Proteínas magras (pollo, pescado)',
          'Granos integrales (quinua, avena)',
          'Frutas enteras (manzana, pera)',
          'Legumbres (lentejas, frijoles)'
        ],
        foodsToAvoid: [
          'Refrescos azucarados',
          'Dulces y golosinas',
          'Alimentos procesados',
          'Jugos embotellados'
        ],
        actions: [
          'Mantén tu rutina de comidas balanceadas',
          'Continúa con tu plan de ejercicio regular',
          'Monitorea tu nivel 1-2 horas después de comer',
          'Registra tus mediciones para identificar patrones'
        ]
      };
    } else {
      return {
        level: 'high',
        message: 'Tu nivel de glucosa está elevado. Es importante tomar medidas para reducirlo.',
        foodsToEat: [
          'Verduras sin almidón (brócoli, espinacas)',
          'Proteínas magras (huevos, pescado)',
          'Grasas saludables (aguacate, nueces)',
          'Agua o té sin azúcar',
          'Fibra soluble (avena, lentejas)'
        ],
        foodsToAvoid: [
          'Pan blanco y productos refinados',
          'Arroz blanco',
          'Papas',
          'Pasteles y repostería',
          'Refrescos y jugos azucarados'
        ],
        actions: [
          'Toma agua para ayudar a eliminar el exceso de glucosa',
          'Haz ejercicio ligero (caminata de 15-20 minutos)',
          'Evita carbohidratos simples por ahora',
          'Revisa tu nivel en 2-3 horas',
          'Consulta a tu médico si los niveles persisten altos'
        ]
      };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular procesamiento
    setTimeout(() => {
      const level = parseFloat(glucoseLevel);
      if (!isNaN(level) && level > 0) {
        const rec = getRecommendation(level);
        setRecommendation(rec);
      }
      setLoading(false);
    }, 800);
  };

  const getLevelColor = (level: 'low' | 'normal' | 'high') => {
    switch (level) {
      case 'low': return '#ff6b6b';
      case 'normal': return '#4caf50';
      case 'high': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const getLevelText = (level: 'low' | 'normal' | 'high') => {
    switch (level) {
      case 'low': return 'BAJO';
      case 'normal': return 'NORMAL';
      case 'high': return 'ALTO';
      default: return 'DESCONOCIDO';
    }
  };

  return (
    <div className="glucose-checker">
      <div className="glucose-checker-content">
        <h2 className="glucose-title">Verificador de Glucosa</h2>
        <p className="glucose-subtitle">Ingresa tu nivel de glucosa para recibir recomendaciones personalizadas</p>
        
        <form onSubmit={handleSubmit} className="glucose-form">
          <div className="form-group">
            <label className="form-label">Nivel de Glucosa (mg/dL)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={glucoseLevel}
                onChange={(e) => setGlucoseLevel(e.target.value)}
                placeholder="Ej: 120"
                className="form-input"
                min="1"
                max="500"
                required
              />
              <span className="unit">mg/dL</span>
            </div>
          </div>
          
          <button type="submit" className="btn-check" disabled={loading || !glucoseLevel}>
            {loading ? (
              <span className="loading-spinner" />
            ) : (
              'Obtener Recomendaciones'
            )}
          </button>
        </form>
        
        {recommendation && (
          <div className="recommendation-result">
            <div className="recommendation-header">
              <div 
                className="level-badge"
                style={{ backgroundColor: getLevelColor(recommendation.level) + '20', color: getLevelColor(recommendation.level) }}
              >
                Nivel {getLevelText(recommendation.level)}
              </div>
              <h3 className="recommendation-message">{recommendation.message}</h3>
            </div>
            
            <div className="recommendation-section">
              <h4 className="section-title">✅ Alimentos que puedes comer</h4>
              <ul className="food-list">
                {recommendation.foodsToEat.map((food, index) => (
                  <li key={index} className="food-item">{food}</li>
                ))}
              </ul>
            </div>
            
            <div className="recommendation-section">
              <h4 className="section-title">❌ Alimentos que debes evitar</h4>
              <ul className="food-list">
                {recommendation.foodsToAvoid.map((food, index) => (
                  <li key={index} className="food-item">{food}</li>
                ))}
              </ul>
            </div>
            
            <div className="recommendation-section">
              <h4 className="section-title">📋 Acciones recomendadas</h4>
              <ol className="actions-list">
                {recommendation.actions.map((action, index) => (
                  <li key={index} className="action-item">{action}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        .glucose-checker {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin: 20px 0;
        }
        
        .glucose-checker-content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .glucose-title {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          text-align: center;
          margin: 0 0 12px 0;
        }
        
        .glucose-subtitle {
          font-size: 16px;
          color: #666;
          text-align: center;
          margin: 0 0 32px 0;
          line-height: 1.6;
        }
        
        .glucose-form {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
          font-size: 16px;
        }
        
        .input-with-unit {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .form-input {
          width: 100%;
          padding: 16px 40px 16px 16px;
          font-size: 18px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s ease;
          background: white;
        }
        
        .form-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .unit {
          position: absolute;
          right: 16px;
          color: #999;
          font-weight: 500;
        }
        
        .btn-check {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .btn-check:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .btn-check:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .recommendation-result {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e0e0e0;
        }
        
        .recommendation-header {
          text-align: center;
          margin-bottom: 24px;
        }
        
        .level-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        
        .recommendation-message {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
          line-height: 1.4;
        }
        
        .recommendation-section {
          margin-bottom: 24px;
        }
        
        .recommendation-section:last-child {
          margin-bottom: 0;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .food-list, .actions-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .food-item, .action-item {
          padding: 12px 16px;
          margin-bottom: 8px;
          background: #f8f9fa;
          border-radius: 12px;
          font-size: 15px;
          color: #555;
          border-left: 3px solid #667eea;
        }
        
        .food-item:last-child, .action-item:last-child {
          margin-bottom: 0;
        }
        
        .action-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        
        .action-item::before {
          content: counter(item);
          counter-increment: item;
          font-weight: 700;
          color: #667eea;
          min-width: 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .glucose-checker {
            padding: 24px 20px;
          }
          
          .glucose-title {
            font-size: 24px;
          }
          
          .glucose-form {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};