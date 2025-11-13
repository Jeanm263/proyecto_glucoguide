import React, { useState } from 'react';
import { glucoseService } from '../../services/glucoseService';
import { toastSuccess, toastError } from '../../utils/toast';

interface GlucoseFormProps {
  onSuccess?: () => void;
}

export const GlucoseForm: React.FC<GlucoseFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    level: '',
    mealContext: 'other' as 'fasting' | 'before_meal' | 'after_meal' | 'bedtime' | 'other',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await glucoseService.createReading({
        date: formData.date,
        time: formData.time,
        level: Number(formData.level),
        mealContext: formData.mealContext,
        notes: formData.notes,
        relatedFoods: []
      });

      toastSuccess('Nivel de glucosa registrado exitosamente');
      setFormData({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        level: '',
        mealContext: 'other',
        notes: ''
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating glucose reading:', error);
      toastError('Error al registrar nivel de glucosa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glucose-form-container">
      <form onSubmit={handleSubmit} className="glucose-form">
        <h3>Registrar Nivel de Glucosa</h3>
        
        <div className="form-group">
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Hora</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="level">Nivel de Glucosa (mg/dL)</label>
          <input
            type="number"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            min="1"
            max="1000"
            step="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mealContext">Contexto de la Medición</label>
          <select
            id="mealContext"
            name="mealContext"
            value={formData.mealContext}
            onChange={handleChange}
            required
          >
            <option value="fasting">En ayunas</option>
            <option value="before_meal">Antes de comer</option>
            <option value="after_meal">Después de comer</option>
            <option value="bedtime">Antes de dormir</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notas (opcional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Agrega cualquier nota adicional..."
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar Nivel'}
        </button>
      </form>

      <style>{`
        .glucose-form-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          margin: 20px 0;
        }

        .glucose-form h3 {
          margin: 0 0 24px 0;
          color: #333;
          font-size: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #764ba2;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #764ba2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background: #6a4190;
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .glucose-form-container {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};